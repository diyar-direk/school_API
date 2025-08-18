const APIFeatures = require("./apiFeatures");
const parsedQueryHelper = require("./parsedQueryHelper");
const search = require("./search");

class APIServerHelper {
  constructor(model) {
    this.model = model;
  }
  getAll = async (req, res, searchFields, populate = ["createdBy"]) => {
    if (req.query.search)
      return search(this.model, searchFields, populate, req, res);
    try {
      const parsedQuery = parsedQueryHelper(req.query);
      const features = new APIFeatures(
        this.model.find().lean().populate(populate),
        req.query
      )
        .paginate()
        .filter()
        .sort()
        .fields();
      const [data, totalCount] = await Promise.all([
        features.query,
        this.model.countDocuments(parsedQuery),
      ]);
      res.json({
        message: "operation done successfully",
        results: data.length,
        totalCount,
        data,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  getOne = async (req, res, populate = ["createdBy"]) => {
    try {
      const { id } = req.params;
      const data = await this.model.findById(id).populate(populate);
      if (!data) return res.status(404).json({ message: "not found" });
      res.json({ message: "operation done successfully", data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  deleteMany = async (req, res) => {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids) || ids.length === 0)
        return res.status(400).json({ message: "ids must be not empty array" });
      const deletedData = await this.model.deleteMany({ _id: { $in: ids } });
      res.json({
        message: `${deletedData.deletedCount} item deleted successfully`,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  createOne = async (req, res, data = req.body) => {
    data.createdBy = req.currentUser._id;
    try {
      const newData = await this.model.create(data);
      res
        .status(201)
        .json({ message: "created new item successfully", data: newData });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  updateOne = async (req, res, data = req.body) => {
    try {
      const { id } = req.params;
      const updatedData = await this.model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!updatedData) return res.status(404).json({ message: "not found" });
      res.json({ message: "operation done successfully", data: updatedData });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}
module.exports = APIServerHelper;

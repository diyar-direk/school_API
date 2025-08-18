const Class = require("../../model/class/classModel");
const APIServerHelper = require("../../utils/apiServerHelper");
const apiServerHelper = new APIServerHelper(Class);
const getAll = async (req, res) => apiServerHelper.getAll(req, res, ["name"]);
const getOne = async (req, res) => apiServerHelper.getOne(req, res);
const deleteClasses = async (req, res) => apiServerHelper.deleteMany(req, res);
const addClasses = async (req, res) => apiServerHelper.createOne(req, res);
const updateClasses = async (req, res) => apiServerHelper.updateOne(req, res);
module.exports = {
  getAll,
  getOne,
  deleteClasses,
  addClasses,
  updateClasses,
};

const Subject = require("../../model/subject/subjectModel");
const APIServerHelper = require("../../utils/apiServerHelper");
const apiServerHelper = new APIServerHelper(Subject);
const getAll = async (req, res) => apiServerHelper.getAll(req, res, ["name"]);
const getOne = async (req, res) => apiServerHelper.getOne(req, res);
const deleteSubjects = async (req, res) => apiServerHelper.deleteMany(req, res);
const addSubject = async (req, res) => apiServerHelper.createOne(req, res);
const updateSubject = async (req, res) => apiServerHelper.updateOne(req, res);
module.exports = {
  getAll,
  getOne,
  deleteSubjects,
  addSubject,
  updateSubject,
};

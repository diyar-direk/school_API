const Admin = require("../../model/users/adminModel");
const APIServerHelper = require("../../utils/apiServerHelper");
const apiServer = new APIServerHelper(Admin);
const getAllAdmins = (req, res) =>
  apiServer.getAll(req, res, ["firstName", "lastName", "middleName"]);
const getAdmin = (req, res) => apiServer.getOne(req, res);
const createAdmin = (req, res) => apiServer.createOne(req, res);
const updateAdmin = (req, res) => apiServer.updateOne(req, res);
const deleteAdmin = (req, res) => apiServer.deleteOne(req, res);
module.exports = {
  getAllAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};

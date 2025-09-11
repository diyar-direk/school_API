const express = require("express");
const allowedTo = require("../../middleWare/allowedTo");

const {
  getAll,
  getOne,
  register,
  login,
  deleteUsers,
  getUserProfile,
  updateUser,
} = require("../../controller/users/usersController");
const router = express.Router();
router
  .route("/")
  .all(allowedTo("Admin"))
  .get(getAll)
  .post(register)
  .delete(deleteUsers);
router.route("/login").post(login);
router
  .route("/me")
  .get(allowedTo("Admin", "Teacher", "Student"), getUserProfile);
router.route("/:id").all(allowedTo("Admin")).get(getOne).patch(updateUser);
module.exports = router;

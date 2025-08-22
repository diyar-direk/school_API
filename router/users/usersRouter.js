const express = require("express");
const {
  getAll,
  getOne,
  register,
  login,
  deleteUsers,
  getUserProfile,
  updateUser,
} = require("../../controller/users/usersController");
const allowedTo = require("../../middleWare/allowedTo");
const router = express.Router();
router
  .route("/")
  .all(allowedTo("Admin"))
  .get(getAll)
  .post(register)
  .delete(deleteUsers);
router.route("/:id").all(allowedTo("Admin")).get(getOne).patch(updateUser);
router.route("/login").post(login);
router
  .route("/profile/me")
  .get(allowedTo("Admin", "Teacher", "Student"), getUserProfile);
module.exports = router;

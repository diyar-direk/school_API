const express = require("express");
const {
  getAll,
  getOne,
  register,
  login,
  updateRole,
  deleteUsers,
  getUserProfile,
} = require("../../controller/users/usersController");
const allowedTo = require("../../middleWare/allowedTo");
const router = express.Router();
router
  .route("/")
  .get(allowedTo("admin"), getAll)
  .post(allowedTo("admin"), register)
  .delete(allowedTo("admin"), deleteUsers);
router
  .route("/:id")
  .get(allowedTo("admin"), getOne)
  .patch(allowedTo("admin"), updateRole);
router.route("/login").post(login);
router
  .route("/profile/me")
  .get(allowedTo("teacher", "admin", "student"), getUserProfile);
module.exports = router;

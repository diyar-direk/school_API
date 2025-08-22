const express = require("express");
const {
  getAll,
  addClasses,
  getOne,
  updateClasses,
  deleteClasses,
} = require("../../controller/class/classController");
const allowedTo = require("../../middleWare/allowedTo");
const router = express.Router();
router
  .route("/")
  .get(allowedTo("Admin", "Teacher", "Student"), getAll)
  .post(allowedTo("Admin"), addClasses)
  .delete(allowedTo("Admin"), deleteClasses);
router
  .route("/:id")
  .get(allowedTo("Admin"), getOne)
  .patch(allowedTo("Admin"), updateClasses);
module.exports = router;

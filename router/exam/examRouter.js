const express = require("express");
const {
  getAll,
  getOne,
  addExam,
  deleteExams,
  updateExam,
} = require("../../controller/exam/examController");
const allowedTo = require("../../middleWare/allowedTo");

const router = express.Router();
router
  .route("/")
  .get(allowedTo("Admin", "Teacher", "Student"), getAll)
  .post(allowedTo("Admin"), addExam)
  .delete(allowedTo("Admin"), deleteExams);
router
  .route("/:id")
  .get(allowedTo("Admin"), getOne)
  .patch(allowedTo("Admin"), updateExam);
module.exports = router;

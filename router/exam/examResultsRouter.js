const express = require("express");
const {
  addExamResult,
  getExamResults,
  getExamResultById,
  deleteExamResults,
  updateExamResult,
} = require("../../controller/exam/examResultsController");
const router = express.Router();

const allowedTo = require("../../middleWare/allowedTo");

router
  .route("/")
  .post(allowedTo("Admin"), addExamResult)
  .get(allowedTo("Admin", "Teacher", "Student"), getExamResults)
  .delete(allowedTo("Admin"), deleteExamResults);

router
  .route("/:id")
  .get(allowedTo("Admin", "Teacher", "Student"), getExamResultById)
  .patch(allowedTo("Admin"), updateExamResult);

module.exports = router;

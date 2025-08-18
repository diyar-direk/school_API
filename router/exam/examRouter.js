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
  .get(allowedTo("admin", "teacher", "student"), getAll)
  .post(allowedTo("admin"), addExam)
  .delete(allowedTo("admin"), deleteExams);
router
  .route("/:id")
  .get(allowedTo("admin"), getOne)
  .patch(allowedTo("admin"), updateExam);
module.exports = router;

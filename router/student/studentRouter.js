const express = require("express");
const router = express.Router();
const allowedTo = require("../../middleware/allowedTo");
const {
  createStudent,
  deleteStudents,
  getStudents,
  getStudentById,
  updateStudent,
} = require("../../controller/student/studentController");
router
  .route("/")
  .post(allowedTo("Admin"), createStudent)
  .delete(allowedTo("Admin"), deleteStudents)
  .get(allowedTo("Admin", "Teacher"), getStudents);
router
  .route("/:id")
  .get(allowedTo("Admin", "Teacher", "Student"), getStudentById)
  .patch(allowedTo("Admin"), updateStudent);
module.exports = router;

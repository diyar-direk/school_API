const express = require("express");
const {
  createTeacher,
  deleteTeachers,
  getTeachers,
  getTeacher,
  updateTeacher,
} = require("../../controller/teacher/teacherController");
const router = express.Router();
const allowedTo = require("../../middleWare/allowedTo");
router
  .route("/")
  .get(allowedTo("Admin", "Teacher", "Student"), getTeachers)
  .post(allowedTo("Admin"), createTeacher)
  .delete(allowedTo("Admin"), deleteTeachers);
router
  .route("/:id")
  .get(allowedTo("Admin", "Teacher", "Student"), getTeacher)
  .patch(allowedTo("Admin"), updateTeacher);
module.exports = router;

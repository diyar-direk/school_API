const express = require("express");
const {
  getAll,
  addSubject,
  getOne,
  updateSubject,
  deleteSubjects,
} = require("../../controller/subject/subjectController");
const allowedTo = require("../../middleWare/allowedTo");
const router = express.Router();
router
  .route("/")
  .get(allowedTo("Admin", "Teacher", "Student"), getAll)
  .post(allowedTo("Admin"), addSubject)
  .delete(allowedTo("Admin"), deleteSubjects);
router
  .route("/:id")
  .get(allowedTo("Admin"), getOne)
  .patch(allowedTo("Admin"), updateSubject);
module.exports = router;

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
  .get(allowedTo("admin", "teacher", "student"), getAll)
  .post(allowedTo("admin"), addSubject)
  .delete(allowedTo("admin"), deleteSubjects);
router
  .route("/:id")
  .get(allowedTo("admin"), getOne)
  .patch(allowedTo("admin"), updateSubject);
module.exports = router;

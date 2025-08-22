const express = require("express");
const {
  addSubjectsSchedule,
  getSubjectsSchedule,
  getOne,
  updateSchedule,
  deleteSchedule,
} = require("../../controller/subject/subjectsScheduleController");
const router = express.Router();
const allowedTo = require("../../middleWare/allowedTo");

router
  .route("/")
  .post(allowedTo("Admin"), addSubjectsSchedule)
  .get(allowedTo("Admin", "Teacher", "Student"), getSubjectsSchedule)
  .delete(allowedTo("Admin"), deleteSchedule);
router.route("/:id").get(getOne).patch(allowedTo("Admin"), updateSchedule);

module.exports = router;

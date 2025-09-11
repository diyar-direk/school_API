const express = require("express");
const router = express.Router();
const allowedTo = require("../../middleWare/allowedTo");
const {
  createAttandance,
  updateAttandance,
  deleteAttandance,
  getAttendance,
} = require("../../controller/attandance/attandanceController");
router
  .route("/")
  .get(allowedTo("Admin", "Teacher"), getAttendance)
  .post(allowedTo("Admin"), createAttandance)
  .delete(allowedTo("Admin"), deleteAttandance);
router.route("/:id").patch(allowedTo("Admin"), updateAttandance);
module.exports = router;

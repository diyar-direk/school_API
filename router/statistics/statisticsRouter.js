const express = require("express");
const {
  dataCountStatistic,
  classesStudentCount,
} = require("../../controller/statistic/statisticsController");
const allowedTo = require("../../middleWare/allowedTo");
const router = express.Router();
router.route("/dataCount").get(allowedTo("Admin"), dataCountStatistic);
router.route("/classes").get(allowedTo("Admin"), classesStudentCount);
module.exports = router;

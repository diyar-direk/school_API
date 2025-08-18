const express = require("express");
const {
  getAll,
  addClasses,
  getOne,
  updateClasses,
  deleteClasses,
} = require("../../controller/class/classController");
const allowedTo = require("../../middleWare/allowedTo");
const router = express.Router();
router
  .route("/")
  .get(allowedTo("admin", "teacher", "student"), getAll)
  .post(allowedTo("admin"), addClasses)
  .delete(allowedTo("admin"), deleteClasses);
router
  .route("/:id")
  .get(allowedTo("admin"), getOne)
  .patch(allowedTo("admin"), updateClasses);
module.exports = router;

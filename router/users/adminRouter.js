const express = require("express");
const router = express.Router();
const allowedTo = require("../../middleware/allowedTo");
const {
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  createAdmin,
  getAdmin,
} = require("../../controller/users/adminController");
router
  .route("/")
  .all(allowedTo("Admin"))
  .get(getAllAdmins)
  .post(createAdmin)
  .delete(deleteAdmin);

router.route("/:id").all(allowedTo("Admin")).get(getAdmin).patch(updateAdmin);
module.exports = router;

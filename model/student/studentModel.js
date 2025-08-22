const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({});
module.exports = new mongoose.model("Student", studentSchema);

const mongoose = require("mongoose");

const exemResultsSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Exam",
  },
  studentId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  mark: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

exemResultsSchema.index({ examId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model("ExamResults", exemResultsSchema);

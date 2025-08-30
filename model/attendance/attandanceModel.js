const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Class",
    },
    date: {
      type: Date,
      required: true,
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Other"],
      default: "Other",
    },
  },
  { timestamps }
);
attendanceSchema.index(
  {
    studentId: 1,
    date: 1,
  },
  { unique: true }
);

module.exports = new mongoose.model("Attendance", attendanceSchema);

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
      validate: {
        validator: (date) => date.getTime() <= Date.now(),
        message: "date can not be in future",
      },
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
attendanceSchema.index(
  {
    studentId: 1,
    classId: 1,
    date: 1,
  },
  { unique: true }
);

module.exports = new mongoose.model("Attendance", attendanceSchema);

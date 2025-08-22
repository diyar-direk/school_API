const mongoose = require("mongoose");
const subjectsScheduleSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    day: {
      type: String,
      enum: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
      required: true,
    },
    subjectId: {
      type: mongoose.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

subjectsScheduleSchema.index(
  {
    classId: 1,
    day: 1,
    startTime: 1,
  },
  { unique: true }
);

module.exports = new mongoose.model("SubjectsSchedule", subjectsScheduleSchema);

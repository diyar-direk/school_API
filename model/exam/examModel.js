const mongoose = require("mongoose");
const examSchema = new mongoose.Schema(
  {
    yearLevel: {
      type: Number,
      required: true,
      enum: Array.from({ length: 12 }, (_, i) => i + 1),
    },
    subjectId: {
      ref: "Subject",
      type: mongoose.Types.ObjectId,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    mark: {
      type: Number,
      required: true,
      min: 0,
    },
    createdBy: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);
examSchema.index(
  {
    yearLevel: 1,
    subjectId: 1,
  },
  { unique: true }
);
module.exports = new mongoose.model("Exam", examSchema);

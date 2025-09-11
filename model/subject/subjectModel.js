const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    yearLevel: {
      type: Number,
      required: true,
      enum: Array.from({ length: 12 }, (_, i) => i + 1),
    },
    createdBy: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);
subjectSchema.index(
  {
    name: 1,
    yearLevel: 1,
  },
  { unique: true }
);
subjectSchema.index(
  {
    code: 1,
  },
  {
    unique: true,
  }
);
module.exports = new mongoose.model("Subject", subjectSchema);

const mongoose = require("mongoose");
const classesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
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
classesSchema.index(
  {
    name: 1,
    yearLevel: 1,
  },
  { unique: true }
);
module.exports = new mongoose.model("Class", classesSchema);

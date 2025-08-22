const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

adminSchema.index(
  {
    firstName: 1,
    middleName: 1,
    lastName: 1,
  },
  { unique: true }
);

adminSchema.index({ email: 1 }, { unique: true });

module.exports = new mongoose.model("Admin", adminSchema);

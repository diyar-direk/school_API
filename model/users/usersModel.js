const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  username: {
    required: true,
    trim: true,
    lowercase: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Teacher", "Student"],
    default: "Student",
  },

  profileId: {
    type: mongoose.Types.ObjectId,
    refPath: "role",
    required: true,
  },

  createdBy: {
    ref: "User",
    type: mongoose.Types.ObjectId,
  },
});
usersSchema.index(
  {
    username: 1,
  },
  {
    unique: true,
  }
);
usersSchema.index({ profileId: 1, role: 1 }, { unique: true });

module.exports = new mongoose.model("User", usersSchema);

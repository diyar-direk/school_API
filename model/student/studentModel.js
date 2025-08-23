const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
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
    motherName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    yearLevel: {
      type: Number,
      min: 1,
      max: 12,
      required: true,
    },
    repeatedYears: [
      {
        yearLevel: {
          type: Number,
          min: 1,
          max: 12,
          required: true,
        },
        repeatedCont: {
          type: Number,
          min: 0,
          required: true,
        },
      },
    ],
    guardianName: {
      type: String,
      required: true,
    },
    guardianContact: {
      type: String,
      required: true,
    },
    guardianRelation: {
      type: String,
      required: true,
    },
    classId: {
      type: mongoose.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

studentSchema.index({
  firstName: 1,
  middleName: 1,
  lastName: 1,
});

module.exports = new mongoose.model("Student", studentSchema);

const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema(
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
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Other"],
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    yearLevel: {
      type: [
        { type: Number, enum: Array.from({ length: 12 }, (_, i) => i + 1) },
      ],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "you have to choose one or more year level",
      },
    },
    subjects: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "you have to choose one or more subject",
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

teacherSchema.index(
  { firstName: 1, middleName: 1, lastName: 1 },
  { unique: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;

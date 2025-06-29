const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const GuarantorSchema = new mongoose.Schema(
  {
    guarantorOneEmail: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    guarantorTwoEmail: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    verificationToken: {
      type: String,
    },
    isCompleted: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      minlength: 2,
      maxlength: 50,
    },
    houseAddress: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    occupation: {
      type: String,
    },
    employer: {
      type: String,
    },
    employerAddress: {
      type: String,
    },
    employeeFullName: {
      type: String,
    },
    employeeDesignation: {
      type: String,
    },
    outletEmployed: {
      type: String,
    },
    passport: {
      type: String,
    },
    identificationCard: {
      type: String,
    },
    ageRange: {
      type: String,
    },
    uniformedPublicServant: {
      type: String,
    },
    signedPolicy: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guarantor", GuarantorSchema);

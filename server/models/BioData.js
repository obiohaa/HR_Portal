const mongoose = require("mongoose");

const BioDataSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 50,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 50,
    },
    staffId: {
      type: String,
      unique: true,
    },
    jobLocation: {
      type: String,
    },
    jobName: {
      type: String,
    },
    email: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    state_of_origin: {
      type: String,
    },
    gender: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    spouseName: {
      type: String,
    },
    houseAddress: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    bankName: {
      type: String,
    },
    bankAccountNumber: {
      type: Number,
    },
    pension: {
      type: String,
    },
    pensionCompany: {
      type: String,
    },
    pensionPin: {
      type: Number,
    },
    levelOfEducation: {
      type: String,
    },
    UserFileUrl: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BioData", BioDataSchema);
// By default, Mongoose discards fields not defined in the schema (strict: true by default) If you want to save undefined fields, explicitly allow it

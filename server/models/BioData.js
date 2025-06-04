const mongoose = require("mongoose");

const BioDataSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
      minlength: 2,
      maxlength: 50,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please provide date of birth"],
    },
    state_of_origin: {
      type: String,
      required: [true, "Please provide state of origin"],
    },
    gender: {
      type: String,
      required: [true, "Please provide gender"],
    },
    maritalStatus: {
      type: String,
      required: [true, "Please provide marital status"],
    },
    spouseName: {
      type: String,
    },
    houseAddress: {
      type: String,
      required: [true, "Please provide home address"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please provide phone number"],
    },

    bankName: {
      type: String,
      required: [true, "Please provide bank name"],
      minlength: 2,
      maxlength: 50,
    },
    bankAccountNumber: {
      type: Number,
      required: [true, "Please provide bank account number"],
    },
    pension: {
      type: String,
      required: [true, "Please confirm pension status"],
    },
    pensionCompany: {
      type: String,
      minlength: 2,
      maxlength: 50,
    },
    pensionPin: {
      type: Number,
    },
    UserFileUrl: {
      type: String,
      required: [true, "Please provide file URL"],
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

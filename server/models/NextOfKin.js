const mongoose = require("mongoose");

const NextOfKinSchema = new mongoose.Schema(
  {
    nextOfKinFirstName: {
      type: String,
      required: [true, "Next of Kin first name needed"],
    },
    nextOfKinLastName: {
      type: String,
      required: [true, "Next of Kin last name needed"],
    },
    nextOfKinRelationship: {
      type: String,
      required: [true, "Next of Kin relationship needed"],
    },
    houseAddress: {
      type: String,
      required: [true, "Next of Kin House Address needed"],
    },
    gender: {
      type: String,
      required: [true, "Next of Kin gender needed"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Next of Kin phone number needed"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NextOfKin", NextOfKinSchema);

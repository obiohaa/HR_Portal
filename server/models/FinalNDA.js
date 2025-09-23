const mongoose = require("mongoose");

const finalNDASchema = new mongoose.Schema(
  {
    finalAgreement: {
      type: Boolean,
      default: false,
      required: [true, "Final agreement status is required"],
    },
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      minlength: 2,
      maxlength: 50,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bioData: {
      type: mongoose.Types.ObjectId,
      ref: "BioData",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("finalNDA", finalNDASchema);
// By default, Mongoose discards fields not defined in the schema (strict: true by default) If you want to save undefined fields, explicitly allow it

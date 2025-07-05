const mongoose = require("mongoose");

const finalNDASchema = new mongoose.Schema(
  {
    finalAgreement: {
      type: Boolean,
      default: false,
      required: [true, "Final agreement status is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("finalNDA", finalNDASchema);
// By default, Mongoose discards fields not defined in the schema (strict: true by default) If you want to save undefined fields, explicitly allow it

const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    OutletName: {
      type: String,
      minlength: 2,
      maxlength: 50,
    },
    OutletAddress: {
      type: String,
      minlength: 2,
      maxlength: 200,
    },
    phoneNumber: {
      type: Number,
    },
    category: {
      type: String,
      minlength: 2,
      maxlength: 15,
    },
    timeRange: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
    imgURL: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", LocationSchema);

// By default, Mongoose discards fields not defined in the schema (strict: true by default) If you want to save undefined fields, explicitly allow it

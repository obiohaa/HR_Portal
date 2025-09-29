const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    OpenPosition: {
      type: String,
      minlength: 2,
      maxlength: 100,
      required: true,
    },
    JobDescription: {
      type: String,
      minlength: 2,
      maxlength: 1000,
      required: true,
    },
    State: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    qualification: {
      type: [String],
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
// By default, Mongoose discards fields not defined in the schema (strict: true by default) If you want to save undefined fields, explicitly allow it

const mongoose = require("mongoose");

const StepStateSchema = new mongoose.Schema(
  {
    currentStep: {
      type: Number,
      required: true,
    },
    nextStep: {
      type: Number,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    completedStep: {
      type: Number,
      default: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StepState", StepStateSchema);

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
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
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },
    verificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Date,
    },
    passwordToken: {
      type: String,
    },
    employeeStatus: {
      type: String,
      enum: ["registered", "resumed", "terminated"],
      default: "registered",
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
    imgURL: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

// Virtual relation
UserSchema.virtual("bioData", {
  ref: "BioData",
  localField: "_id", // match User._id
  foreignField: "user", // match BioData.user
  justOne: true,
});

module.exports = mongoose.model("User", UserSchema);
// By default, Mongoose discards fields not defined in the schema (strict: true by default) If you want to save undefined fields, explicitly allow it

const User = require("../models/User");
const BioData = require("../models/BioData");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const CustomError = require("../errors");
const { createTokenUser, attachCookiesToResponse, checkPermissions } = require("../utils");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
// update user with user.save()
const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

//Bio Data
const bioData = async (req, res) => {
  const {
    middleName,
    dateOfBirth,
    state_of_origin,
    gender,
    maritalStatus,
    houseAddress,
    phoneNumber,
    bankName,
    bankAccountNumber,
    pension,
    levelOfEducation,
    spouseName,
    pensionCompany,
    pensionPin,
  } = JSON.parse(req.body.body);

  if (
    !dateOfBirth ||
    !state_of_origin ||
    !gender ||
    !maritalStatus ||
    !houseAddress ||
    !phoneNumber ||
    !bankName ||
    !bankAccountNumber ||
    !pension ||
    !levelOfEducation
  ) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  let userBioData = JSON.parse(req.body.body);

  //LOCAL FILE FUNCTIONALITY
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const userFile = req.files.file;
  if (!userFile.mimetype.startsWith("application")) {
    throw new CustomError.BadRequestError("Please upload a PDF or Doc File");
  }
  const maxSize = 5000000;
  if (!userFile.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload file smaller than 5MB");
  }

  //move to a local folder
  // const filePath = path.join(__dirname, "../public/fileUploads/" + `${userFile.name}`);
  // await userFile.mv(filePath);
  // return res.status(StatusCodes.OK).json({ file: { src: `/fileUploads/${userFile.name}` } });

  //Upload to cloudinary
  const result = await cloudinary.uploader.upload(req.files.file.tempFilePath, {
    use_filename: true,
    folder: "HR_ADMIN_PORTAL",
  });
  //unlink/delete the file
  fs.unlinkSync(req.files.file.tempFilePath);

  const mainUserBioData = {
    ...userBioData,
    UserFileUrl: result.secure_url,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    user: req.user.userId,
    step: 2,
    completed: false,
  };
  // userBioData.UserFileUrl = result.secure_url;
  // userBioData.firstName = req.user.firstName;
  // userBioData.lastName = req.user.lastName;
  // userBioData.email = req.user.email;
  // userBioData.user = req.user.userId;
  // userBioData.step = 2;
  // userBioData.completed = false;
  console.log(mainUserBioData);
  //Add do database
  const UserBioData = await BioData.create(mainUserBioData);
  // console.log(UserBioData);
  return res.status(StatusCodes.OK).json({ file: { src: result.secure_url } });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  bioData,
};

// update user with findOneAndUpdate
// const updateUser = async (req, res) => {
//   const { email, name } = req.body;
//   if (!email || !name) {
//     throw new CustomError.BadRequestError('Please provide all values');
//   }
//   const user = await User.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     { new: true, runValidators: true }
//   );
//   const tokenUser = createTokenUser(user);
//   attachCookiesToResponse({ res, user: tokenUser });
//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };

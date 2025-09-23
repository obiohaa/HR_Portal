const User = require("../models/User");
const StepState = require("../models/StepState");
const Token = require("../models/Token");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} = require("../utils");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const crypto = require("crypto");

const register = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const { firstName, lastName, email, password } = JSON.parse(req.body.body);

  if (!firstName || !lastName || !email || !password) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // FILE FUNCTIONALITY
  if (!req.files) {
    throw new CustomError.BadRequestError("Please upload passport Image");
  }
  const userImage = req.files.file;
  if (!userImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload a PDF or Doc File");
  }
  const maxSize = 5000000;
  if (userImage.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload file smaller than 5MB");
  }

  const result = await cloudinary.uploader.upload(userImage.tempFilePath, {
    use_filename: true,
    folder: "HR_ADMIN_PORTAL",
  });
  //unlink/delete the file
  fs.unlinkSync(userImage.tempFilePath);
  const imgURL = result.secure_url;

  // const role = "admin";
  const role = "employee";

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
    verificationToken,
    imgURL,
  });
  const origin = "https://hr-portal.theplace.com.ng";
  // const origin = "http://localhost:5173";
  // const newOrigin = 'https://react-node-user-workflow-front-end.netlify.app'; //production

  // const tempOrigin = req.get('origin'); //where the request is coming from (client via proxy)
  // const protocol = req.protocol; //http protocol
  // const host = req.get('host'); //where the request to coming to, i.e server
  // const forwardedHost = req.get('x-forwarded-host'); //where the request is really coming from without proxy
  // const forwardedProtocol = req.get('x-forwarded-proto'); //protocol without proxy
  //Create the user Step State
  const userStepState = {
    currentStep: 1,
    nextStep: 2,
    completed: false,
    completedStep: 0,
    user: user._id,
  };

  await StepState.create(userStepState);
  //send email
  await sendVerificationEmail({
    firstName: user.firstName,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  //send verification token only while testing in post man
  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please check your email to verify your account",
  });
};

//VERIFY EMAIL
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  console.log(verificationToken);
  console.log(user.verificationToken);

  if (!user) {
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }

  if (user.isVerified) {
    throw new CustomError.UnauthenticatedError("Email already verified, please login");
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }

  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = "";

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Email verified successfully, please login" });
};

//LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError("Please verify your email");
  }

  if (!user.active) {
    throw new CustomError.UnauthenticatedError(
      "This user is not fully activated, please contact the HR Admin"
    );
  }

  const tokenUser = createTokenUser(user);

  //Create refresh token
  let refreshToken = "";

  //check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  //This uses the old existingToken when a user logs in for refresh Token
  // if (existingToken) {
  //   const { isValid } = existingToken;

  //   if (!isValid) {
  //     throw new CustomError.UnauthenticatedError("Invalid Credentials");
  //   }

  //   refreshToken = existingToken.refreshToken;
  //   attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  //   res.status(StatusCodes.OK).json({ user: tokenUser });
  //   return;
  // }

  //While this updates the user refreshToken and attach it to cookies
  if (existingToken) {
    const { isValid } = existingToken;

    if (!isValid) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }

    refreshToken = crypto.randomBytes(40).toString("hex");

    const userTokenUpdated = await Token.findOneAndUpdate(
      { user: user._id },
      {
        refreshToken: refreshToken,
        lastLogin: Date.now(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    attachCookiesToResponse({ res, user: tokenUser, refreshToken: userTokenUpdated.refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"]; //another was to get attributes from request like req.get('origin')
  const ip = req.ip;
  const lastLogin = Date.now();
  const userToken = { refreshToken, ip, userAgent, user: user._id, lastLogin };
  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

//Logout
const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    throw new CustomError.BadRequestError("Please provide a valid email");
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");

    //send email
    const origin = "https://hr-portal.theplace.com.ng";
    // const origin = "http://localhost:5173";
    await sendResetPasswordEmail({
      name: user.firstName,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;

    await user.save();
  }

  res.status(StatusCodes.OK).json({ msg: "Please check your email for the reset password link" });
};

const resetPassword = async (req, res) => {
  console.log(req.body);
  const { token, email, password, confirmPassword } = req.body;

  if (!token || !email || !password || !confirmPassword) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();
    if (user.passwordToken == createHash(token) && user.passwordTokenExpirationDate > currentDate) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }
  res.status(StatusCodes.OK).json({ msg: "Password reset successfully" });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};

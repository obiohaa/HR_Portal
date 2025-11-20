const User = require("../../models/User");
const StepState = require("../../models/StepState");
const Token = require("../../models/Token");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");
const { sendAdminVerificationEmail } = require("../../utils");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const logger = require("../../utils/logger");
const crypto = require("crypto");
require("dotenv").config();

const register = async (req, res) => {
  logger.info("Admin Registration initiated");

  let parsed;

  try {
    parsed = JSON.parse(req.body.body);
  } catch (error) {
    logger.error("Failed to parse request body", { error: error.message });
    throw new CustomError.BadRequestError("Invalid request format");
  }

  const { firstName, lastName, email, password } = parsed;

  if (!firstName || !lastName || !email || !password) {
    logger.warn("Missing required registration fields", { firstName, lastName, email });
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    logger.warn("Email already exists during registration", { email });
    throw new CustomError.BadRequestError("Email already exists");
  }

  // FILE FUNCTIONALITY
  let imageUrl;
  const maxSize = 5000000; // 5MB

  try {
    if (req.files && req.files.file) {
      const userImage = req.files.file;

      if (!userImage.mimetype.startsWith("image")) {
        logger.warn("Invalid file type uploaded", { mimetype: userImage.mimetype });
        throw new CustomError.BadRequestError("Please upload a valid image file");
      }

      if (userImage.size > maxSize) {
        logger.warn("Uploaded file too large", { size: userImage.size });
        throw new CustomError.BadRequestError("Please upload file smaller than 5MB");
      }

      const result = await cloudinary.uploader.upload(userImage.tempFilePath, {
        use_filename: true,
        folder: "HR_ADMIN_PORTAL",
      });

      fs.unlinkSync(userImage.tempFilePath); // remove temp file
      imageUrl = result.secure_url;

      logger.info("User image uploaded successfully", { imageUrl });
    } else {
      // Fallback default image
      imageUrl =
        "https://res.cloudinary.com/theplace-com-ng/image/upload/v1751159857/HR_ADMIN_PORTAL/person_placeholder_rngmst.jpg";

      logger.info("No image uploaded, using default placeholder image");
    }

    //  CREATE USER

    const role = "admin";
    const verificationToken = crypto.randomBytes(40).toString("hex");

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
      verificationToken,
      imgURL: imageUrl,
    });

    logger.info("New user created successfully", { userId: newUser._id, email });

    //  SEND EMAIL VERIFICATION

    const origin = process.env.PRODUCTION_ORIGIN;
    // const origin = "https://hr-portal.theplace.com.ng";
    // const origin = "http://localhost:5173";
    // const newOrigin = 'https://react-node-user-workflow-front-end.netlify.app'; //production

    // const tempOrigin = req.get('origin'); //where the request is coming from (client via proxy)
    // const protocol = req.protocol; //http protocol
    // const host = req.get('host'); //where the request to coming to, i.e server
    // const forwardedHost = req.get('x-forwarded-host'); //where the request is really coming from without proxy
    // const forwardedProtocol = req.get('x-forwarded-proto'); //protocol without proxy
    //Create the user Step State

    await sendAdminVerificationEmail({
      firstName: newUser.firstName,
      email: newUser.email,
      verificationToken: newUser.verificationToken,
      origin,
    });

    logger.info("Verification email sent", { email });

    //  RESPONSE
    res.status(StatusCodes.CREATED).json({
      msg: "Success! Please check email to verify your account",
    });
  } catch (error) {
    logger.error("Registration failed", {
      message: error.message,
      stack: error.stack,
    });

    throw new CustomError.BadRequestError("Error registering user, please try again");
  }
};

module.exports = {
  register,
};

const User = require("../../models/User");
const StepState = require("../../models/StepState");
const Token = require("../../models/Token");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");
const { sendAdminVerificationEmail } = require("../../utils");
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
  if (req.files) {
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

    const role = "admin";

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

    const origin = "https://hr_portal.theplace.com.ng";
    // const origin = "http://localhost:5173";
    // const newOrigin = 'https://react-node-user-workflow-front-end.netlify.app'; //production

    // const tempOrigin = req.get('origin'); //where the request is coming from (client via proxy)
    // const protocol = req.protocol; //http protocol
    // const host = req.get('host'); //where the request to coming to, i.e server
    // const forwardedHost = req.get('x-forwarded-host'); //where the request is really coming from without proxy
    // const forwardedProtocol = req.get('x-forwarded-proto'); //protocol without proxy
    //Create the user Step State

    //send email
    await sendAdminVerificationEmail({
      firstName: user.firstName,
      email: user.email,
      verificationToken: user.verificationToken,
      origin,
    });
  } else {
    const role = "admin";

    const verificationToken = crypto.randomBytes(40).toString("hex");

    const imgURL =
      "https://res.cloudinary.com/theplace-com-ng/image/upload/v1751159857/HR_ADMIN_PORTAL/person_placeholder_rngmst.jpg";

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
      verificationToken,
      imgURL,
    });

    const origin = "https://hr_portal.theplace.com.ng";
    // const origin = "http://localhost:5173";
    // const newOrigin = 'https://react-node-user-workflow-front-end.netlify.app'; //production

    // const tempOrigin = req.get('origin'); //where the request is coming from (client via proxy)
    // const protocol = req.protocol; //http protocol
    // const host = req.get('host'); //where the request to coming to, i.e server
    // const forwardedHost = req.get('x-forwarded-host'); //where the request is really coming from without proxy
    // const forwardedProtocol = req.get('x-forwarded-proto'); //protocol without proxy
    //Create the user Step State

    //send email
    await sendAdminVerificationEmail({
      firstName: user.firstName,
      email: user.email,
      verificationToken: user.verificationToken,
      origin,
    });
  }
  //send verification token only while testing in post man
  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please check email to verify your account",
  });
};

module.exports = {
  register,
};

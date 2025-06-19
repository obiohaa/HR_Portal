const User = require("../models/User");
const BioData = require("../models/BioData");
const StepState = require("../models/StepState");
const Guarantor = require("../models/Guarantor");
const NextOfKin = require("../models/NextOfKin");
const finalNDA = require("../models/FinalNDA");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
  sendGuarantorEmailOne,
  sendGuarantorEmailTwo,
} = require("../utils");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const fs = require("fs");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  console.log(req.params.id);
  const user = await User.findOne({ _id: req.params.id });
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
/////////////////////////////////////////////////////////////////////////////////////
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
  console.log(JSON.parse(req.body.body));
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

  const user = await BioData.findOne({ email: req.user.email });
  if (user) {
    throw new CustomError.BadRequestError("Bio Data already exist");
  }

  // FILE FUNCTIONALITY
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const userFile = req.files.file;
  if (!userFile.mimetype.startsWith("application")) {
    throw new CustomError.BadRequestError("Please upload a PDF or Doc File");
  }
  const maxSize = 5000000;
  if (userFile.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload file smaller than 5MB");
  }

  try {
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
    };

    //Add do database
    const UserBioData = await BioData.create(mainUserBioData);
    if (UserBioData.createdAt) {
      //User steps update
      const userStepState = {
        currentStep: 2,
        nextStep: 3,
        completed: false,
        completedStep: 1,
      };

      const updateUserStepState = await StepState.findOneAndUpdate(
        { user: req.user.userId },
        {
          currentStep: userStepState.currentStep,
          nextStep: userStepState.nextStep,
          completed: userStepState.completed,
          completedStep: userStepState.completedStep,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    return res.status(StatusCodes.OK).json({
      steps: {
        msg: "Bio Data created",
      },
    });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
};

//get bioData step, step status and completed
const getBioDataStatus = async (req, res) => {
  const bioDataStep = await BioData.findOne({ email: req.user.email }).select(
    "step nextStep completed"
  );
  res.status(StatusCodes.OK).json({ bioDataStep });
};

//View user current step
const userStepState = async (req, res) => {
  const currentUserStepState = await StepState.findOne({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ currentUserStepState });
};

//Update user previous step
const updateUserPrevStepState = async (req, res) => {
  const currentUserStepState = await StepState.findOne({ user: req.user.userId });
  if (!currentUserStepState) {
    throw new CustomError.BadRequestError("This user does not exist");
  }
  if (currentUserStepState.currentStep === 1) {
    throw new CustomError.BadRequestError("No previous page");
  }
  if (currentUserStepState && currentUserStepState.currentStep > 1) {
    const updateStepState = await StepState.findOneAndUpdate(
      { user: req.user.userId },
      {
        currentStep: currentUserStepState.currentStep - 1,
        nextStep: currentUserStepState.nextStep - 1,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(StatusCodes.OK).json({ updateStepState });
  }
};

//Update user next step
const updateUserNextStepState = async (req, res) => {
  const currentUserStepState = await StepState.findOne({ user: req.user.userId });
  if (!currentUserStepState) {
    throw new CustomError.BadRequestError("This user does not exist");
  }
  if (currentUserStepState.currentStep === 4) {
    throw new CustomError.BadRequestError("No Next page");
  }
  if (currentUserStepState && currentUserStepState.currentStep < 4) {
    const updateStepState = await StepState.findOneAndUpdate(
      { user: req.user.userId },
      {
        currentStep: currentUserStepState.currentStep + 1,
        nextStep: currentUserStepState.nextStep + 1,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(StatusCodes.OK).json({ updateStepState });
  }
};

const nextOfKinData = async (req, res) => {
  const { nextOfKinFirstName, nextOfKinLastName, houseAddress, nextOfKinRelationship } = req.body;

  if (!nextOfKinFirstName || !nextOfKinLastName || !houseAddress || !nextOfKinRelationship) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  req.body.user = req.user.userId;

  try {
    const user = await NextOfKin.findOne({ user: req.user.userId });
    if (user) {
      throw new CustomError.BadRequestError("Next ok Kin already exist");
    }
    //Add do database
    const UserBioData = await NextOfKin.create(req.body);
    if (UserBioData.createdAt) {
      //User steps update
      const userStepState = {
        currentStep: 3,
        nextStep: 4,
        completed: false,
        completedStep: 2,
      };

      const updateUserStepState = await StepState.findOneAndUpdate(
        { user: req.user.userId },
        {
          currentStep: userStepState.currentStep,
          nextStep: userStepState.nextStep,
          completed: userStepState.completed,
          completedStep: userStepState.completedStep,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    return res.status(StatusCodes.OK).json({
      steps: {
        msg: "Next of Kin created",
      },
    });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
};

const guarantorUser = async (req, res) => {
  console.log(req.body);

  const { guarantorOneEmail, guarantorTwoEmail } = req.body;
  if (!guarantorOneEmail || !guarantorTwoEmail) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  try {
    const user = req.user.userId;
    const firstName = req.user.firstName;
    const lastName = req.user.lastName;
    const origin = "http://localhost:5173";

    const emailOneAlreadyExists = await Guarantor.findOne({ guarantorOneEmail });
    const emailTwoAlreadyExists = await Guarantor.findOne({ guarantorTwoEmail });

    console.log(emailOneAlreadyExists);
    console.log(emailTwoAlreadyExists);

    if (emailOneAlreadyExists && emailOneAlreadyExists.isCompleted == false) {
      console.log("email one exist but confirmed false");
      //send email One
      await sendGuarantorEmailOne({
        firstName: firstName,
        lastName: lastName,
        email: emailOneAlreadyExists.guarantorOneEmail,
        verificationToken: emailOneAlreadyExists.verificationToken,
        origin,
      });
    }

    if (emailTwoAlreadyExists && emailTwoAlreadyExists.isCompleted == false) {
      console.log("email two exist but confirmed false");
      //send email Two
      await sendGuarantorEmailTwo({
        firstName: firstName,
        lastName: lastName,
        email: emailTwoAlreadyExists.guarantorTwoEmail,
        verificationToken: emailTwoAlreadyExists.verificationToken,
        origin,
      });
    }

    if (!emailOneAlreadyExists) {
      const verificationToken = crypto.randomBytes(50).toString("hex");
      const guarantorOne = await Guarantor.create({ guarantorOneEmail, user, verificationToken });
      console.log(guarantorOne);
      // send email One
      await sendGuarantorEmailOne({
        firstName: firstName,
        lastName: lastName,
        email: guarantorOne.guarantorOneEmail,
        verificationToken: guarantorOne.verificationToken,
        origin,
      });
    }

    if (!emailOneAlreadyExists) {
      const verificationToken = crypto.randomBytes(50).toString("hex");
      const guarantorTwo = await Guarantor.create({ guarantorTwoEmail, user, verificationToken });
      console.log(guarantorTwo);
      // send email Two
      await sendGuarantorEmailTwo({
        firstName: firstName,
        lastName: lastName,
        email: guarantorTwo.guarantorTwoEmail,
        verificationToken: guarantorTwo.verificationToken,
        origin,
      });
    }

    //send verification token only while testing in post man
    res.status(StatusCodes.CREATED).json({
      msg: "Success! Email sent to Guarantors",
    });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
};

const updateGuarantor = async (req, res) => {
  const {
    fullName,
    houseAddress,
    phoneNumber,
    occupation,
    employer,
    employerAddress,
    employeeFullName,
    employeeDesignation,
    outletEmployed,
    ageRange,
    uniformedPublicServant,
    signedPolicy,
    verificationToken,
    email,
  } = JSON.parse(req.body.body);
  // console.log(JSON.parse(req.body.body));
  if (
    !fullName ||
    !houseAddress ||
    !phoneNumber ||
    !occupation ||
    !employer ||
    !employerAddress ||
    !employeeFullName ||
    !employeeDesignation ||
    !outletEmployed ||
    !ageRange ||
    !uniformedPublicServant ||
    !signedPolicy ||
    !verificationToken ||
    !email
  ) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const guarantorUpdateData = JSON.parse(req.body.body);

  const guarantorData = await Guarantor.findOne({
    $or: [{ guarantorOneEmail: email }, { guarantorTwoEmail: email }],
  });

  if (guarantorData.isCompleted === 1) {
    throw new CustomError.BadRequestError("Guarantor form already completed");
  }

  if (!guarantorData || guarantorData.verificationToken !== verificationToken) {
    throw new CustomError.BadRequestError("Invalid verification token or email");
  }

  //FILE FUNCTIONALITY
  if (!req.files || !req.files.file[0] || !req.files.file[1]) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }

  const IDFile = req.files.file[0];
  const passportFile = req.files.file[1];

  if (!IDFile.mimetype.startsWith("image") || !passportFile.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload an Image File");
  }
  const maxSize = 5000000;
  if (IDFile.size > maxSize || passportFile.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload file smaller than 5MB");
  }

  //add file data to req,body
  try {
    //Upload to cloudinary
    const resultIDFile = await cloudinary.uploader.upload(IDFile.tempFilePath, {
      use_filename: true,
      folder: "HR_ADMIN_PORTAL",
    });
    const resultPassportFile = await cloudinary.uploader.upload(passportFile.tempFilePath, {
      use_filename: false,
      folder: "HR_ADMIN_PORTAL",
    });
    //unlink/delete the file
    fs.unlinkSync(IDFile.tempFilePath);
    fs.unlinkSync(passportFile.tempFilePath);

    const mainGuarantorData = {
      ...guarantorUpdateData,
      isCompleted: 1,
      passport: resultIDFile.secure_url,
      identificationCard: resultPassportFile.secure_url,
    };

    //UPDATE GUARANTOR FORM
    const updatedGuarantor = await Guarantor.findOneAndUpdate(
      { _id: guarantorData._id },
      {
        ...mainGuarantorData,
        verificationToken: "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    console.log(updatedGuarantor);

    if (updatedGuarantor) {
      //UPDATE STEP STATUS guarantorStep BY ADDING ONE TO THE INITIAL ONE
      const updateGuarantorStepForDash = await StepState.findOne({ user: guarantorData.user });
      if (updateGuarantorStepForDash) {
        const updateGuarantorStepForDashboard = await StepState.findOneAndUpdate(
          { user: guarantorData.user },
          {
            guarantorStep: updateGuarantorStepForDash.guarantorStep + 1,
          },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log(updateGuarantorStepForDashboard);
      }

      const checkGuarantorCompletion = await Guarantor.find({ user: guarantorData.user });
      console.log(checkGuarantorCompletion);
      const isGuarantorCompleted = checkGuarantorCompletion.map((item) => item.isCompleted);
      console.log(isGuarantorCompleted);
      const confirmGuarantorCompletion =
        isGuarantorCompleted.filter((value) => value === 1).length > 1;
      console.log(confirmGuarantorCompletion);
      if (confirmGuarantorCompletion) {
        //Update guarantor step to completed IF both guarantors have completed their form
        const updateGuarantorStep = await StepState.findOneAndUpdate(
          { user: guarantorData.user },
          {
            currentStep: 4,
            nextStep: 5,
            completed: true,
            completedStep: 3,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
    }

    return res.status(StatusCodes.OK).json({
      steps: {
        msg: "Guarantor form updated successfully",
      },
    });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
};

const finalAgreement = async (req, res) => {
  const { finalAgreement } = req.body;
  if (!finalAgreement) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const userStepState = await StepState.findOne({ user: req.user.userId });
  if (!userStepState) {
    throw new CustomError.BadRequestError("This user does not exist");
  }

  try {
    const finalUserAgreementData = { ...req.body, user: req.user.userId };

    console.log(finalUserAgreementData);
    const finalUserAgreement = await finalNDA.create(finalUserAgreementData);
    if (!finalUserAgreement) {
      throw new CustomError.BadRequestError("Final Agreement not created, try again");
    }

    //CREATE FINAL NDA FOR USER
    const updateStepState = await StepState.findOneAndUpdate(
      { user: req.user.userId },
      {
        completed: true,
        completedStep: userStepState.completedStep + 1,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (updateStepState) {
      res.status(StatusCodes.OK).json({
        steps: {
          msg: "Final Agreement completed",
        },
      });
    }
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  bioData,
  getBioDataStatus,
  userStepState,
  updateUserPrevStepState,
  updateUserNextStepState,
  nextOfKinData,
  guarantorUser,
  updateGuarantor,
  finalAgreement,
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

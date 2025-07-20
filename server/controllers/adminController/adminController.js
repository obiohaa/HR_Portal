const User = require("../../models/User");
const BioData = require("../../models/BioData");
const StepState = require("../../models/StepState");
const Guarantor = require("../../models/Guarantor");
const NextOfKin = require("../../models/NextOfKin");
const finalNDA = require("../../models/FinalNDA");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const CustomError = require("../../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
  sendGuarantorEmailOne,
  sendGuarantorEmailTwo,
} = require("../../utils");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const fs = require("fs");

//get all users where role is admin
const getAllAdminUsers = async (req, res) => {
  const excludedAdminId = "686177da71064b4821e19289";
  //_id: { $ne: excludedAdminId }
  const adminUsers = await User.find({ role: "admin" })
    .select("-password -passwordToken -verificationToken -passwordTokenExpirationDate -__v")
    .sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({
    msg: "Admin users generated",
    adminUsers,
    count: adminUsers.length,
  });
};
//get all users where role is employee
const getAllUsers = async (req, res) => {
  const employeeUsers = await User.find({ role: "employee" })
    .select("-password -passwordToken -verificationToken -passwordTokenExpirationDate -__v")
    .sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({
    msg: "Employee users generated",
    employeeUsers,
    count: employeeUsers.length,
  });
};
//get all bioData
const getAllBioData = async (req, res) => {
  const AllBioData = await BioData.find()
    .sort({ createdAt: -1 })
    .select("-user -createdAt -updatedAt -__v");
  res.status(StatusCodes.OK).json({
    msg: "Bio Data generated",
    AllBioData,
    count: AllBioData.length,
  });
};
//get all bio data per user
const getAllBioDataPerUser = async (req, res) => {
  const AllBioDataPerUser = await BioData.find({ _id: req.params.id })
    .sort({ createdAt: -1 })
    .select("-user -createdAt -updatedAt -__v");
  res.status(StatusCodes.OK).json({
    msg: "Bio Data generated",
    AllBioDataPerUser,
    count: AllBioDataPerUser.length,
  });
};

//get bio data from date range
const getBioDataFromDateRange = async (req, res) => {
  console.log(req.body);
  const { firstDate, secondDate } = req.body;
  if (!firstDate || !secondDate) {
    throw new CustomError.BadRequestError("Please provide both start and end dates");
  }
  const start = new Date(firstDate);
  const end = new Date(secondDate);
  end.setHours(23, 59, 59, 999); // Set the end date to the end of the day
  const AllBioData = await BioData.find({
    createdAt: {
      $gte: new Date(start),
      $lte: new Date(end),
    },
  })
    .sort({ createdAt: -1 })
    .select("-user -createdAt -updatedAt -__v");
  //
  if (AllBioData === "" || AllBioData.length === 0) {
    throw new CustomError.BadRequestError("No data for this date range");
  }
  res.status(StatusCodes.OK).json({
    msg: "Bio Data Report Generated",
    AllBioData,
    count: AllBioData.length,
  });
};

//get employee users based on date range
const getEmployeeUsersFromDateRange = async (req, res) => {
  const { firstDate, secondDate } = req.body;
  if (!firstDate || !secondDate) {
    throw new CustomError.BadRequestError("Please provide both start and end dates");
  }
  const start = new Date(firstDate);
  const end = new Date(secondDate);
  end.setHours(23, 59, 59, 999); // Set the end date to the end of the day
  const employeeUsers = await User.find({
    role: "employee",
    createdAt: {
      $gte: new Date(start),
      $lte: new Date(end),
    },
  })
    .sort({ createdAt: -1 })
    .select(
      "-password -passwordToken -verificationToken -passwordTokenExpirationDate -__v -updatedAt -_id"
    );

  //
  if (employeeUsers === "" || employeeUsers.length === 0) {
    throw new CustomError.BadRequestError("No data for this date range");
  }

  res.status(StatusCodes.OK).json({
    msg: "Employee Users Report Generated",
    // employeeUsers,
    count: employeeUsers.length,
  });
};

//get Next of Kin users based on date range
const getNOKDataFromDateRange = async (req, res) => {
  console.log(req.body);
  const { firstDate, secondDate } = req.body;
  if (!firstDate || !secondDate) {
    throw new CustomError.BadRequestError("Please provide both start and end dates");
  }
  const start = new Date(firstDate);
  const end = new Date(secondDate);
  end.setHours(23, 59, 59, 999); // Set the end date to the end of the day
  const AllNOKData = await NextOfKin.find({
    createdAt: {
      $gte: new Date(start),
      $lte: new Date(end),
    },
  })
    .sort({ createdAt: -1 })
    .select("-user -createdAt -updatedAt -__v");
  //
  if (AllNOKData === "" || AllNOKData.length === 0) {
    throw new CustomError.BadRequestError("No data for this date range");
  }
  res.status(StatusCodes.OK).json({
    msg: "NOK Report Generated",
    AllNOKData,
    count: AllNOKData.length,
  });
};

//get Guarantor data from date range
const getGuaDataFromDateRange = async (req, res) => {
  const { firstDate, secondDate } = req.body;
  if (!firstDate || !secondDate) {
    throw new CustomError.BadRequestError("Please provide both start and end dates");
  }
  const start = new Date(firstDate);
  const end = new Date(secondDate);
  end.setHours(23, 59, 59, 999); // Set the end date to the end of the day
  const AllGuaData = await Guarantor.find({
    createdAt: {
      $gte: new Date(start),
      $lte: new Date(end),
    },
  })
    .sort({ createdAt: -1 })
    .select("-user -createdAt -updatedAt -__v -verificationToken -isCompleted ");
  //
  if (AllGuaData === "" || AllGuaData.length === 0) {
    throw new CustomError.BadRequestError("No data for this date range");
  }
  res.status(StatusCodes.OK).json({
    msg: "Bio Data Report Generated",
    AllGuaData,
    count: AllGuaData.length,
  });
};

//UPDATE BIO DATA PER USER
const updateOneBioData = async (req, res) => {
  const {
    firstName,
    lastName,
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
    email,
    id,
  } = JSON.parse(req.body.body);
  // console.log(JSON.parse(req.body.body));
  if (
    !firstName ||
    !lastName ||
    !dateOfBirth ||
    !state_of_origin ||
    !gender ||
    !maritalStatus ||
    !houseAddress ||
    !phoneNumber ||
    !email ||
    !bankName ||
    !bankAccountNumber ||
    !pension ||
    !levelOfEducation
  ) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  let updatedUserBioData = JSON.parse(req.body.body);
  // console.log(req.user);
  const user = await BioData.findOne({ _id: updatedUserBioData.id });
  if (!user) {
    throw new CustomError.BadRequestError("Bio Data does not exist");
  }

  // IF FILE EXIST, RUN FILE FUNCTIONALITY
  console.log(req.files);
  if (req.files) {
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
      console.log(result);
      //unlink/delete the file
      fs.unlinkSync(userFile.tempFilePath);

      const mainUserBioData = {
        ...updatedUserBioData,
        UserFileUrl: result.secure_url,
      };

      const updatedMainUserBioData = await BioData.findOneAndUpdate(
        { _id: updatedUserBioData.id },
        {
          ...mainUserBioData,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log(updatedMainUserBioData);
      const updateUserData = await User.findOneAndUpdate(
        { email: updatedUserBioData.email },
        {
          firstName: updatedMainUserBioData.firstName,
          lastName: updatedMainUserBioData.lastName,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log(updateUserData);

      return res.status(StatusCodes.OK).json({
        msg: "Bio Data Updated",
      });
    } catch (error) {
      throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
    }
  } else {
    try {
      const mainUserBioData = {
        ...updatedUserBioData,
      };
      //
      console.log(mainUserBioData);
      const updatedMainUserBioData = await BioData.findOneAndUpdate(
        { _id: updatedUserBioData.id },
        {
          ...mainUserBioData,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log(updatedMainUserBioData);

      const updateUserData = await User.findOneAndUpdate(
        { email: updatedUserBioData.email },
        {
          firstName: updatedMainUserBioData.firstName,
          lastName: updatedMainUserBioData.lastName,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log(updateUserData);

      return res.status(StatusCodes.OK).json({
        msg: "Bio Data Updated",
      });
    } catch (error) {
      throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
    }
  }
};
//get all next of kin
const getAllNOK = async (req, res) => {
  const AllNOK = await NextOfKin.find()
    .populate({
      path: "user",
      select:
        "-password -isVerified -passwordToken -verificationToken -passwordTokenExpirationDate -__v -_id -role -imgURL -active -email -createdAt -updatedAt -verified",
    })
    .sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({
    msg: "Next of Kin generated",
    AllNOK,
    count: AllNOK.length,
  });
};

//UPDATE NEXT OF KIN
const updateNOKData = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, gender, houseAddress, phoneNumber, relationship } = req.body;
  if (!firstName || !lastName || !gender || !relationship || !houseAddress || !phoneNumber) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const NOKData = req.body;
  const NOKMainData = await NextOfKin.findOne({ _id: NOKData.id });

  if (!NOKMainData) {
    throw new CustomError.BadRequestError("NOK does not exist");
  }

  try {
    const updatedMainUserNOK = await NextOfKin.findOneAndUpdate(
      { _id: NOKData.id },
      {
        nextOfKinFirstName: NOKData.firstName,
        nextOfKinLastName: NOKData.lastName,
        nextOfKinRelationship: NOKData.relationship,
        houseAddress: NOKData.houseAddress,
        gender: NOKData.gender,
        phoneNumber: NOKData.phoneNumber,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    console.log(updatedMainUserNOK);

    return res.status(StatusCodes.OK).json({
      msg: "NOK Data Updated",
    });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
};

//get all guarantors
const getAllGuarantor = async (req, res) => {
  const AllGuarantor = await Guarantor.find()
    .sort({ user: 1 })
    .populate({
      path: "user",
      select:
        "-password -isVerified -passwordToken -verificationToken -passwordTokenExpirationDate -__v -_id -role -imgURL -active -email -createdAt -updatedAt -verified",
    })
    .sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({
    msg: "Guarantor generated",
    AllGuarantor,
    count: AllGuarantor.length,
  });
};

//get all GuarantorOne
const getAllGuarantorOne = async (req, res) => {
  const AllGuarantorOne = await Guarantor.find({ guarantorOneEmail: { $exists: true } }).populate({
    path: "user",
    select:
      "-password -isVerified -passwordToken -verificationToken -passwordTokenExpirationDate -__v -_id -role -imgURL -active -email -createdAt -updatedAt -verified",
  });
  res.status(StatusCodes.OK).json({
    msg: "Guarantor One generated",
    AllGuarantorOne,
    count: AllGuarantorOne.length,
  });
};

//get all guarantorTwo using email
const getAllGuarantorTwo = async (req, res) => {
  const AllGuarantorTwo = await Guarantor.find({ guarantorTwoEmail: { $exists: true } }).populate({
    path: "user",
    select:
      "-password -isVerified -passwordToken -verificationToken -passwordTokenExpirationDate -__v -_id -role -imgURL -active -email -createdAt -updatedAt -verified",
  });
  res.status(StatusCodes.OK).json({
    msg: "Guarantor Two generated",
    AllGuarantorTwo,
    count: AllGuarantorTwo.length,
  });
};

//get all who has completed NDA
const getAllNDA = async (req, res) => {
  const AllNDA = await finalNDA.find().populate({
    path: "user",
    select:
      "-password -isVerified -passwordToken -verificationToken -passwordTokenExpirationDate -__v -_id -role -imgURL -active -email -createdAt -updatedAt -verified",
  });

  res.status(StatusCodes.OK).json({
    msg: "NDA Data generated",
    AllNDA,
    count: AllNDA.length,
  });
};

//DELETE USER
const deleteUser = async (req, res) => {
  const deleteThisItem = req.body.ids;
  const neverDelete = "686177da71064b4821e19289"; //Protected Admin Id

  if (deleteThisItem.includes(neverDelete)) {
    throw new CustomError.BadRequestError("You cannot delete Administrator");
  }
  //$in matches document where _id match (or is in) any of the values in array filteredArray
  //can also be used in array of objects
  try {
    const result = await User.deleteMany({
      _id: { $in: deleteThisItem },
    });
    if (result.deletedCount === 0) {
      throw new CustomError.BadRequestError("No user were deleted");
    }
    res.status(StatusCodes.OK).json({ msg: "Success! User(s) deleted" });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
};

//UPDATE USER STATUS, ACTIVE OR INACTIVE
const updateStatus = async (req, res) => {
  console.log(req.body.data);

  const updateThisStatus = req.body.data;
  const neverUpdate = "686177da71064b4821e19289"; //Protected Admin Id

  if (updateThisStatus.includes(neverUpdate)) {
    throw new CustomError.BadRequestError("You cannot update Administrator");
  }
  //$in matches document where _id match (or is in) any of the values in array filteredArray
  //can also be used in array of objects
  try {
    // Get users whose status should be toggled
    const users = await User.find({ _id: { $in: updateThisStatus } });
    console.log(users);
    // Toggle each user's active status and update them
    const updateAdminUserStatus = users.map((user) =>
      User.findByIdAndUpdate(user._id, { active: !user.active }, { new: true, runValidators: true })
    );
    //update all users concurrently. Collect all these individual promises into an array or takes an iterable (like an array) of promises and returns a single Promise. This returned Promise resolves when all the input promises have resolved, or rejects as soon as any of the input promises reject.
    await Promise.all(updateAdminUserStatus);

    res.status(StatusCodes.OK).json({ msg: "Success! User(s) status toggled" });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin: " + error.message);
  }
};

//EDIT SINGLE USER
const editUser = async (req, res) => {
  // console.log(req.body.body);
  const { firstName, lastName, email, isVerified } = JSON.parse(req.body.body);
  if (!firstName || !lastName || !email) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  if (email === "chukwuebuka.obi@theplace.com.ng" || email === "administrator@theplace.com.ng") {
    throw new CustomError.BadRequestError("You cannot edit Administrator");
  }

  const user = await User.findOne({ email: email });
  console.log(user);
  if (!user) {
    throw new CustomError.BadRequestError("User does not exist");
  }

  try {
    //IF FILES/IMAGE IS UPLOADED
    if (req.files) {
      const UpdatedFile = req.files.file;

      if (!UpdatedFile.mimetype.startsWith("image")) {
        throw new CustomError.BadRequestError("Please upload an Image File");
      }
      const maxSize = 5000000;
      if (UpdatedFile.size > maxSize) {
        throw new CustomError.BadRequestError("Please upload file smaller than 5MB");
      }

      //Upload to cloudinary
      const resultUpdatedFile = await cloudinary.uploader.upload(UpdatedFile.tempFilePath, {
        use_filename: true,
        folder: "HR_ADMIN_PORTAL",
      });

      //unlink/delete the file
      fs.unlinkSync(UpdatedFile.tempFilePath);

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.isVerified = isVerified;
      user.imgURL = resultUpdatedFile.secure_url;

      await user.save();

      if (user.role === "employee") {
        await BioData.findOneAndUpdate(
          { email: email },
          {
            firstName: firstName,
            lastName: lastName,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // const tokenUser = createTokenUser(user);
      // attachCookiesToResponse({ res, user: tokenUser });
      res.status(StatusCodes.OK).json({ msg: "User details updated" });
    } else {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.isVerified = isVerified;

      await user.save();

      if (user.role === "employee") {
        await BioData.findOneAndUpdate(
          { email: email },
          {
            firstName: firstName,
            lastName: lastName,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }

      // const tokenUser = createTokenUser(user);
      // attachCookiesToResponse({ res, user: tokenUser });
      res.status(StatusCodes.OK).json({ msg: "User details updated" });
    }
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
};

// UPDATE SINGLE GUARANTOR
const updateGuarantor = async (req, res) => {
  try {
    const guarantorUpdateData = JSON.parse(req.body.body);
    const requiredFields = [
      "fullName",
      "houseAddress",
      "phoneNumber",
      "occupation",
      "employer",
      "employerAddress",
      "employeeFullName",
      "employeeDesignation",
      "outletEmployed",
      "ageRange",
      "uniformedPublicServant",
      "signedPolicy",
      "id",
    ];

    for (const field of requiredFields) {
      if (!guarantorUpdateData[field]) {
        throw new CustomError.BadRequestError(`Missing value for ${field}`);
      }
    }

    if (guarantorUpdateData.signedPolicy === "" || guarantorUpdateData.signedPolicy === "No") {
      throw new CustomError.BadRequestError("Agreement must be accepted before updating");
    }

    const guarantorData = await Guarantor.findOne({ _id: guarantorUpdateData.id });
    if (!guarantorData) throw new CustomError.NotFoundError("Guarantor not found");

    const maxSize = 5 * 1024 * 1024;
    const updatePayload = { ...guarantorUpdateData, isCompleted: 1 };

    const uploadImage = async (file) => {
      if (!file.mimetype.startsWith("image") || file.size > maxSize) {
        throw new CustomError.BadRequestError("Invalid image or too large (max 5MB)");
      }
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        use_filename: true,
        folder: "HR_ADMIN_PORTAL",
      });
      fs.unlinkSync(file.tempFilePath);
      return result.secure_url;
    };

    if (req.files) {
      if (req.files.img) {
        updatePayload.passport = await uploadImage(req.files.img);
      }
      if (req.files.file) {
        updatePayload.identificationCard = await uploadImage(req.files.file);
      }
    }

    const updatedGuarantor = await Guarantor.findOneAndUpdate(
      { _id: guarantorData._id },
      { ...updatePayload, verificationToken: "" },
      { new: true, runValidators: true }
    );

    const allGuarantors = await Guarantor.find({ user: guarantorData.user });
    const completedCount = allGuarantors.filter((g) => g.isCompleted === 1).length;
    const guarantorStep = completedCount > 1 ? 2 : 1;

    await StepState.findOneAndUpdate(
      { user: guarantorData.user },
      {
        ...(completedCount > 1 && {
          currentStep: 4,
          nextStep: 5,
          completed: false,
          completedStep: 3,
        }),
        guarantorStep,
      },
      { new: true, runValidators: true }
    );

    res.status(StatusCodes.OK).json({
      steps: { msg: "Guarantor form updated successfully" },
    });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin: " + error.message);
  }
};

//DELETE GUARANTOR THAT IS INCOMPLETE
const deleteGua = async (req, res) => {
  const deleteThisItem = req.body.ids;
  const neverDelete = "686177da71064b4821e19289"; //Protected Admin Id

  if (deleteThisItem.includes(neverDelete)) {
    throw new CustomError.BadRequestError("You cannot delete Administrator");
  }

  const findThisGuarantor = await Guarantor.find({ _id: req.body.ids });

  if (!findThisGuarantor) {
    throw new CustomError.BadRequestError("This Guarantor does not exist");
  }

  if (findThisGuarantor.isCompleted === 1) {
    throw new CustomError.BadRequestError("This Guarantor's data is complete");
  }
  //$in matches document where _id match (or is in) any of the values in array filteredArray
  //can also be used in array of objects
  try {
    const result = await Guarantor.deleteMany({
      _id: { $in: deleteThisItem },
    });
    if (result.deletedCount === 0) {
      throw new CustomError.BadRequestError("No user were deleted");
    }
    res.status(StatusCodes.OK).json({ msg: "Success! User(s) deleted" });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
};

//////////////////////////////////////////////////////////
const getSingleUser = async (req, res) => {
  console.log(req.params.id);
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const getSingleBioData = async (req, res) => {
  const userBio = await BioData.findOne({ user: req.user.userId });
  if (!userBio) {
    throw new CustomError.NotFoundError(`No user with id : ${req.user.userId}`);
  }
  res.status(StatusCodes.OK).json({ userBio });
};

const getSingleNOK = async (req, res) => {
  const userNOK = await NextOfKin.findOne({ user: req.user.userId });
  if (!userNOK) {
    throw new CustomError.NotFoundError(`No user with id : ${req.user.userId}`);
  }
  res.status(StatusCodes.OK).json({ userNOK });
};

const showCurrentUser = async (req, res) => {
  console.log(req.user);
  const loggedInUser = await User.findOne({ _id: req.user.userId }).select("-password");
  const tokenUser = createTokenUser(loggedInUser);
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
// update user with user.save()
const updateUser = async (req, res) => {
  const { firstName, lastName, email, password } = JSON.parse(req.body.body);
  if (!firstName || !lastName || !email || !password) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new CustomError.BadRequestError("User does not exist");
  }

  try {
    //IF FILES/IMAGE IS UPLOADED
    if (req.files) {
      const UpdatedFile = req.files.file;

      if (!UpdatedFile.mimetype.startsWith("image")) {
        throw new CustomError.BadRequestError("Please upload an Image File");
      }
      const maxSize = 5000000;
      if (UpdatedFile.size > maxSize) {
        throw new CustomError.BadRequestError("Please upload file smaller than 5MB");
      }

      //Upload to cloudinary
      const resultUpdatedFile = await cloudinary.uploader.upload(UpdatedFile.tempFilePath, {
        use_filename: true,
        folder: "HR_ADMIN_PORTAL",
      });

      //unlink/delete the file
      fs.unlinkSync(UpdatedFile.tempFilePath);

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      user.imgURL = resultUpdatedFile.secure_url;

      await user.save();

      await BioData.findOneAndUpdate(
        { user: req.user.userId },
        {
          firstName: firstName,
          lastName: lastName,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      const tokenUser = createTokenUser(user);
      attachCookiesToResponse({ res, user: tokenUser });
      res.status(StatusCodes.OK).json({ user: tokenUser });
    } else {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;

      await user.save();

      await BioData.findOneAndUpdate(
        { user: req.user.userId },
        {
          firstName: firstName,
          lastName: lastName,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      const tokenUser = createTokenUser(user);
      attachCookiesToResponse({ res, user: tokenUser });
      res.status(StatusCodes.OK).json({ user: tokenUser });
    }
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
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
//

/////////////////////////////////////////////////////////////////////////////////////
//UPDATE BIO DATA
const updateBioData = async (req, res) => {
  const {
    firstName,
    lastName,
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
  // console.log(JSON.parse(req.body.body));
  if (
    !firstName ||
    !lastName ||
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
  let updatedUserBioData = JSON.parse(req.body.body);
  // console.log(req.user);
  const user = await BioData.findOne({ email: req.user.email });
  if (!user) {
    throw new CustomError.BadRequestError("Bio Data does not exist");
  }

  // IF FILE EXIST, RUN FILE FUNCTIONALITY
  console.log(req.files);
  if (req.files) {
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
      console.log(result);
      //unlink/delete the file
      fs.unlinkSync(req.files.file.tempFilePath);

      const mainUserBioData = {
        ...updatedUserBioData,
        UserFileUrl: result.secure_url,
        email: req.user.email,
        user: req.user.userId,
      };

      const updatedMainUserBioData = await BioData.findOneAndUpdate(
        { user: req.user.userId },
        {
          ...mainUserBioData,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log(updatedMainUserBioData);
      const updateUserData = await User.findOneAndUpdate(
        { _id: req.user.userId },
        {
          firstName: updatedMainUserBioData.firstName,
          lastName: updatedMainUserBioData.lastName,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log(updateUserData);
      const tokenUser = createTokenUser(updateUserData);
      console.log(tokenUser);
      return res.status(StatusCodes.OK).json({
        user: tokenUser,
        updateBio: {
          msg: "Bio Data Updated",
        },
      });
    } catch (error) {
      throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
    }
  } else {
    try {
      const mainUserBioData = {
        ...updatedUserBioData,
        email: req.user.email,
        user: req.user.userId,
      };
      console.log(mainUserBioData);
      const updatedMainUserBioData = await BioData.findOneAndUpdate(
        { user: req.user.userId },
        {
          ...mainUserBioData,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log(updatedMainUserBioData);

      const updateUserData = await User.findOneAndUpdate(
        { _id: req.user.userId },
        {
          firstName: updatedMainUserBioData.firstName,
          lastName: updatedMainUserBioData.lastName,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log(updateUserData);
      const tokenUser = createTokenUser(updateUserData);
      console.log(tokenUser);
      return res.status(StatusCodes.OK).json({
        user: tokenUser,
        updateBio: {
          msg: "Bio Data Updated",
        },
      });
    } catch (error) {
      throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
    }
  }
};

//BIO DATA
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
  // console.log(JSON.parse(req.body.body));
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
  console.log("bio");
  console.log(userBioData);
  console.log(req.user);
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
    console.log(result);
    //unlink/delete the file
    fs.unlinkSync(req.files.file.tempFilePath);
    console.log("inside");
    console.log(userBioData);
    console.log(req.user);
    const mainUserBioData = {
      ...userBioData,
      UserFileUrl: result.secure_url,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      user: req.user.userId,
    };
    console.log(mainUserBioData);
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
      res.status(StatusCodes.OK).json({
        steps: {
          msg: "Bio Data created",
        },
        stepState: { updateUserStepState },
      });
    }
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
  const {
    nextOfKinFirstName,
    nextOfKinLastName,
    houseAddress,
    nextOfKinRelationship,
    gender,
    phoneNumber,
  } = req.body;

  if (
    !nextOfKinFirstName ||
    !nextOfKinLastName ||
    !houseAddress ||
    !nextOfKinRelationship ||
    !gender ||
    !phoneNumber
  ) {
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

  const { oneEmail, twoEmail } = req.body;
  console.log(oneEmail);
  console.log(twoEmail);
  if (!oneEmail || !twoEmail) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  try {
    //bug might be here
    const user = req.user.userId;
    const firstName = req.user.firstName;
    const lastName = req.user.lastName;
    const origin = "http://localhost:5173";

    console.log(user);
    console.log(firstName);
    console.log(lastName);
    console.log(origin);

    const emailOneAlreadyExists = await Guarantor.findOne({ guarantorOneEmail: oneEmail });
    const emailTwoAlreadyExists = await Guarantor.findOne({ guarantorTwoEmail: twoEmail });

    console.log(emailOneAlreadyExists);
    console.log(emailTwoAlreadyExists);

    //IF YOU HAVE SENT IT TO THE FIRST GUARANTOR BEFORE BUT THEY HAVE NOT COMPLETED THE FORM
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

    //IF YOU HAVE SENT IT TO THE SECOND GUARANTOR BEFORE BUT THEY HAVE NOT COMPLETED THE FORM
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

    //IF THIS IS YOUR FIRST TIME SENDING THE EMAIL TO THE FIRST GUARANTOR
    if (!emailOneAlreadyExists) {
      console.log(oneEmail);
      console.log("here for new one");
      const verificationToken = crypto.randomBytes(50).toString("hex");
      const guarantorOne = await Guarantor.create({
        guarantorOneEmail: oneEmail,
        // guarantorTwoEmail: "",
        user: user,
        verificationToken: verificationToken,
      });
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

    //IF THIS IS YOUR FIRST TIME SENDING THE EMAIL TO THE SECOND GUARANTOR
    if (!emailTwoAlreadyExists) {
      console.log("here for new two");
      const verificationToken = crypto.randomBytes(50).toString("hex");
      console.log(twoEmail);
      const guarantorTwo = await Guarantor.create({
        // guarantorOneEmail: "",
        guarantorTwoEmail: twoEmail,
        user: user,
        verificationToken: verificationToken,
      });
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
  getSingleBioData,
  updateBioData,
  getSingleNOK,
  updateNOKData,
  getAllUsers,
  getAllAdminUsers,
  getAllBioData,
  getAllNOK,
  getAllGuarantorOne,
  getAllGuarantorTwo,
  getAllGuarantor,
  getAllNDA,
  deleteUser,
  updateStatus,
  editUser,
  getAllBioDataPerUser,
  updateOneBioData,
  getBioDataFromDateRange,
  getEmployeeUsersFromDateRange,
  getNOKDataFromDateRange,
  deleteGua,
  getGuaDataFromDateRange,
};

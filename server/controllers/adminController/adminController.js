const User = require("../../models/User");
const BioData = require("../../models/BioData");
const StepState = require("../../models/StepState");
const Guarantor = require("../../models/Guarantor");
const NextOfKin = require("../../models/NextOfKin");
const finalNDA = require("../../models/FinalNDA");
const Location = require("../../models/Location");
const Job = require("../../models/Jobs");
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
  const excludedAdminId = "6881e99a77338227e497193d";
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

//get all users where role is employee and status is registered
const getAllUsers = async (req, res) => {
  const employeeUsers = await User.find({ role: "employee", employeeStatus: "registered" })
    .populate("bioData", "staffId -_id -user")
    .select("-password -passwordToken -verificationToken -passwordTokenExpirationDate -__v")
    .sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({
    msg: "Employee users generated",
    employeeUsers,
    count: employeeUsers.length,
  });
};

//GET ALL USERS WHERE ROLE IS EMPLOYEE AND STATUS IS RESUMED
const getAllResumedUsers = async (req, res) => {
  const employeeUsers = await User.find({ role: "employee", employeeStatus: "resumed" })
    .populate("bioData", "staffId -_id -user")
    .select("-password -passwordToken -verificationToken -passwordTokenExpirationDate -__v")
    .sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({
    msg: "Employee users generated",
    employeeUsers,
    count: employeeUsers.length,
  });
};

//GET ALL USERS WHERE ROLE IS EMPLOYEE AND STATUS IS TERMINATED
const getAllTerminatedUsers = async (req, res) => {
  const employeeUsers = await User.find({ role: "employee", employeeStatus: "terminated" })
    .populate("bioData", "staffId -_id -user")
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
    .populate({
      path: "user",
      select:
        "-email -_id -role -imgURL -active -createdAt -updatedAt -verified -firstName -lastName -password -isVerified -passwordToken -verificationToken -passwordTokenExpirationDate -__v",
    })
    .sort({ createdAt: -1 })
    .select(" -createdAt -updatedAt -__v");
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

//get all NOK data per user
const getAllNOKDataPerUser = async (req, res) => {
  const AllNOKDataPerUser = await NextOfKin.find({ _id: req.params.id })
    .sort({ createdAt: -1 })
    .select("-user -createdAt -updatedAt -__v");
  res.status(StatusCodes.OK).json({
    msg: "Bio Data generated",
    AllNOKDataPerUser,
    count: AllNOKDataPerUser.length,
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
    .populate({
      path: "user",
      select:
        "-email -_id -role -imgURL -active -createdAt -updatedAt -verified -firstName -lastName -password -isVerified -passwordToken -verificationToken -passwordTokenExpirationDate -__v",
    })
    .sort({ createdAt: -1 })
    .select(" -createdAt -updatedAt -__v");
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
    employeeStatus: "registered",
    createdAt: {
      $gte: new Date(start),
      $lte: new Date(end),
    },
  })
    .populate("bioData", "staffId -_id -user")
    .select(
      "-password -passwordToken -verificationToken -passwordTokenExpirationDate -__v -updatedAt"
    )
    .sort({ createdAt: -1 });
  //
  if (employeeUsers === "" || employeeUsers.length === 0) {
    throw new CustomError.BadRequestError("No data for this date range");
  }

  res.status(StatusCodes.OK).json({
    msg: "Employee Users Report Generated",
    employeeUsers,
    count: employeeUsers.length,
  });
};

//get resumed employee users based on date range
const getResumedEmployeeUsersFromDateRange = async (req, res) => {
  const { firstDate, secondDate } = req.body;
  if (!firstDate || !secondDate) {
    throw new CustomError.BadRequestError("Please provide both start and end dates");
  }
  const start = new Date(firstDate);
  const end = new Date(secondDate);
  end.setHours(23, 59, 59, 999); // Set the end date to the end of the day
  const employeeUsers = await User.find({
    role: "employee",
    employeeStatus: "resumed",
    createdAt: {
      $gte: new Date(start),
      $lte: new Date(end),
    },
  })
    .populate("bioData", "staffId -_id -user")
    .select(
      "-password -passwordToken -verificationToken -passwordTokenExpirationDate -__v -updatedAt"
    )
    .sort({ createdAt: -1 });

  //
  if (employeeUsers === "" || employeeUsers.length === 0) {
    throw new CustomError.BadRequestError("No data for this date range");
  }

  res.status(StatusCodes.OK).json({
    msg: "Employee Users Report Generated",
    employeeUsers,
    count: employeeUsers.length,
  });
};

//get resumed employee users based on date range
const getTerminatedEmployeeUsersFromDateRange = async (req, res) => {
  const { firstDate, secondDate } = req.body;
  if (!firstDate || !secondDate) {
    throw new CustomError.BadRequestError("Please provide both start and end dates");
  }
  const start = new Date(firstDate);
  const end = new Date(secondDate);
  end.setHours(23, 59, 59, 999); // Set the end date to the end of the day
  const employeeUsers = await User.find({
    role: "employee",
    employeeStatus: "terminated",
    createdAt: {
      $gte: new Date(start),
      $lte: new Date(end),
    },
  })
    .populate("bioData", "staffId -_id -user")
    .select(
      "-password -passwordToken -verificationToken -passwordTokenExpirationDate -__v -updatedAt"
    )
    .sort({ createdAt: -1 });

  //
  if (employeeUsers === "" || employeeUsers.length === 0) {
    throw new CustomError.BadRequestError("No data for this date range");
  }

  res.status(StatusCodes.OK).json({
    msg: "Employee Users Report Generated",
    employeeUsers,
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

//GET ALL NDA DATA
const getNDADataFromDateRange = async (req, res) => {
  const { firstDate, secondDate } = req.body;
  if (!firstDate || !secondDate) {
    throw new CustomError.BadRequestError("Please provide both start and end dates");
  }
  const start = new Date(firstDate);
  const end = new Date(secondDate);
  end.setHours(23, 59, 59, 999); // Set the end date to the end of the day
  const AllNDAData = await finalNDA
    .find({
      createdAt: {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    })
    .sort({ createdAt: -1 })
    .select("-user -updatedAt -__v -id");
  //
  if (AllNDAData === "" || AllNDAData.length === 0) {
    throw new CustomError.BadRequestError("No data for this date range");
  }
  res.status(StatusCodes.OK).json({
    msg: "Bio Data Report Generated",
    AllNDAData,
    count: AllNDAData.length,
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
    staffId,
    jobLocation,
    jobName,
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
    !levelOfEducation ||
    !staffId ||
    !jobLocation ||
    !jobName
  ) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  let updatedUserBioData = JSON.parse(req.body.body);
  // console.log(req.user);
  const user = await BioData.findOne({ _id: updatedUserBioData.id });

  if (!user) {
    throw new CustomError.BadRequestError("Bio Data does not exist");
  }

  const existStaffId = await BioData.findOne({ staffId: updatedUserBioData.staffId });
  console.log(existStaffId);
  if (existStaffId && existStaffId._id.toString() !== updatedUserBioData.id) {
    throw new CustomError.BadRequestError("Staff ID already exist, please use another one");
  }
  // IF FILE EXIST, RUN FILE FUNCTIONALITY
  // console.log(req.files);
  if (req.files) {
    const userFile = req.files.file;
    if (!userFile.mimetype.startsWith("application") && !userFile.mimetype.startsWith("image")) {
      throw new CustomError.BadRequestError("Please upload either PDF or Image File");
    }
    const maxSize = 4000000;
    if (userFile.size > maxSize) {
      throw new CustomError.BadRequestError("Please upload file smaller than 4MB");
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
      // console.log(result);
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
      // console.log(updatedMainUserBioData);
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
      // console.log(updateUserData);

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
      // console.log(updatedMainUserBioData);

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
      // console.log(updateUserData);

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
  const neverDelete = "6881e99a77338227e497193d"; //Protected Admin Id

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

//UPDATE USER STATUS, ACTIVE
const updateStatus = async (req, res) => {
  const updateThisStatus = req.body.data;
  const neverUpdate = "6881e99a77338227e497193d"; //Protected Admin Id

  if (updateThisStatus.includes(neverUpdate)) {
    throw new CustomError.BadRequestError("You cannot update Administrator");
  }
  //$in matches document where _id match (or is in) any of the values in array filteredArray
  //can also be used in array of objects
  try {
    // Get users whose status should be toggled
    const users = await User.find({ _id: { $in: updateThisStatus } });
    // Toggle each user's active status and update them
    const updateAdminUserStatus = users.map((user) =>
      User.findByIdAndUpdate(user._id, { active: true }, { new: true, runValidators: true })
    );
    //update all users concurrently. Collect all these individual promises into an array or takes an iterable (like an array) of promises and returns a single Promise. This returned Promise resolves when all the input promises have resolved, or rejects as soon as any of the input promises reject.
    await Promise.all(updateAdminUserStatus);

    res.status(StatusCodes.OK).json({ msg: "Success! User(s) status active" });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin: " + error.message);
  }
};

//UPDATE USER STATUS, DEACTIVATE
const deActivateStatus = async (req, res) => {
  const updateThisStatus = req.body.data;
  const neverUpdate = "6881e99a77338227e497193d"; //Protected Admin Id

  if (updateThisStatus.includes(neverUpdate)) {
    throw new CustomError.BadRequestError("You cannot update Administrator");
  }
  //$in matches document where _id match (or is in) any of the values in array filteredArray
  //can also be used in array of objects
  try {
    // Get users whose status should be toggled
    const users = await User.find({ _id: { $in: updateThisStatus } });
    // console.log(users);
    // Toggle each user's active status and update them
    const updateAdminUserStatus = users.map((user) =>
      User.findByIdAndUpdate(user._id, { active: false }, { new: true, runValidators: true })
    );
    //update all users concurrently. Collect all these individual promises into an array or takes an iterable (like an array) of promises and returns a single Promise. This returned Promise resolves when all the input promises have resolved, or rejects as soon as any of the input promises reject.

    await Promise.all(updateAdminUserStatus);

    res.status(StatusCodes.OK).json({ msg: "Success! User(s) status inactive" });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin: " + error.message);
  }
};

//UPDATE USER STATUS, RESUME
const updateStatusToResume = async (req, res) => {
  const updateThisStatus = req.body.data;
  const neverUpdate = "6881e99a77338227e497193d"; //Protected Admin Id

  if (updateThisStatus.includes(neverUpdate)) {
    throw new CustomError.BadRequestError("You cannot update Administrator");
  }
  //$in matches document where _id match (or is in) any of the values in array filteredArray
  //can also be used in array of objects
  try {
    // Get users whose status should be toggled
    const users = await User.find({ _id: { $in: updateThisStatus } });
    // console.log(users);
    // Toggle each user's active status and update them
    const updateAdminUserStatus = users.map((user) =>
      User.findByIdAndUpdate(
        user._id,
        { employeeStatus: "resumed" },
        { new: true, runValidators: true }
      )
    );

    //update all users concurrently. Collect all these individual promises into an array or takes an iterable (like an array) of promises and returns a single Promise. This returned Promise resolves when all the input promises have resolved, or rejects as soon as any of the input promises reject.
    await Promise.all(updateAdminUserStatus);

    res.status(StatusCodes.OK).json({ msg: "Success! Employee(s) resumed" });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin: " + error.message);
  }
};

//UPDATE USER STATUS, TERMINATE
const updateStatusToTerminate = async (req, res) => {
  const updateThisStatus = req.body.data;
  const neverUpdate = "6881e99a77338227e497193d"; //Protected Admin Id

  if (updateThisStatus.includes(neverUpdate)) {
    throw new CustomError.BadRequestError("You cannot update Administrator");
  }
  //$in matches document where _id match (or is in) any of the values in array filteredArray
  //can also be used in array of objects
  try {
    // Get users whose status should be toggled
    const users = await User.find({ _id: { $in: updateThisStatus } });
    // console.log(users);
    // Toggle each user's active status and update them
    const updateAdminUserStatus = users.map((user) =>
      User.findByIdAndUpdate(
        user._id,
        { employeeStatus: "terminated" },
        { new: true, runValidators: true }
      )
    );

    //update all users concurrently. Collect all these individual promises into an array or takes an iterable (like an array) of promises and returns a single Promise. This returned Promise resolves when all the input promises have resolved, or rejects as soon as any of the input promises reject.
    await Promise.all(updateAdminUserStatus);

    res.status(StatusCodes.OK).json({ msg: "Success! Employee(s) resumed" });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin: " + error.message);
  }
};

//Deactivate LOCATION STATUS
const deactivateLocationStatus = async (req, res) => {
  const updateThisLocation = req.body.data;

  //$in matches document where _id match (or is in) any of the values in array filteredArray
  //can also be used in array of objects
  try {
    // Get users whose status should be toggled
    const outletLocation = await Location.find({ _id: { $in: updateThisLocation } });
    // Toggle each user's active status and update them
    const updateOutletLocationStatus = outletLocation.map((location) =>
      Location.findByIdAndUpdate(
        location._id,
        { active: false },
        { new: true, runValidators: true }
      )
    );
    //update all users concurrently. Collect all these individual promises into an array or takes an iterable (like an array) of promises and returns a single Promise. This returned Promise resolves when all the input promises have resolved, or rejects as soon as any of the input promises reject.
    await Promise.all(updateOutletLocationStatus);

    res.status(StatusCodes.OK).json({ msg: "Success! Location Disabled" });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin: " + error.message);
  }
};

//Activate LOCATION STATUS
const activateLocationStatus = async (req, res) => {
  const updateThisLocation = req.body.data;

  //$in matches document where _id match (or is in) any of the values in array filteredArray
  //can also be used in array of objects
  try {
    // Get users whose status should be toggled
    const outletLocation = await Location.find({ _id: { $in: updateThisLocation } });
    // Toggle each user's active status and update them
    const updateOutletLocationStatus = outletLocation.map((location) =>
      Location.findByIdAndUpdate(location._id, { active: true }, { new: true, runValidators: true })
    );
    //update all users concurrently. Collect all these individual promises into an array or takes an iterable (like an array) of promises and returns a single Promise. This returned Promise resolves when all the input promises have resolved, or rejects as soon as any of the input promises reject.
    await Promise.all(updateOutletLocationStatus);

    res.status(StatusCodes.OK).json({ msg: "Success! Location Enabled" });
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

//DASHBOARD CONTROLLERS
const dashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEmployees = await User.countDocuments({ role: "employee" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalBioData = await BioData.countDocuments();
    const totalNOK = await NextOfKin.countDocuments();
    const totalGuarantors = await Guarantor.countDocuments({ isCompleted: 1 });
    const totalNDA = await finalNDA.countDocuments();
    const outletLocation = await Location.countDocuments({ active: "true" });
    const openJobs = await Job.countDocuments({ active: "true" });

    res.status(StatusCodes.OK).json({
      msg: "Dashboard data retrieved successfully",
      dashData: {
        totalUsers,
        totalEmployees,
        totalAdmins,
        totalBioData,
        totalNOK,
        totalGuarantors,
        totalNDA,
        outletLocation,
        openJobs,
      },
    });
  } catch (error) {
    throw new CustomError.BadRequestError("Error retrieving dashboard data: " + error.message);
  }
};

// OUTLET LOCATION CONTROLLER
const outletLocation = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const { OutletName, OutletAddress, phoneNumber, category, timeRange } = JSON.parse(req.body.body);

  if (!OutletName || !OutletAddress || !phoneNumber || !category || !timeRange) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  // FILE FUNCTIONALITY
  if (!req.files) {
    throw new CustomError.BadRequestError("Please upload outlet Image");
  }
  const userImage = req.files.file;

  if (!userImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload an Image File");
  }

  const maxSize = 5000000;
  if (userImage.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload file smaller than 5MB");
  }

  try {
    const result = await cloudinary.uploader.upload(userImage.tempFilePath, {
      use_filename: true,
      folder: "HR_ADMIN_PORTAL",
    });
    // unlink/delete the file
    fs.unlinkSync(userImage.tempFilePath);
    const imgURL = result.secure_url;

    const locations = await Location.create({
      OutletName,
      OutletAddress,
      phoneNumber,
      category,
      timeRange,
      imgURL,
      active: true,
    });

    console.log(locations);
    res.status(StatusCodes.CREATED).json({ msg: "Outlet Location Created" });
  } catch (error) {
    throw new CustomError.BadRequestError("Unable to create Location: " + error.message);
  }
};

//GET ALL OUTLET LOCATIONS PRIVATE
const getAllOutletLocation = async (req, res) => {
  const AllOutletLocations = await Location.find()
    .collation({ locale: "en", strength: 2 })
    .sort({ OutletName: 1 })
    .select("-createdAt -updatedAt -__v");
  res.status(StatusCodes.OK).json({
    msg: "Outlet Locations retrieved",
    AllOutletLocations,
    count: AllOutletLocations.length,
  });
};

//GET ALL OUTLET LOCATIONS PUBLIC
const getAllOutletLocationPublic = async (req, res) => {
  const AllOutletLocations = await Location.find({ active: true })
    .collation({ locale: "en", strength: 2 })
    .sort({ OutletName: 1 })
    .select("-createdAt -updatedAt -__v");
  res.status(StatusCodes.OK).json({
    msg: "Outlet Locations retrieved",
    AllOutletLocations,
    count: AllOutletLocations.length,
  });
};

//DELETE USER
const deleteLocation = async (req, res) => {
  const deleteThisItem = req.body.ids;

  //$in matches document where _id match (or is in) any of the values in array filteredArray
  //can also be used in array of objects
  const existingLocations = await Location.find({ _id: { $in: deleteThisItem } });

  if (existingLocations.length === 0) {
    throw new CustomError.BadRequestError("Location(s) not found");
  }

  try {
    const result = await Location.deleteMany({
      _id: { $in: deleteThisItem },
    });
    if (result.deletedCount === 0) {
      throw new CustomError.BadRequestError("No location was deleted");
    }
    res.status(StatusCodes.OK).json({ msg: "Success! Location(s) deleted" });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
};

const adminEditLocation = async (req, res) => {
  const { OutletName, OutletAddress, phoneNumber, category, timeRange, active, id } = JSON.parse(
    req.body.body
  );
  // console.log(JSON.parse(req.body.body));
  if (!OutletName || !OutletAddress || !phoneNumber || !category || !timeRange || !id) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  let updatedLocation = JSON.parse(req.body.body);
  // console.log(req.user);
  const location = await Location.findOne({ _id: updatedLocation.id });
  if (!location) {
    throw new CustomError.BadRequestError("Location does not exist");
  }

  // IF FILE EXIST, RUN FILE FUNCTIONALITY
  console.log(req.files);
  if (req.files) {
    const locationFile = req.files.file;
    if (!locationFile.mimetype.startsWith("image")) {
      throw new CustomError.BadRequestError("Please upload an Image File");
    }
    const maxSize = 5000000;
    if (locationFile.size > maxSize) {
      throw new CustomError.BadRequestError("Please upload file smaller than 5MB");
    }

    try {
      //Upload to cloudinary
      const result = await cloudinary.uploader.upload(req.files.file.tempFilePath, {
        use_filename: true,
        folder: "HR_ADMIN_PORTAL",
      });
      //unlink/delete the file
      fs.unlinkSync(locationFile.tempFilePath);

      const mainLocationData = {
        ...updatedLocation,
        imgURL: result.secure_url,
      };

      const updatedThisLocation = await Location.findOneAndUpdate(
        { _id: updatedLocation.id },
        {
          ...mainLocationData,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(StatusCodes.OK).json({
        msg: "Location Updated",
      });
    } catch (error) {
      throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
    }
  } else {
    try {
      const mainLocationData = {
        ...updatedLocation,
      };
      //
      console.log(mainLocationData);
      const updatedThisLocation = await Location.findOneAndUpdate(
        { _id: updatedLocation.id },
        {
          ...mainLocationData,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(StatusCodes.OK).json({
        msg: "Location Updated",
      });
    } catch (error) {
      throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
    }
  }
};

// ADD JOB OPENING HERE
const outletJobs = async (req, res) => {
  console.log(req.body);

  const { OpenPosition, JobDescription, qualification, State } = req.body;

  if (!OpenPosition || !JobDescription || !qualification?.length || !State) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  let outletJobData = req.body;
  // console.log(req.user);

  try {
    const mainOutletJobData = {
      ...outletJobData,
    };
    //

    const locations = await Job.create({
      ...mainOutletJobData,
    });

    return res.status(StatusCodes.OK).json({
      msg: "Job Created",
    });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
};

//GET ALL OUTLET JOBS PRIVATE
const getOutletJobs = async (req, res) => {
  const AllOutletJobs = await Job.find().sort({ createdAt: -1 }).select(" -updatedAt -__v");
  res.status(StatusCodes.OK).json({
    msg: "Outlet Jobs retrieved",
    AllOutletJobs,
    count: AllOutletJobs.length,
  });
};

//GET ALL OUTLET JOBS PUBLIC
const getOutletJobsPublic = async (req, res) => {
  const AllOutletJobs = await Job.find({ active: true })
    .sort({ createdAt: 1 })
    .select(" -updatedAt -__v");
  res.status(StatusCodes.OK).json({
    msg: "Outlet Jobs retrieved",
    AllOutletJobs,
    count: AllOutletJobs.length,
  });
};

// EDIT JOBS
const adminEditJobs = async (req, res) => {
  const { OpenPosition, JobDescription, qualification, State, id } = req.body;

  // console.log(JSON.parse(req.body.body));
  if (!OpenPosition || !JobDescription || !qualification?.length || !State || !id) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  let updatedJob = req.body;
  // console.log(req.user);
  const job = await Job.findOne({ _id: updatedJob.id });
  if (!job) {
    throw new CustomError.BadRequestError("Job does not exist");
  }

  try {
    const updatedThisJob = await Job.findOneAndUpdate(
      { _id: updatedJob.id },
      {
        ...updatedJob,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(StatusCodes.OK).json({
      msg: "Job Updated",
    });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
};

// DELETE JOB
//DELETE USER
const deleteJob = async (req, res) => {
  const deleteThisItem = req.body.ids;
  //$in matches document where _id match (or is in) any of the values in array filteredArray
  //can also be used in array of objects
  const existingJobs = await Job.find({ _id: { $in: deleteThisItem } });

  if (existingJobs.length === 0) {
    throw new CustomError.BadRequestError("Job(s) not found");
  }

  try {
    const result = await Job.deleteMany({
      _id: { $in: deleteThisItem },
    });
    if (result.deletedCount === 0) {
      throw new CustomError.BadRequestError("No Job(s) was deleted");
    }
    res.status(StatusCodes.OK).json({ msg: "Success! Job(s) deleted" });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin," + " " + `${error.message}`);
  }
};

//Deactivate JOB STATUS
const deactivateJobStatus = async (req, res) => {
  const updateThisJob = req.body.id;
  //$in matches document where _id match (or is in) any of the values in array filteredArray
  //can also be used in array of objects
  try {
    // Get users whose status should be toggled
    const outletJob = await Job.find({ _id: { $in: updateThisJob } });
    // Toggle each user's active status and update them
    const updateOutletJobStatus = outletJob.map((job) =>
      Job.findByIdAndUpdate(job._id, { active: false }, { new: true, runValidators: true })
    );
    // console.log(updateOutletJobStatus);
    //update all users concurrently. Collect all these individual promises into an array or takes an iterable (like an array) of promises and returns a single Promise. This returned Promise resolves when all the input promises have resolved, or rejects as soon as any of the input promises reject.
    await Promise.all(updateOutletJobStatus);

    res.status(StatusCodes.OK).json({ msg: "Success! Job(s) Disabled" });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin: " + error.message);
  }
};

//Activate JOB STATUS
const activateJobStatus = async (req, res) => {
  const updateThisJob = req.body.id;

  //$in matches document where _id match (or is in) any of the values in array filteredArray
  //can also be used in array of objects
  try {
    // Get users whose status should be toggled
    const outletJob = await Job.find({ _id: { $in: updateThisJob } });
    // Toggle each user's active status and update them
    const updateOutletJobStatus = outletJob.map((job) =>
      Job.findByIdAndUpdate(job._id, { active: true }, { new: true, runValidators: true })
    );
    //update all users concurrently. Collect all these individual promises into an array or takes an iterable (like an array) of promises and returns a single Promise. This returned Promise resolves when all the input promises have resolved, or rejects as soon as any of the input promises reject.
    await Promise.all(updateOutletJobStatus);

    res.status(StatusCodes.OK).json({ msg: "Success! Job(s) Enabled" });
  } catch (error) {
    throw new CustomError.BadRequestError("Please contact Admin: " + error.message);
  }
};

//////////////////////////////////////////////////////////

module.exports = {
  updateGuarantor,
  updateNOKData,
  getAllUsers,
  getAllResumedUsers,
  getAllTerminatedUsers,
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
  getAllNOKDataPerUser,
  updateOneBioData,
  getBioDataFromDateRange,
  getEmployeeUsersFromDateRange,
  getNOKDataFromDateRange,
  deleteGua,
  getGuaDataFromDateRange,
  getNDADataFromDateRange,
  dashboard,
  outletLocation,
  getAllOutletLocation,
  getAllOutletLocationPublic,
  deleteLocation,
  adminEditLocation,
  deactivateLocationStatus,
  activateLocationStatus,
  deActivateStatus,
  updateStatusToResume,
  updateStatusToTerminate,
  getTerminatedEmployeeUsersFromDateRange,
  getResumedEmployeeUsersFromDateRange,
  outletJobs,
  getOutletJobs,
  getOutletJobsPublic,
  adminEditJobs,
  deleteJob,
  deactivateJobStatus,
  activateJobStatus,
};

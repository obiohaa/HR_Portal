const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermissions } = require("../middleware/authentication");
const {
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
  updateNOKData,
  getNOKDataFromDateRange,
  updateGuarantor,
  deleteGua,
  getGuaDataFromDateRange,
} = require("../controllers/adminController/adminController");

router.route("/getAllUsers").get(authenticateUser, authorizePermissions("admin"), getAllUsers);
router.route("/getAllBioData").get(authenticateUser, authorizePermissions("admin"), getAllBioData);
router.route("/getAllNOK").get(authenticateUser, authorizePermissions("admin"), getAllNOK);
router.route("/getAllNDA").get(authenticateUser, authorizePermissions("admin"), getAllNDA);
router
  .route("/getAllGuarantorTwo")
  .get(authenticateUser, authorizePermissions("admin"), getAllGuarantorTwo);
router
  .route("/getAllGuarantorOne")
  .get(authenticateUser, authorizePermissions("admin"), getAllGuarantorOne);
router
  .route("/getAllGuarantor")
  .get(authenticateUser, authorizePermissions("admin"), getAllGuarantor);
router
  .route("/getAllAdminUsers")
  .get(authenticateUser, authorizePermissions("admin"), getAllAdminUsers);

router.route("/deleteUser").delete(authenticateUser, authorizePermissions("admin"), deleteUser);
router.route("/deleteGua").delete(authenticateUser, authorizePermissions("admin"), deleteGua);
router.route("/updateStatus").patch(authenticateUser, authorizePermissions("admin"), updateStatus);
router.route("/adminEditUser").patch(authenticateUser, authorizePermissions("admin"), editUser);
router
  .route("/updateOneBioData")
  .patch(authenticateUser, authorizePermissions("admin"), updateOneBioData);

router
  .route("/updateGuarantor")
  .patch(authenticateUser, authorizePermissions("admin"), updateGuarantor);

router
  .route("/updateNOKData")
  .patch(authenticateUser, authorizePermissions("admin"), updateNOKData);

router
  .route("/getAllBioDataPerUser/:id")
  .get(authenticateUser, authorizePermissions("admin"), getAllBioDataPerUser);

router
  .route("/getBioDataFromDateRange")
  .post(authenticateUser, authorizePermissions("admin"), getBioDataFromDateRange);

router
  .route("/getEmployeeUsersFromDateRange")
  .post(authenticateUser, authorizePermissions("admin"), getEmployeeUsersFromDateRange);

router
  .route("/getNOKDataFromDateRange")
  .post(authenticateUser, authorizePermissions("admin"), getNOKDataFromDateRange);

router
  .route("/getGuaDataFromDateRange")
  .post(getGuaDataFromDateRange, authorizePermissions("admin"), getGuaDataFromDateRange);

///////////////////////////////////////////////////////
// router.route("/showMe").get(authenticateUser, showCurrentUser);
// router.route("/updateUser").patch(authenticateUser, updateUser);
// router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

// router.route("/getSingleBioData").get(authenticateUser, getSingleBioData);
// router.route("/getSingleNOK").get(authenticateUser, getSingleNOK);
// router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;

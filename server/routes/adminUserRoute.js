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
  getAllNOKDataPerUser,
  updateOneBioData,
  getBioDataFromDateRange,
  getEmployeeUsersFromDateRange,
  updateNOKData,
  getNOKDataFromDateRange,
  updateGuarantor,
  deleteGua,
  getGuaDataFromDateRange,
  getNDADataFromDateRange,
  dashboard,
} = require("../controllers/adminController/adminController");

router.route("/dashboard").get(authenticateUser, authorizePermissions("admin"), dashboard);
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
  .post(authenticateUser, authorizePermissions("admin"), getGuaDataFromDateRange);

router
  .route("/getNDADataFromDateRange")
  .post(authenticateUser, authorizePermissions("admin"), getNDADataFromDateRange);

router
  .route("/getAllBioDataPerUser/:id")
  .get(authenticateUser, authorizePermissions("admin"), getAllBioDataPerUser);

router
  .route("/getAllNOKDataPerUser/:id")
  .get(authenticateUser, authorizePermissions("admin"), getAllNOKDataPerUser);

///////////////////////////////////////////////////////
module.exports = router;

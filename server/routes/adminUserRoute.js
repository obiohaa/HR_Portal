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
  outletLocation,
  getAllOutletLocation,
  deleteLocation,
  adminEditLocation,
  getAllOutletLocationPublic,
  activateLocationStatus,
  deactivateLocationStatus,
  deActivateStatus,
  updateStatusToResume,
  updateStatusToTerminate,
  getAllTerminatedUsers,
  getAllResumedUsers,
  getResumedEmployeeUsersFromDateRange,
  getTerminatedEmployeeUsersFromDateRange,
  outletJobs,
  getOutletJobs,
  getOutletJobsPublic,
  adminEditJobs,
  deleteJob,
  activateJobStatus,
  deactivateJobStatus,
} = require("../controllers/adminController/adminController");

router.route("/dashboard").get(authenticateUser, authorizePermissions("admin"), dashboard);
router
  .route("/getAllOutletLocation")
  .get(authenticateUser, authorizePermissions("admin"), getAllOutletLocation);
router.route("/getAllOutletLocationPublic").get(getAllOutletLocationPublic);

router.route("/getOutletJobs").get(authenticateUser, authorizePermissions("admin"), getOutletJobs);

router.route("/getOutletJobsPublic").get(getOutletJobsPublic);

router.route("/getAllUsers").get(authenticateUser, authorizePermissions("admin"), getAllUsers);
router
  .route("/getAllResumedUsers")
  .get(authenticateUser, authorizePermissions("admin"), getAllResumedUsers);
router
  .route("/getAllTerminatedUsers")
  .get(authenticateUser, authorizePermissions("admin"), getAllTerminatedUsers);
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

router.route("/deleteJob").delete(authenticateUser, authorizePermissions("admin"), deleteJob);

router
  .route("/deleteLocation")
  .delete(authenticateUser, authorizePermissions("admin"), deleteLocation);
router.route("/deleteGua").delete(authenticateUser, authorizePermissions("admin"), deleteGua);
router.route("/updateStatus").patch(authenticateUser, authorizePermissions("admin"), updateStatus);
router
  .route("/deActivateStatus")
  .patch(authenticateUser, authorizePermissions("admin"), deActivateStatus);

router
  .route("/adminEditJobs")
  .patch(authenticateUser, authorizePermissions("admin"), adminEditJobs);

router
  .route("/updateStatusToResume")
  .patch(authenticateUser, authorizePermissions("admin"), updateStatusToResume);

router
  .route("/updateStatusToTerminate")
  .patch(authenticateUser, authorizePermissions("admin"), updateStatusToTerminate);

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
  .route("/adminEditLocation")
  .patch(authenticateUser, authorizePermissions("admin"), adminEditLocation);

router
  .route("/activateLocationStatus")
  .patch(authenticateUser, authorizePermissions("admin"), activateLocationStatus);

router
  .route("/deactivateLocationStatus")
  .patch(authenticateUser, authorizePermissions("admin"), deactivateLocationStatus);

//////////
router
  .route("/deactivateJobStatus")
  .patch(authenticateUser, authorizePermissions("admin"), deactivateJobStatus);

router
  .route("/activateJobStatus")
  .patch(authenticateUser, authorizePermissions("admin"), activateJobStatus);

///////////////

router
  .route("/getEmployeeUsersFromDateRange")
  .post(authenticateUser, authorizePermissions("admin"), getEmployeeUsersFromDateRange);

///////////
router
  .route("/getResumedEmployeeUsersFromDateRange")
  .post(authenticateUser, authorizePermissions("admin"), getResumedEmployeeUsersFromDateRange);

router
  .route("/getTerminatedEmployeeUsersFromDateRange")
  .post(authenticateUser, authorizePermissions("admin"), getTerminatedEmployeeUsersFromDateRange);

///////////

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
  .route("/outletLocations")
  .post(authenticateUser, authorizePermissions("admin"), outletLocation);

router.route("/outletJobs").post(authenticateUser, authorizePermissions("admin"), outletJobs);

router
  .route("/getAllBioDataPerUser/:id")
  .get(authenticateUser, authorizePermissions("admin"), getAllBioDataPerUser);

router
  .route("/getAllNOKDataPerUser/:id")
  .get(authenticateUser, authorizePermissions("admin"), getAllNOKDataPerUser);

///////////////////////////////////////////////////////
module.exports = router;

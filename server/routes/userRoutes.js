const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermissions } = require("../middleware/authentication");
const {
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
  getSingleBioData,
  updateBioData,
  getSingleNOK,
  updateNOKData,
} = require("../controllers/userController");

router.route("/").get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
router.route("/bioData").post(authenticateUser, bioData);
router.route("/nextOfKinData").post(authenticateUser, nextOfKinData);
router.route("/getBioDataStatus").get(authenticateUser, getBioDataStatus);
router.route("/userStepState").get(authenticateUser, userStepState);
router.route("/updateUserPrevStepState").post(authenticateUser, updateUserPrevStepState);
router.route("/updateUserNextStepState").post(authenticateUser, updateUserNextStepState);
router.route("/guarantorUser").post(authenticateUser, guarantorUser);
router.route("/finalAgreement").post(authenticateUser, finalAgreement);
router.route("/updateGuarantor").patch(updateGuarantor);
router.route("/updateBioData").patch(authenticateUser, updateBioData);
router.route("/updateNOKData").patch(authenticateUser, updateNOKData);

router.route("/getSingleBioData").get(authenticateUser, getSingleBioData);
router.route("/getSingleNOK").get(authenticateUser, getSingleNOK);
router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;

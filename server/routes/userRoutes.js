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
router.route("/updateGuarantor").patch(authenticateUser, updateGuarantor);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;

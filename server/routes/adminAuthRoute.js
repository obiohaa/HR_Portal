const express = require("express");
const router = express.Router();

// const { authenticateUser } = require("../middleware/authentication");
const { register } = require("../controllers/adminController/authAdminController");

router.post("/register", register);

module.exports = router;

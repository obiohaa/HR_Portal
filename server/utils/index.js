const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const createTokenUser = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");
const sendVerificationEmail = require("./sendVerificationEmail");
const sendAdminVerificationEmail = require("./sendAdminVerificationEmail");
const sendResetPasswordEmail = require("./sendResetPasswordEmail");
const createHash = require("./createHash");
const sendGuarantorEmailOne = require("./guarantorOne");
const sendGuarantorEmailTwo = require("./guarantorTwo");

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
  sendGuarantorEmailOne,
  sendGuarantorEmailTwo,
  sendAdminVerificationEmail,
};

const CustomError = require("../errors");

const chechPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);
  //IF ITS AN ADMIN TRYING TO GET THIS DATA, ALLOW, IF ITS A USER TRYING TO GET THEIR OWN DATA ALLOW, IF NOT DENY WITH AN ERROR
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError("Not authorized to access this route");
};

module.exports = chechPermissions;

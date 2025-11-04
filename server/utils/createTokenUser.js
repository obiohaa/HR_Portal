const createTokenUser = (user, refreshTokenExpiry) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    imgURL: user.imgURL,
    userId: user._id,
    role: user.role,
    expiry: refreshTokenExpiry,
    staffId: user.bioData ? user.bioData.staffId : null,
  };
};

module.exports = createTokenUser;

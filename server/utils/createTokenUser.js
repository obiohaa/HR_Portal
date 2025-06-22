const createTokenUser = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    imgURL: user.imgURL,
    userId: user._id,
    role: user.role,
  };
};

module.exports = createTokenUser;

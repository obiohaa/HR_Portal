const jwt = require("jsonwebtoken");
const { cookieOptions } = require("./cookieConf");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

//TO REFRESH ACCESS TOKEN ON EACH CALL AND SET REFRESH TOKEN ONLY ON LOGIN CALL. THAT WAY
//REFRESH TOKEN EXPIRES AT THE SET TIME NOT REFRESHED TIME
const attachCookiesToResponse = ({ res, user, refreshToken, setRefreshToken = true }) => {
  const accessTokenJWT = createJWT({ payload: { user } });

  const oneDay = Number(process.env.SHORT_DAY);
  const longDay = Number(process.env.LONG_DAY);

  // const oneDay = 1000 * 60 * 5; 5 minutes
  // const longDay = 1000 * 60 * 60 * 1; 1 hour

  res.cookie("accessToken", accessTokenJWT, {
    ...cookieOptions,
    expires: new Date(Date.now() + oneDay),
  });

  // only set refresh token when logging in or first-time token issue
  if (setRefreshToken) {
    console.log("setting refresh token");
    const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

    res.cookie("refreshToken", refreshTokenJWT, {
      ...cookieOptions,
      expires: new Date(Date.now() + longDay),
    });
  }
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};

//TO REFRESH ACCESS AND REFRESH TOKEN ON EACH CALL ON ATTACH COOKIES TO RESPONSE
// const attachCookiesToResponse = ({ res, user, refreshToken }) => {
//   const accessTokenJWT = createJWT({ payload: { user } });
//   const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

//   // const oneDay = 1000 * 60 * 60 * 24;
//   const oneDay = 1000 * 60;
//   const longDay = 1000 * 60 * 2;

//   // const oneDay = 1000 * 60;
//   // const longDay = 1000 * 60 * 2;

//   res.cookie("accessToken", accessTokenJWT, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     signed: true,
//     expires: new Date(Date.now() + oneDay),
//   });

//   res.cookie("refreshToken", refreshTokenJWT, {
//     httpOnly: true,
//     expires: new Date(Date.now() + longDay),
//     secure: process.env.NODE_ENV === "production",
//     signed: true,
//   });
// };

//For single cookie
// const attachCookiesToResponse = ({ res, user }) => {
//   const token = createJWT({ payload: user });

//   const oneDay = 1000 * 60 * 60 * 24;

//   res.cookie('token', token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === 'production',
//     signed: true,
//   });
// };

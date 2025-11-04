// cookieOptions.js
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax",
  path: "/",
  signed: true,
};

module.exports = { cookieOptions };

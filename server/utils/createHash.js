const crypto = require("crypto");

const hashString = (string) => {
  console.log(string);
  return crypto.createHash("md5").update(string).digest("hex");
};

module.exports = hashString;

const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports = {
  signJwt: function(username) {
    let payload = { name: username };
    let privateKey = fs.readFileSync("./private.key", "utf8");

    let signOptions = {
      expiresIn: "12h",
      algorithm: "RS256"
    };

    return jwt.sign(payload, privateKey, signOptions);
  },

  verifyJwt: function(token) {
    let publicKey = fs.readFileSync("./public.key", "utf8");

    let verifyOptions = {
      expiredIn: "12h",
      algorithm: "RS256"
    };

    try {
      return jwt.verify(token, publicKey, verifyOptions);
    } catch (err) {
      return false;
    }
  }
};

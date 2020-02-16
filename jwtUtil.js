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
  }
};

module.exports = function(app, sql) {
  const crypto = require("crypto");

  app.post("/api/user/register", function(request, response) {
    request.body.salt = crypto.randomBytes(16).toString("hex");

    request.body.password = crypto
      .pbkdf2Sync(request.body.password, request.body.salt, 1000, 64, "sha512")
      .toString();

    sql.addUser(request.body, function(result) {
      response.send(result);
    });
  });
};

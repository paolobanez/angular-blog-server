module.exports = function(app, sql) {
  const crypto = require("crypto");

  app.post("/api/user/register", function(request, response) {
    request.body.salt = crypto.randomBytes(16).toString("hex");

    request.body.password = crypto
      .pbkdf2Sync(request.body.password, request.body.salt, 1000, 64, "sha512")
      .toString("hex");

    sql.addUser(request.body, function(result) {
      response.send(result);
    });
  });

  app.post("/api/user/login", function(request, response) {
    const name = request.body.name;
    const password = request.body.password;

    sql.login({ name, password }, result => {
      response.send(result);
    });
  });
};

const ARTICLES = require("./mock-articles");

module.exports = function(app) {
  app.get("/api/articles", function(request, response) {
    response.send(ARTICLES);
  });
};

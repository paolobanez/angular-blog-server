const ARTICLES = require("./mock-articles");

module.exports = function(app) {
  app.get("/api/articles", function(request, response) {
    response.send(ARTICLES);
  });

  app.get("/api/articles/:key", function(request, response) {
    response.send(
      ARTICLES.filter(article => article.key === request.params.key)[0]
    );
  });
};

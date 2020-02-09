module.exports = function(app, sql) {
  app.get("/api/articles", function(request, response) {
    sql.getArticles(function(result) {
      response.send(result);
    });
  });

  app.get("/api/articles/:key", function(request, response) {
    sql.getArticleByKey({ key: request.params.key }, function(article) {
      response.send(article);
    });
  });
};

module.exports = function(app, sql) {
  app.get("/api/dashboard/overview", function(request, response) {
    sql.getDashboardArticles(function(result) {
      response.send(result);
    });
  });

  app.post("/api/dashboard/article/publish", function(request, response) {
    const { id, published } = request.body;
    sql.updateArticlePublishState({ id, published }, function(result) {
      response.send(result);
    });
  });

  app.get("/api/dashboard/article/:key", function(request, response) {
    sql.getDashboardArticleByKey(request.params.key, result => {
      response.send(result);
    });
  });

  app.put("/api/dashboard/article", function(request, response) {
    sql.updateArticle(request.body, result => {
      response.send(result);
    });
  });

  app.delete("/api/dashboard/article/:id", function(request, response) {
    sql.deleteArticle(request.params.id, result => {
      if (result != null) {
        response.send(result);
      } else {
        response.status(400).send({ message: "Article could not be deleted!" });
      }
    });
  });

  app.post("/api/dashboard/article", function(request, response) {
    sql.createArticle(request.body, function(result) {
      response.send(result);
    });
  });
};

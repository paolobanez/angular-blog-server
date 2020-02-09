module.exports = function(app, sql) {
  app.get("/api/dashboard/overview", function(request, response) {
    sql.getDashboardArticles(function(result) {
      response.send(result);
    });
  });
};

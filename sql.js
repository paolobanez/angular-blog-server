const Sequelize = require("sequelize");

const sequelize = new Sequelize("ngblog", "root", "root", {
  host: "local.test",
  dialect: "mariadb",
  port: 3306,
  dialectOptions: {
    timezone: process.env.db_timezone
  }
});

const Article = sequelize.define("article", {
  title: { type: Sequelize.STRING },
  key: { type: Sequelize.STRING },
  date: { type: Sequelize.DATE },
  content: { type: Sequelize.TEXT },
  description: { type: Sequelize.TEXT },
  imageUrl: { type: Sequelize.STRING },
  viewCount: { type: Sequelize.INTEGER },
  published: { type: Sequelize.BOOLEAN }
});

const User = sequelize.define("user", {
  name: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  salt: { type: Sequelize.STRING, allowNull: false }
});

init = function() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.log("Unable to connect to the database: ", err);
    });

  Article.sync({ force: true }).then(() => {
    Article.create({
      title: "My first article",
      content:
        "Aliquam erat volutpat. Nulla gravida orci sit amet libero lacinia, in interdum ex vestibulum. Morbi purus nunc, tristique quis augue vitae, mattis dictum velit. Proin mattis dui aliquet turpis luctus vehicula non ut nunc. Ut fringilla, tortor id tristique euismod, urna neque tincidunt est, nec commodo nisi augue nec sapien. In sed tempus est. Suspendisse hendrerit aliquam nisl, non commodo purus egestas nec. Fusce lacinia faucibus tortor, eget faucibus risus molestie ac.",
      description: "This is my first article! It's great. Please read it. :)",
      key: "my-first-article",
      date: new Date(),
      imageUrl: "http://angular.io/assets/images/logos/angular/angular.png",
      published: true
    });

    Article.create({
      title: "My second article",
      content:
        "Nulla sed arcu eget augue viverra tempus. Mauris nec turpis et dui ornare auctor a in orci. Donec luctus sapien ac aliquet dapibus. Sed consequat orci eget consectetur maximus. Nam nibh quam, eleifend at viverra feugiat, tristique sit amet felis. Nam vitae mattis nisl. Suspendisse potenti. Integer pretium eget magna sed maximus. Vestibulum pulvinar nunc in ex porta molestie.",
      description: "Also a great article!",
      key: "the-second-article",
      date: new Date(),
      imageUrl:
        "http://angular.io/assets/images/logos/angular/angular_solidBlack.png",
      published: false
    });
  });

  User.sync();
};

getArticles = function(callback) {
  Article.findAll({
    order: sequelize.literal("date DESC"),
    where: { published: true }
  }).then(articles => callback(articles));
};

getArticleByKey = function(options, callback) {
  Article.findOne({ where: { key: options.key, published: true } }).then(
    article => {
      if (article) {
        article.update({ viewCount: ++article.viewCount });
      }
      callback(article);
    }
  );
};

getDashboardArticles = function(callback) {
  Article.findAll({ order: sequelize.literal("date DESC") }).then(articles =>
    callback(articles)
  );
};

updateArticlePublishState = function(request, callback) {
  Article.findOne({ where: { id: request.id } }).then(function(article) {
    if (article != null) {
      article.update({ published: request.published });
    }
    callback(article);
  });
};

getDashboardArticleByKey = function(key, callback) {
  Article.findOne({ where: { key: key } }).then(article => callback(article));
};

updateArticle = function(request, callback) {
  Article.findOne({ where: { id: request.id } }).then(function(article) {
    article.update({
      title: request.title,
      key: request.key,
      date: request.date,
      imageUrl: request.imageUrl,
      description: request.description,
      content: request.content
    });

    callback(article);
  });
};

deleteArticle = function(id, callback) {
  Article.findOne({ where: { id: id } }).then(function(article) {
    if (article != null) {
      article.destroy().then(result => callback(result));
    } else {
      callback(null);
    }
  });
};

createArticle = function(request, callback) {
  Article.create({
    title: request.title,
    key: request.key,
    date: request.date,
    imageUrl: request.imageUrl,
    description: request.description,
    content: request.content
  }).then(article => callback(article));
};

addUser = function(user, callback) {
  User.create({
    name: user.name.toLowerCase(),
    password: user.password,
    salt: user.salt
  }).then(callback(true));
};

module.exports.init = init;
module.exports.getArticles = getArticles;
module.exports.getArticleByKey = getArticleByKey;
module.exports.getDashboardArticles = getDashboardArticles;
module.exports.updateArticlePublishState = updateArticlePublishState;
module.exports.getDashboardArticleByKey = getDashboardArticleByKey;
module.exports.updateArticle = updateArticle;
module.exports.deleteArticle = deleteArticle;
module.exports.createArticle = createArticle;
module.exports.addUser = addUser;

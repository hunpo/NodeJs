const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const config = require("./config/database");

const app = express();
const path = require("path");

app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);

app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

mongoose.connect(config.database);
let db = mongoose.connection;

db.once("open", function () {
  console.log("NConnected to MongoDB!");
});

db.on("error", function (error) {
  console.log(error);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const article = require("./models/article");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const Cat = mongoose.model("Cat", { name: String });

const kitty = new Cat({ name: "Zildjian" });
kitty.save().then(() => console.log("meow"));

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get("*", function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

let articles = require("./routes/articles");
let users = require("./routes/users");
app.use("/articles", articles);
app.use("/users", users);

let Article = require("./models/article");

app.get("/", async function (req, res) {
  const articles = await Article.find();
  // console.log(articles);
  res.render("articles/index", {
    articles: articles,
  });
});

app.listen("5000", function () {
  console.log("server is listening on port 5000");
});

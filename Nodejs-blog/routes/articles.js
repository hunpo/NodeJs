const express = require("express");
const { check, validationResult } = require("express-validator");
let Article = require("../models/article");
let User = require("../models/user");

let router = express.Router();

router.get("/new", ensureAuthenticated, function (req, res) {
  res.render("articles/new", {
    title: "add article",
  });
});

router.get("/:id", async function (req, res) {
  function fn1() {
    return new Promise((resolve) => {
      const article = Article.findById(req.params.id);
      resolve(article);
    });
  }

  const article = await fn1();
  console.log("article:", article);
  User.findById(article.author)
    .then((user) => {
      if (!user) {
        //不执行,如果article.author不是 valid ObjectId
        req.flash("danger", "没有找到用户的ID!");
        res.render("articles/show", {
          article: article,
        });
      } else {
        console.log("user:", user);
        res.render("articles/show", {
          article: article,
          author: user.name,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      // res.status(500).send();
      req.flash("danger", "没有找到用户的ID!");
      res.render("articles/show", {
        article: article,
      });
    });
});

router.get("/:id/edit", async function (req, res) {
  const article = await Article.findById(req.params.id);
  // const user = await User.findById(article.author);
  if (article.author != req.user._id) {
    req.flash("danger", "Not Authorized");
    return res.redirect("/");
  }
  res.render("articles/edit", {
    title: "Edit article",
    article: article,
    // author: user.name,
  });
});

router.post(
  "/create",
  check("title").isLength({ min: 1 }).withMessage("Title is required!"),
  check("body").isLength({ min: 1 }).withMessage("Body is required!"),
  // check("author").isLength({ min: 1 }).withMessage("Author is required!"),
  async function (req, res) {
    // console.log(req.body); 通过加载body-parser,并且uerencoded 设成false,才能显示req.body内容,不然就是Undefined
    // articles.title = req.body.title;
    // articles.author = req.body.author;
    // articles.body = req.body.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("articles/new", {
        title: "Add Article",
        errors: errors.array(),
      });
    } else {
      // console.log(errors.array());
      let articles = new Article(req.body); //根据model创建数据对象,articles的数据和req.body对应的,所以可以用参数req.body
      if (typeof req.user === "undefined") {
        req.flash("danger", "没有用户登录!");
      } else articles.author = req.user._id;
      await articles
        .save()
        .then(() => req.flash("success", "added successful!"))
        .then(() => res.redirect("/"))
        .catch((err) => {
          console.log("err:", err);
          res.render("articles/new", {
            title: "Add Article",
            err: JSON.stringify(err.errors),
            errors: Object.values(err.errors),
          });
          return;
        });
    }
  }
);

router.post("/update/:id", async function (req, res) {
  let query = { _id: req.params.id };
  await Article.findOneAndUpdate(query, req.body, { new: true })
    .then(() => req.flash("danger", "update successful"))
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.error(err);
    });
});

router.delete("/:id", async function (req, res) {
  //如果没有登录
  if (!req.user._id) {
    return res.status(500).send();
  }
  let query = { _id: req.params.id };
  console.log(query);
  const article = await Article.findById(req.params.id);
  if (article.author != req.user._id) {
    res.status(500).send();
  } else {
    await Article.deleteOne(query)
      .then(() => res.send("success!"))
      .catch((err) => {
        console.error(err);
      });
  }
});
//如下添加中间价函数,避免没有登录直接访问http://127.0.0.1:5000/articles/new
//isAuthenticated方法 是认证passport提供的,
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("danger", "Please login");
    res.redirect("/users/login");
  }
}
module.exports = router;
// export default router;

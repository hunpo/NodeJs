const express = require("express");
// var flash = require("connect-flash");
let user = require("../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const passport = require("passport");
// var Local = require("passport-local");
let router = express.Router();
router.get("/register", function (req, res) {
  res.render("users/register");
});
router.post(
  "/register",
  check("name").isLength({ min: 1 }).withMessage("name is required!"),
  check("username").isLength({ min: 1 }).withMessage("Username is required!"),
  check("email").isEmail().withMessage("Not a valid e-mail address"),
  check("password").isLength({ min: 1 }).withMessage("Password is required!"),
  check("password")
    .isLength({ min: 1 })
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.password_confirmation) {
        // trow error if passwords do not matchpassword_confirmation
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }),

  async function (req, res) {
    // console.log(req.body); 通过加载body-parser,并且uerencoded 设成false,才能显示req.body内容,不然就是Undefined
    // articles.title = req.body.title;
    // articles.author = req.body.author;
    // articles.body = req.body.body;
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      res.render("users/register", {
        errors: errors.array(),
      });
    } else {
      let users = new user(req.body); //根据model创建数据对象,articles的数据和req.body对应的,所以可以用参数req.body
      bcrypt.genSalt(5, function (err, salt) {
        bcrypt.hash(users.password, salt, function (err, hash) {
          if (err) {
            console.log(err);
            return;
          }
          users.password = hash;
          // Store hash in your password DB.
          users
            .save()
            .then(() =>
              req.flash("success", "you are now registered and can login!")
            )
            .then(() => res.redirect("/users/login"))
            .catch((err) => {
              res.render("users/register", {
                errors: errors.array(),
              });
              console.log({ errors: errors.array() });
              console.error(err);
            });
        });
      });
    }
  }
);
router.get("/login", function (req, res) {
  res.render("users/login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  (req, res, next) => {
    req.flash("success", "Welcome back!"); //add your username variable here);
    res.redirect("/");
  }
);
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out");
    res.redirect("/");
  });
});
module.exports = router;

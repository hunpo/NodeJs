var passport = require("passport");
var flash = require("connect-flash");
var LocalStrategy = require("passport-local");
const User = require("../models/user");
const bcrypt = require("bcrypt");
module.exports = function (passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      User.findOne({ username: username })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "No user found!" });
          }
          bcrypt.compare(password, user.password, function (err, isMatch) {
            console.log("password:", password);
            console.log("user.password:", user.password);
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, user, {
                message: "Hello,you are welcome!",
              });
            } else {
              return done(null, false, { message: "incorrect password!" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    console.log("id:", id);
    User.findById(id)
      .then((user) => {
        done(null, user, { message: "you are welcome!" });
      })
      .catch((err) => console.log("have err:", err));
  });
};

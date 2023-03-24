const User = require("./user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username })
        .then(async (user) => {
          if (user === null) {
            return done(null, false);
          } else {
            bcrypt.compare(password, user.password, (err, result) => {
              if (err) throw err;
              if (result === true) {
                return done(null, user);
              } else {
                return done(null, false);
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id })
      .then(async (user) => {
        const userInformation = {
          username: user.username,
        };
        cb(null, userInformation);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

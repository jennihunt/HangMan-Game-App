const User =require("./loginSchema");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            User.findOne({ username: username })
                .then((user) => {
                    //if no user found , means the authentication failed
                    if (!user) {
                        return done(null, false);
                    }
                    // If a user is found, we compare the password the user entered with the hashed password stored in the database. We use bcrypt.compare to do this. bcrypt.compare takes the password the user entered and the hashed password from the database as arguments. It returns a promise that resolves to true if the passwords match, and false if they don't.
                    bcrypt
                        .compare(password, user.password)
                        .then((result) => {
                            //If the passwords match, This is where the user object gets attached to the request object or null for the err.
                            if (result === true) {
                                return done(null, user);
                            } else {
                                return done(null, false)
                            }
                        })
                        .catch((err) => {
                            return done(err);
                        })
                })
                .catch((err) => {
                    return done(err);
                });
        })
    );


    passport.serializeUser((user, cb) => {
        cb(null, user.id);
      });
    


    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id })
          .then((user) => {
            const userInformation = {
              username: user.username,
            };
            cb(null, userInformation);
          })
          .catch((err) => {
            cb(err);
          });
      });
    };











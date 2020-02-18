//configs for passport js

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//Changed the path of requirement
const keys = require("../config/keys.js");
const mongoose = require("mongoose");

//Having one argument means that we are trying to load model.
//Users is Model class
const Users = mongoose.model("users");

//This function takes user(object), done(method) to verify and generate a cookie to user side.
//user - a record,user from mongoose
passport.serializeUser((user, done) => {
  //this Id is not profile.id
  //that id is what mongoDB creates automatically
  done(null, user.id);
});

//when this function is called, we get whatever in the cookie.
//first argument - token, for us it's user.id
passport.deserializeUser((id, done) => {
  Users.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      Users.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have a record
          done(null, existingUser);
        } else {
          new Users({
            googleId: profile.id,
            name: {
              familyName: profile.name.familyName,
              givenName: profile.name.givenName
            }
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

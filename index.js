//index.js 는 우리가 Setup을 하는 곳.
const express = require("express");
const mongoose = require("mongoose");
//to use cookie
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys.js");

const app = express();


app.use(
  cookieSession({
    // we need to add configuration
    // this is millisecond, 30 days * 24h * 60 min * 60sec * 1000
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //this cookieSession key allows us to have multiple key and choose one of it.
    //therefore, It has to be in array form.
    keys: [keys.cookieKey]
  })
);

//tell passport to use cookie to handle authentication.
app.use(passport.initialize());
app.use(passport.session());

require("./models/User.js");
require("./services/passport.js");

const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000
};

mongoose.connect(keys.mongoURI);
require("./routes/authRoutes.js")(app);

//now authRoutes imported the authRoutes which returns functions

// If it is all capital letter,
//it means that We should not change it
const PORT = process.env.PORT || 5000;
app.listen(PORT);

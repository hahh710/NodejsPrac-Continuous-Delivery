const passport = require("passport");

//we don't need to declair const app= rq(express) eventhough we use express.
//because it is signed in index.js, we will just module.exports = (app)=>{}
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  //Route for callback from google permission
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/", (req, res) => {
    res.send({ res: "h" });
  });

  app.get("/api/current_user", (req, res) => {
    //passport automatically, attach the user
    //this display current logged in user info 
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    //passport kills the cookie in user's browser
    req.logout();
    //
    res.send(req.user);
  });
};

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
};

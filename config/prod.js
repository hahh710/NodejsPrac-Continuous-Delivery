//Prod.js - production keys
// this will be pushed into HRHRHEORKU
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  //this cookieKey can be any random thing
  cookieKey: process.env.COOKIE_KEY
};

const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  email: String,
  name: { familyName: String, givenName: String }
});

mongoose.model("users", userSchema);

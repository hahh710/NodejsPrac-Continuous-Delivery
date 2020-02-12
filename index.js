const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

// If it is all capital letter, 
//it means that We should not change it 
const PORT = process.env.PORT || 5000;

app.listen(PORT);

const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json)

// server used to send send emails
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./html/index.html"));
});


app.get("/hi", (req, res) => {
  res.send("hiii");
});


app.listen(5000, () => {
  console.log("listening on 5000");
});

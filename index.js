const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require('path');
const nodemailer = require("nodemailer");

// server used to send send emails
const app = express();
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './html/index.html'))
  });

app.get('/hi',(req,res) => {
    res.send('hii')
})

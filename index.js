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

// app.listen(5000,()=> {
//     console.log('listening on 5000')
// })

// app.use("/", router);
// require('dotenv').config();
// const contactEmail = nodemailer.createTransport({


//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.REACT_APP_EMAIL,
//     pass: process.env.REACT_APP_EMAILPASSWORD,
//   }
// });
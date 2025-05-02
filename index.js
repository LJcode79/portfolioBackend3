const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json)

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }

// server used to send send emails
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./html/index.html"));
});


app.get("/hi", (req, res) => {
  res.send("hiii");
});

require("dotenv").config();
const contactEmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.REACT_APP_EMAIL,
    pass: process.env.REACT_APP_EMAILPASSWORD,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

app.post("/contact", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: process.env.REACT_APP_EMAIL,
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});

app.listen(5000, () => {
  console.log("listening on 5000");
});

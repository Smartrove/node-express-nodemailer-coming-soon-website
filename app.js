const express = require("express");
const { config, engine } = require("express-edge");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();

const dotEnv = require("dotenv/config");
const { response } = require("express");

//setting a static file
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect flash middleware

//middleware innit
app.use(engine);
app.set("views", `${__dirname}/views`);

app.get("/", (req, res) => {
  res.render("index");
  // console.log("Hi");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/", (req, res) => {
  const client = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    subject: req.body.subject,
  };
  console.log(client);

  if (!client.name || !client.email || !client.subject || !client.message) {
    return res.redirect("/");
  }

  let transporter = nodemailer.createTransport({
    host: "app.hyperbaricpipeline.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "node@app.hyperbaricpipeline.com", // generated ethereal user
      pass: "@12345...@@", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let mailOptions = {
    from: "node@app.hyperbaricpipeline.com", // sender address
    to: "olaokunolalekan@gmail.com", // list of receivers
    subject: "", // Subject line
    text: `Name: ${client.name} <br> From: ${client.email} <br> Body: ${client.message} <br> `, // plain text body
    html: `Name: ${client.name} <br> From: ${client.email} <br> Body: ${client.message} <br> `, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log("Message sent");
  });
});

app.listen(process.env.PORT, () => {
  console.log("server started successfully");
});

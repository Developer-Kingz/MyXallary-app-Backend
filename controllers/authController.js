const bcrypt = require("bcryptjs");
require('dotenv').config()
const User = require("../models/user");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    // service: "gmail",
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASS,
    },
});


module.exports.postSignup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const email = req.body.email;
    const password = req.body.password;

    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPw,
    });
    const result = await user.save();

    const mailOptions = {
        from: "chidoziek2@gmail.com",
        to: email,
        subject: "Welcome to MyXallary app!",
        text: "Thank you for signing up for our app.",
      };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

    res.status(201).json({
      message: "User Created",
      userId: result._Id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
  
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        const error = new Error('Wrong Password');
        error.statusCode = 401;
        throw error;
      }
  
      const token = jwt.sign(
        { email: user.email, userId: user._id.toString() },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token, userId: user._id.toString() });
      console.log('login successful')
    } catch (err) {
      err.statusCode = err.statusCode || 500;
      next(err);
    }
  };

module.exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect("/");
    });
};

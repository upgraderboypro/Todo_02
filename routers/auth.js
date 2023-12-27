// Router package
const express = require("express");
const auth = express.Router();
// const User = require('../models/userSchema')

// Middleware Import
const loggerAuth = require('../middleware/logger')
const validate = require('../middleware/auth_validate')
const {signupSchema, contactSchema} = require('../validators/auth_validator')
// Cookie-token package
const jwt = require("jsonwebtoken");
auth.use(loggerAuth('logAuth.txt'));
// Importing Schema
const {User} = require("../models/userSchema");
const {Contact} = require("../models/contactSchema");


// Encryption package
const bcrypt = require("bcryptjs");
const { register, login } = require("../controllers/auth");
const contact = require("../controllers/contact");

auth.get("/", (req, res) => {
  res.send("Hello auth!");
});

// Register using async-await :)
auth.route("/register").post(validate(signupSchema),register);
auth.route("/contact").post(contact);

// signin using async-await
auth.route("/signin").post(login);

module.exports = auth;
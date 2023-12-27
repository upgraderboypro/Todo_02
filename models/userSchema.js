const mongoose = require("mongoose");
// Encryption package
const bcrypt = require("bcryptjs");
// Cookie-Token package
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    // phone: {
    //   type: String,
    //   required: true,
    // },
    pass: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
// Password Hashing using pre function (task before any event, in this case before save event)
userSchema.pre("save", async function (next) {
  if (this.isModified("pass")) {
    this.pass = await bcrypt.hash(this.pass, 12);
    console.log(this.pass);
  }
  next();
});
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.log(`You got an error while generating token: ${error.message}`);
  }
};

const User = mongoose.model("user", userSchema);

module.exports = {User};



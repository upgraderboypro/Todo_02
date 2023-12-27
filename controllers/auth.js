const bcrypt = require("bcryptjs");
const { User } = require("../models/userSchema");
const register = async (req, res, next) => {
  console.log(req.body);
  const { name, email, pass, cpass } = req.body;
  if (!name || !email || !pass || !cpass) {
    return res.status(422).json({ msg: "Plz., fill all the fields first..." });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ msg: "User already exists" });
    } else if (pass != cpass) {
      return res.status(422).json({ msg: "Passwords don't match" });
    } else {
      const user = new User({ name, email, pass });
      const userRegister = await user.save();
      return res.status(201).json({ msg: "User registration successful" });
    }
  } catch (error) {
    // res.status(500).send("Internal error: " + error.message);
    next(error);
  }
};

const login = async (req, res) => {
  try {
    let token;
    const { email, pass } = req.body;
    if (!email || !pass) {
      return res
        .status(422)
        .json({ msg: "Plz., fill all the fields first..." });
    }
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(pass, userLogin.pass);
      console.log(isMatch);
      if (isMatch) {
        const token = await userLogin.generateAuthToken();
        res.cookie("jwt-token", token, {
          // expires: new Date(Date.now() + 36000000),
          httpOnly: true,
        });
        return res
          .status(200)
          .json({
            msg: "You have successfully logged in",
            token,
            userId: userLogin._id.toString(),
          });
      } else {
        return res.status(400).json({ msg: "Invalid username or password" });
      }
    } else {
      return res.status(400).json({ msg: "Invalid username or password" });
    }
  } catch (error) {
    return res.status(500).send("Internal Server Err...");
  }
};

module.exports = { register, login };
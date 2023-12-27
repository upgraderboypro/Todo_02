const jwt = require('jsonwebtoken')
const { User } = require("../models/userSchema");
const auth = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        console.log(token)
        const verifyUser = await jwt.verify(token, process.env.SECURITY_KEY)
        const user = await User.findOne({_id:verifyUser._id})
        res.user = user;
        console.log(user)
        res.token = token;
        next()
    } catch (error) {
        res.status(400).json(error)
    }
}
module.exports = auth;
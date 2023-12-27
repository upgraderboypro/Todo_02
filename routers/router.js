const express = require('express')
const router = express.Router()
// Routes
const admin = require('./admin')
const auth = require('./auth')
const user = require('./user')
const todo = require('./todo')

router.use(todo)
router.use("/admin",admin)
router.use("/",auth)

module.exports = router
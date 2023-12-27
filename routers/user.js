// Server package
const express = require('express');
const user = express.Router();
// Middleware Import
const loggerUser = require('../middleware/logger')
user.use(loggerUser('logUser.txt'));
user.use(express.json());
user.use(express.urlencoded({extended: true}));


// Routes
user.get('/', (req, res) => {
  res.send('Hello user!');
});
user.get('/profile', (req, res) => {
  res.send(req.body)
})


module.exports = user
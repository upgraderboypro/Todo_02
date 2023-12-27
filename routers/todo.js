// Server package
const express = require('express');
const todo = express.Router();
const ObjectId = require('mongodb').ObjectId;
// Middleware Import
const loggerUser = require('../middleware/logger');
const Todo = require('../models/todo');
const cookieParser = require("cookie-parser");
const auth = require('../middleware/user_verifyer');
const { fetchUser } = require('../middleware/verify_token');
todo.use(loggerUser('logTodo.txt'));
todo.use(express.json());
// todo.use(fetchUser);
todo.use(express.urlencoded({extended: true}));

todo.use(cookieParser());
// Routes

todo.get('/todo', fetchUser, async (req, res) => {
    console.log(req.user)
    const todo = await Todo.find({createdBy: req.user})
    console.log('todo', todo)
    res.status(200).send(todo);
});

todo.post('/todo', fetchUser, async (req, res) => {
    console.log(req.body)
    const {item, checked} = req.body;
    const newTodo = await new Todo({item, checked, createdBy: req.user, })
    const todo = await newTodo.save()
    console.log(todo._id)
    res.json({_id: todo._id})
    // return (todo._id);
});

todo.get('/todo/delAll', fetchUser, async (req, res) => {
    // if(req.user === undefined) return;
    console.log(req.user)
    const todo = await Todo.deleteMany({createdBy: req.user})
    console.log('todo', todo)
    res.status(200).send(todo);
});
todo.delete('/todo/:id', async (req, res) => {
    let id = req.params.id
    const Item = await ObjectId.isValid(id)
    if(!Item) return;
    // id = Item._id
    // if(id) return;
    const todo = await Todo.deleteOne({_id: id})
    console.log(Item)
});

todo.patch('/todo/:id', fetchUser, async (req, res) => {
    const {checked} = req.body;
    const id = req.params.id;
    const Item = await ObjectId.isValid(id)
    if(!Item) return;
    const todo = await Todo.findByIdAndUpdate({_id: id}, {checked: checked})
    res.send(todo);
});
todo.get('/profile', (req, res) => {
  res.send(req.body)
})

module.exports = todo
const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  checked: {
    type: Boolean,
    default: false,
  },
  item: {
    type: String,
    require: true,
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
 },
});

const Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;


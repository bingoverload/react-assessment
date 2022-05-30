const mongoose = require("mongoose") 

const todoSchema = new mongoose.Schema({
  id: {type: String, unique: true, required: true},
  task: {type: String, unique: true, required: true},
  completed: {type: Boolean, default: false},
  toggle: {type: Boolean, default: false}
})

const To_Do = mongoose.model("Todo", todoSchema)
module.exports = To_Do

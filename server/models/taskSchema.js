const mongoose = require("mongoose") 
const Schema = mongoose.Schema

const taskSchema = new Schema({
  tasks: {type: String, required: true},
  completed: {type: Boolean, default: false},
  toggle: {type: Boolean, default: false}
})

const Tasks = mongoose.model("Task", taskSchema)
module.exports = Tasks

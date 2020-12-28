const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  text: String,
  completed: Boolean
})

const Task = mongoose.model('Task', taskSchema)

export default Task

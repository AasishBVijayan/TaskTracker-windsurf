const mongoose = require('mongoose');

const SubtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a subtask title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  task: {
    type: mongoose.Schema.ObjectId,
    ref: 'Task',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subtask', SubtaskSchema);

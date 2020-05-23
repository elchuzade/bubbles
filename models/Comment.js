const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'goal'
  },
  date: {
    type: String,
    required: true,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('comment', CommentSchema)

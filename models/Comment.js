const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: String,
    default: Date.now
  }
})

module.exports = mongoose.model('comment', CommentSchema)

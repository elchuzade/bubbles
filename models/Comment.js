const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  { timestamp: true }
)

module.exports = mongoose.model('comment', CommentSchema)

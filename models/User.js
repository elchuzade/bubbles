const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
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

module.exports = mongoose.model('user', UserSchema)

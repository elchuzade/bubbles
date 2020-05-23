const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
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
    goals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'goal'
      }
    ]
  },
  { timestamp: true }
)

module.exports = mongoose.model('user', UserSchema)

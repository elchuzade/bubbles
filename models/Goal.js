const mongoose = require('mongoose')

const GoalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'goal',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  deadline: {
    type: Date
  },
  repeat: {
    type: String,
    enum: [
      'daily',
      'bidiurnally',
      'weekly',
      'biweekly',
      'monthly',
      'bimonthly',
      'biennially',
      'annually',
      'biannually'
    ],
    default: 'daily'
  },
  goals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'goal'
    }
  ],
  done: {
    type: Boolean,
    default: false
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
    }
  ],
  date: {
    type: String,
    default: Date.now
  }
})

module.exports = mongoose.model('goal', GoalSchema)

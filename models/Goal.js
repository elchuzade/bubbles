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
    ]
  },
  goals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'goal'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
    }
  ],
  done: {
    type: Boolean,
    required: true,
    default: false
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

module.exports = mongoose.model('goal', GoalSchema)

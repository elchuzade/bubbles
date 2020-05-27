const mongoose = require('mongoose')

const GoalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  parents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'goal',
      required: true
    }
  ],
  children: [
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
  progress: {
    type: Number
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
  avatar: {
    location: {
      type: String
    },
    key: {
      type: String
    },
    bucket: {
      type: String
    },
    originalname: {
      type: String
    },
    mimetype: {
      type: String
    },
    size: {
      type: Number
    },
    fieldName: {
      type: String
    }
  },
  croppedAvatar: {
    crop: {
      x: {
        type: Number
      },
      y: {
        type: Number
      },
      zoom: {
        type: Number
      },
      aspect: {
        type: Number
      }
    },
    location: {
      type: String
    },
    key: {
      type: String
    },
    bucket: {
      type: String
    },
    originalname: {
      type: String
    },
    mimetype: {
      type: String
    },
    size: {
      type: Number
    },
    fieldName: {
      type: String
    }
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('goal', GoalSchema)

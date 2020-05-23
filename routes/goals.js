const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')
const Goal = require('../models/Goal')

// @route   GET api/goals/:id
// @desc    Get the parent goal by id and its immediate children
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // Get goal by id
    const parent = await Goal.findById(req.params.id)
    const children = null
    if (parent.goals.length > 0) {
      // If the goal has immediate children find them all
      children = await Goal.find({ _id: { $in: parent.goals } })
    }
    return res.status(200).json({ parent, children })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/goals/:id
// @desc    Add new child goal
// @access  Public
router.post(
  '/:id',
  [auth, [check('title', 'Please include a goal title').exists()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // Get the parent goal
    const parent = await Goal.findById(req.params.id)

    const { title, text, deadline, repeat } = req.body

    try {
      const newGoal = new Goal({
        title,
        text,
        deadline,
        repeat,
        user: req.user.id,
        parent: parent._id
      })
      const goal = await newGoal.save()

      parent.goals.push(goal._id)
      await parent.save()

      return res.status(200).json(parent)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

module.exports = router

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
    const errors = {}
    // Get goal by id
    const parent = await Goal.findById(req.params.id)
    if (!parent) return res.status(400).json({ msg: 'Goal does not exist' })

    const children = null

    if (parent.goals.length > 0) {
      // If the goal has immediate children find them all
      children = await Goal.find({ _id: { $in: parent.goals } })
      if (!children)
        return res.status(400).json({ msg: 'Goal does not have sub goals' })
    }
    return res.status(200).json({ parent, children })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/goals/:id
// @desc    Add new child goal
// @access  Private
router.post(
  '/:id',
  [auth, [check('title', 'Please include a goal title').exists()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      // Get the parent goal
      const parent = await Goal.findById(req.params.id)

      if (!parent)
        return res
          .status(400)
          .json({ msg: 'Can not attach the new goal to any existing one' })

      const { title, text, deadline, repeat } = req.body

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

      parent = await parent.save()

      return res.status(200).json(parent)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @route   PUT api/goals/:id
// @desc    Update a goal
// @access  Private
router.put(
  '/:id',
  [auth, [check('title', 'Please include a goal title').exists()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      // Get the parent goal
      let goal = await Goal.findById(req.params.id)
      if (!goal) return res.status(400).json({msg: 'Goal not found'})

      const { title, text, deadline, repeat } = req.body

      if (title) goal.title = title
      if (text) goal.text = text
      if (deadline) goal.deadline = deadline
      if (repeat) goal.repeat = repeat

      goal = await goal.save()

      return res.status(200).json(goal)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @route   DELETE api/goals/:id
// @desc    Update a goal
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Get the parent goal
    let goal = await Goal.findById(req.params.id)
    if (!goal) return res.status(400).json({msg: 'Goal not found'})

    goal.deleted = true

    goal = await goal.save()

    return res.status(200).json(goal)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

module.exports = router

const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const Goal = require('../models/Goal')

// @route   GET api/goals/:id
// @desc    Get the parent goal by id and its immediate children
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // Get goal by id
    const goal = await Goal.findById(req.params.id)
    if (!goal) return res.status(400).json({ msg: 'Goal not found' })
    if (goal.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' })

    const children = null

    if (goal.goals.length > 0) {
      // If the goal has immediate children find them all
      children = await Goal.find({ _id: { $in: goal.goals } })
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
      let goal = await Goal.findById(req.params.id)
      if (!goal)
        return res
          .status(400)
          .json({ msg: 'Can not attach the new goal to any existing one' })
      if (goal.user.toString() !== req.user.id)
        return res.status(401).json({ msg: 'Unauthorized' })

      const { title, text, progress, deadline, repeat } = req.body

      const newGoal = new Goal({
        title,
        text,
        progress,
        deadline,
        repeat,
        user: req.user.id,
        parent: goal._id
      })

      goal = await newGoal.save()
      goal.goals.push(goal._id)

      goal = await goal.save()

      return res.status(200).json(goal)
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
      if (!goal) return res.status(400).json({ msg: 'Goal not found' })
      if (goal.user.toString() !== req.user.id)
        return res.status(401).json({ msg: 'Unauthorized' })

      const { title, text, progress, deadline, repeat } = req.body

      if (title) goal.title = title
      if (text) goal.text = text
      if (progress) goal.progress = progress
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
    if (!goal) return res.status(400).json({ msg: 'Goal not found' })
    if (goal.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' })

    goal.deleted = true

    goal = await goal.save()

    return res.status(200).json(goal)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

module.exports = router

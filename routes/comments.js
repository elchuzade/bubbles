const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const Goal = require('../models/Goal')
const Comment = require('../models/Comment')

// @route   POST api/comments/:id
// @desc    Add new comment
// @access  Private
router.post(
  '/:id',
  [auth, [check('text', 'Please include a comment text').exists()]],
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

      const { text } = req.body
      const newComment = new Comment({
        text,
        user: req.user.id,
        goal: goal._id
      })

      const comment = await newComment.save()

      goal.comments.unshift(comment._id)

      goal = await goal.save()

      return res.status(200).json(goal)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @route   PUT api/comments/:id
// @desc    Update a comment
// @access  Private
router.put(
  '/:id',
  [auth, [check('text', 'Please include a comment text').exists()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      let comment = await Comment.findById(req.params.id)
      if (!comment) return res.status(400).json({ msg: 'Comment not found' })
      if (comment.user.toString() !== req.user.id)
        return res.status(401).json({ msg: 'Unauthorized' })

      const { text } = req.body

      if (text) comment.text = text

      comment = await comment.save()

      return res.status(200).json(comment)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @route   DELETE api/comments/:id
// @desc    Update a goal
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Get the parent goal
    let comment = await Comment.findById(req.params.id)
    if (!comment) return res.status(400).json({ msg: 'Comment not found' })
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' })

    comment.deleted = true

    comment = await comment.save()

    return res.status(200).json(comment)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

module.exports = router

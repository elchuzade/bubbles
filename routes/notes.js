const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const Goal = require('../models/Goal')
const Note = require('../models/Note')

// @route   POST api/notes/:id
// @desc    Add new note
// @access  Private
router.post(
  '/:id',
  [auth, [check('text', 'Please include a note text').exists()]],
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
      const newComment = new Note({
        text,
        user: req.user.id,
        goal: goal._id
      })

      const note = await newComment.save()

      goal.notes.unshift(note._id)

      goal = await goal.save()

      return res.status(200).json(goal)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @route   PUT api/notes/:id
// @desc    Update a note
// @access  Private
router.put(
  '/:id',
  [auth, [check('text', 'Please include a note text').exists()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      let note = await Note.findById(req.params.id)
      if (!note) return res.status(400).json({ msg: 'Note not found' })
      if (note.user.toString() !== req.user.id)
        return res.status(401).json({ msg: 'Unauthorized' })

      const { text } = req.body

      if (text) note.text = text

      note = await note.save()

      return res.status(200).json(note)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @route   DELETE api/notes/:id
// @desc    Update a goal
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Get the parent goal
    let note = await Note.findById(req.params.id)
    if (!note) return res.status(400).json({ msg: 'Note not found' })
    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' })

    note.deleted = true

    note = await note.save()

    return res.status(200).json(note)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

module.exports = router

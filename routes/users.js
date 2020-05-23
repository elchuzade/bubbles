const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')
const Goal = require('../models/Goal')

// @route   GET api/users/me
// @desc    Get logged in user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    return res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/users/login
// @desc    Auth user and get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })
      if (!user) return res.status(400).json({ msg: 'Invalid Credentials' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' })

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600 * 24 * 7 * 52 // Token expires in a year
        },
        (err, token) => {
          if (err) throw err
          return res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post(
  '/signup',
  [
    check('name', 'Please add name').exists(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const { name, email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (user) return res.status(400).json({ msg: 'User already exists' })

      user = new User({
        name,
        email,
        password
      })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      user = await user.save()
      // Create the first goal
      const firstGoal = new Goal({
        title: 'Goals',
        parent: user._id,
        user: user._id
      })

      const goal = await firstGoal.save()
      user.goal = goal

      user.save()

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600 * 24 * 7
        },
        (err, token) => {
          if (err) throw err
          return res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

module.exports = router

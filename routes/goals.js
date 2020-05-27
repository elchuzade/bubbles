const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const Goal = require('../models/Goal')
const Comment = require('../models/Comment')

// AWS IMAGES
const aws = require('aws-sdk')
const config = require('config')
const upload = require('./files')
const goalAvatar = upload.uploadGoalAvatar.single('goalAvatar')
const goalCroppedAvatar = upload.uploadGoalCroppedAvatar.single(
  'goalCroppedAvatar'
)

aws.config.update({
  secretAccessKey: config.get('secretAccessKey'),
  accessKeyId: config.get('accessKeyId'),
  region: 'eu-central-1'
})

const s3 = new aws.S3()

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

    let comments = null
    let children = null
    let parents = null

    if (goal.parents && goal.parents.length > 0) {
      parents = await Comment.find({ _id: { $in: goal.parents } })
      goal.parents = parents
      if (!parents)
        return res.status(400).json({ msg: 'Goal does not have parents' })
    }

    if (goal.comments && goal.comments.length > 0) {
      comments = await Comment.find({ _id: { $in: goal.comments } })
      goal.comments = comments
      if (!comments)
        return res.status(400).json({ msg: 'Goal does not have comments' })
    }

    if (goal.children && goal.children.length > 0) {
      // If the goal has immediate children find them all
      children = await Goal.find({ _id: { $in: goal.children } })
      if (!children)
        return res.status(400).json({ msg: 'Goal does not have children' })
    }
    return res.status(200).json({ goal, parents, children })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/goals/:id/done
// @desc    Switch done status of a goal
// @access  Private
router.post('/:id/done', auth, async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id)

    if (!goal) return res.status(404).json({ msg: 'Goal not found' })

    if (goal.deleted) return res.status(400).json({ msg: 'Goal is deleted' })

    if (goal.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' })

    goal.done = !goal.done

    goal = await goal.save()

    return res.status(200).json(goal)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
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

      if (!goal) return res.status(400).json({ msg: 'Goal not found' })

      if (goal.deleted) return res.status(400).json({ msg: 'Goal is deleted' })

      if (goal.user.toString() !== req.user.id)
        return res.status(401).json({ msg: 'Unauthorized' })

      const { title, text, progress, deadline, repeat } = req.body

      let newGoal = new Goal({
        title,
        text,
        progress,
        deadline,
        repeat,
        user: req.user.id,
        parents: [goal._id]
      })

      newGoal = await newGoal.save()
      goal.children.push(newGoal._id)

      goal = await goal.save()

      const children = await Goal.find({ _id: { $in: goal.children } })
      if (!children)
        return res.status(400).json({ msg: 'Goal does not have children' })

      return res.status(200).json({ goal, children })
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

      if (goal.deleted) return res.status(400).json({ msg: 'Goal is deleted' })

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

    if (goal.deleted) return res.status(400).json({ msg: 'Goal is deleted' })

    if (goal.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' })

    goal.deleted = true

    goal = await goal.save()

    let child = null
    goal.children.forEach(async (childId) => {
      child = await Goal.findById(childId)
      if (child.parents.length === 1) {
        child.deleted = true
        await child.save()
      }
    })

    return res.status(200).json(goal)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

/*

UPLOADING

GOAL

AVATAR

*/

// @route POST api/goals/:id/avatar
// @desc Upload goal's avatar
// @access Private
router.post('/:id/avatar', auth, (req, res) => {
  const errors = {}
  Goal.findById(req.params.id)
    .then(goal => {
      if (goal.deleted) {
        errors.msg = 'Goal is deleted'
        return res.status(404).json(errors)
      }
      // Allow goal owner
      if (req.user.id !== goal.user.toString()) {
        errors.msg = 'Unauthorized'
        return res.status(400).json(errors)
      }
      if (goal.avatar && goal.avatar.key) {
        // Delete avatar
        const params = {
          Bucket: goal.avatar.bucket,
          Delete: {
            Objects: [{ Key: goal.avatar.key }]
          }
        }
        s3.deleteObjects(params, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            // Create avatar
            goalAvatar(req, res, err => {
              if (err) {
                console.log(err)
                errors.msg = 'Failed to upload an image'
                return res.json(errors)
              }
              if (req.file == undefined) {
                console.log(err)
                errors.msg = 'No file selected'
                return res.json(errors)
              }
              goal.avatar.location = req.file.location
              goal.avatar.key = req.file.key
              goal.avatar.bucket = req.file.bucket
              goal.avatar.originalname = req.file.originalname
              goal.avatar.mimetype = req.file.mimetype
              goal.avatar.size = req.file.size
              goal.avatar.fieldName = req.file.metadata.fieldName
              goal
                .save()
                .then(savedGoal =>
                  res.status(200).json({
                    item: savedGoal.avatar,
                    source: 'goalAvatar',
                    status: 'success',
                    message: 'Updated Goal avatar Successfully!'
                  })
                )
                .catch(err => {
                  console.log(err)
                  errors.msg = 'Goal not saved'
                  return res.status(404).json(errors)
                })
            })
          }
        })
      } else {
        // Create avatar
        goalAvatar(req, res, err => {
          if (err) {
            console.log(err)
            errors.msg = 'Failed to upload an image'
            return res.json(errors)
          }
          if (req.file == undefined) {
            console.log(err)
            errors.msg = 'No file selected'
            return res.json(errors)
          }
          goal.avatar.location = req.file.location
          goal.avatar.key = req.file.key
          goal.avatar.bucket = req.file.bucket
          goal.avatar.originalname = req.file.originalname
          goal.avatar.mimetype = req.file.mimetype
          goal.avatar.size = req.file.size
          goal.avatar.fieldName = req.file.metadata.fieldName
          goal
            .save()
            .then(savedGoal =>
              res.status(200).json({
                item: savedGoal.avatar,
                source: 'goalAvatar',
                status: 'success',
                message: 'Added goal avatar successfully!'
              })
            )
            .catch(err => {
              console.log(err)
              errors.msg = 'Goal not saved'
              return res.status(404).json(errors)
            })
        })
      }
    })
    .catch(err => {
      console.log(err)
      errors.msg = 'Goal not found'
      return res.status(404).json(errors)
    })
})

// @route POST api/goals/:id/croppedAvatar
// @desc Upload goal's croppedAvatar
// @access Private
router.post('/:id/croppedAvatar', auth, (req, res) => {
  const errors = {}
  Goal.findById(req.params.id)
    .then(goal => {
      if (goal.deleted) {
        errors.msg = 'Goal is deleted'
        return res.status(404).json(errors)
      }
      // Allow goal owner
      if (req.user.id !== goal.user.toString()) {
        errors.msg = 'Unauthorized'
        return res.status(400).json(errors)
      }
      if (goal.croppedAvatar && goal.croppedAvatar.key) {
        // Delete croppedAvatar
        const params = {
          Bucket: goal.croppedAvatar.bucket,
          Delete: {
            Objects: [{ Key: goal.croppedAvatar.key }]
          }
        }
        s3.deleteObjects(params, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            // Create croppedAvatar
            goalCroppedAvatar(req, res, err => {
              if (err) {
                console.log(err)
                errors.msg = 'Failed to upload an image'
                return res.json(errors)
              }
              if (req.file == undefined) {
                console.log(err)
                errors.msg = 'No file selected'
                return res.json(errors)
              }
              let crop = {
                x: req.body.cropX,
                y: req.body.cropY,
                aspect: req.body.cropAspect,
                zoom: req.body.cropZoom
              }
              goal.croppedAvatar.crop = crop
              goal.croppedAvatar.location = req.file.location
              goal.croppedAvatar.key = req.file.key
              goal.croppedAvatar.bucket = req.file.bucket
              goal.croppedAvatar.originalname = req.file.originalname
              goal.croppedAvatar.mimetype = req.file.mimetype
              goal.croppedAvatar.size = req.file.size
              goal.croppedAvatar.fieldName = req.file.metadata.fieldName
              goal
                .save()
                .then(savedGoal =>
                  res.status(200).json({
                    item: savedGoal.croppedAvatar,
                    source: 'goalCroppedAvatar',
                    status: 'success',
                    message: 'Updated Goal Cropped Avatar Successfully!'
                  })
                )
                .catch(err => {
                  console.log(err)
                  errors.msg = 'Goal not saved'
                  return res.status(404).json(errors)
                })
            })
          }
        })
      } else {
        // Create croppedAvatar
        goalCroppedAvatar(req, res, err => {
          if (err) {
            console.log(err)
            errors.msg = 'Failed to upload an image'
            return res.json(errors)
          }
          if (req.file == undefined) {
            console.log(err)
            errors.msg = 'No file selected'
            return res.json(errors)
          }
          let crop = {
            x: req.body.cropX,
            y: req.body.cropY,
            aspect: req.body.cropAspect,
            zoom: req.body.cropZoom
          }
          goal.croppedAvatar.crop = crop
          goal.croppedAvatar.location = req.file.location
          goal.croppedAvatar.key = req.file.key
          goal.croppedAvatar.bucket = req.file.bucket
          goal.croppedAvatar.originalname = req.file.originalname
          goal.croppedAvatar.mimetype = req.file.mimetype
          goal.croppedAvatar.size = req.file.size
          goal.croppedAvatar.fieldName = req.file.metadata.fieldName
          goal
            .save()
            .then(savedGoal =>
              res.status(200).json({
                item: savedGoal.croppedAvatar,
                source: 'goalCroppedAvatar',
                status: 'success',
                message: 'Added Goal Cropped Avatar Successfully!'
              })
            )
            .catch(err => {
              console.log(err)
              errors.msg = 'Goal not saved'
              return res.status(404).json(errors)
            })
        })
      }
    })
    .catch(err => {
      console.log(err)
      errors.msg = 'Goal not found'
      return res.status(404).json(errors)
    })
})

// @route DELETE api/goals/:id/avatar
// @desc Delete goal's avatar
// @access Private / Admin
router.delete('/:id/avatar', auth, (req, res) => {
  const errors = {}
  Goal.findById(req.params.id)
    .then(goal => {
      if (goal.deleted) {
        errors.msg = 'Goal is deleted'
        return res.status(404).json(errors)
      }
      // Allow owner of the goal
      if (req.user.id !== goal.user.toString()) {
        errors.msg = 'Unauthorized'
        return res.status(400).json(errors)
      }
      if (goal.avatar && goal.avatar.key) {
        const params = {
          Bucket: goal.avatar.bucket,
          Delete: {
            Objects: [{ Key: goal.avatar.key }]
          }
        }
        s3.deleteObjects(params, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            goal.avatar = null
            goal
              .save()
              .then(deletedAvatarGoal =>
                res.status(200).json({
                  item: deletedAvatarGoal,
                  source: 'goalAvatar',
                  status: 'success',
                  message: 'Deleted goal avatar successfully!'
                })
              )
              .catch(err => {
                console.log(err)
                errors.msg = 'Goal not saved'
                return res.status(404).json(errors)
              })
          }
        })
      } else {
        errors.msg = 'Goal avatar not found'
        return res.status(404).json(errors)
      }
    })
    .catch(err => {
      console.log(err)
      errors.msg = 'Goal not found'
      return res.status(404).json(errors)
    })
})

// @route DELETE api/goals/:id/croppedAvatar
// @desc Delete goal's croppedAvatar
// @access Private / Admin
router.delete('/:id/croppedAvatar', auth, (req, res) => {
  const errors = {}
  Goal.findById(req.params.id)
    .then(goal => {
      if (goal.deleted) {
        errors.msg = 'Goal is deleted'
        return res.status(404).json(errors)
      }
      // Allow owner of the goal
      if (req.user.id !== goal.user.toString()) {
        errors.msg = 'Unauthorized'
        return res.status(400).json(errors)
      }
      if (goal.croppedAvatar && goal.croppedAvatar.key) {
        const params = {
          Bucket: goal.croppedAvatar.bucket,
          Delete: {
            Objects: [{ Key: goal.croppedAvatar.key }]
          }
        }
        s3.deleteObjects(params, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            goal.croppedAvatar = null
            goal
              .save()
              .then(deletedCroppedAvatarGoal =>
                res.status(200).json({
                  item: deletedCroppedAvatarGoal,
                  source: 'goalCroppedAvatar',
                  status: 'success',
                  message: 'Deleted goal cropped avatar successfully!'
                })
              )
              .catch(err => {
                console.log(err)
                errors.msg = 'Goal not saved'
                return res.status(404).json(errors)
              })
          }
        })
      } else {
        errors.msg = 'Goal avatar not found'
        return res.status(404).json(errors)
      }
    })
    .catch(err => {
      console.log(err)
      errors.msg = 'Goal not found'
      return res.status(404).json(errors)
    })
})

module.exports = router

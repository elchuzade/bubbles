const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('config')
const checkFileType = require('../validation/image')

aws.config.update({
  secretAccessKey: config.get('secretAccessKey'),
  accessKeyId: config.get('accessKeyId'),
  region: 'eu-central-1'
})

const s3 = new aws.S3()

const uploadGoalAvatar = multer({
  storage: multerS3({
    s3: s3,
    bucket:
      process.env.NODE_ENV === 'production' ? 'goals-vtm' : 'goals0-vtm',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      var newFileName = Date.now() + '-' + file.originalname
      var fullPath = 'goalAvatar/' + newFileName
      cb(null, fullPath)
    }
  }),
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

const uploadGoalCroppedAvatar = multer({
  storage: multerS3({
    s3: s3,
    bucket:
      process.env.NODE_ENV === 'production' ? 'goals-vtm' : 'goals0-vtm',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      var newFileName = Date.now() + '-' + file.originalname
      var fullPath = 'goalCroppedAvatar/' + newFileName
      cb(null, fullPath)
    }
  }),
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

module.exports.uploadGoalAvatar = uploadGoalAvatar
module.exports.uploadGoalCroppedAvatar = uploadGoalCroppedAvatar

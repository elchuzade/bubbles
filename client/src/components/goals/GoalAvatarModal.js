import React, { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'

import {
  getBase64,
  extractImageFileExtensionFromBase64,
  base64StringToFile
} from '../common/CropFunctions'

import getCroppedImg from '../common/CropImage'

import Spinner from '../layout/Spinner'

const GoalAvatarModal = props => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [aspect, setAspect] = useState(4 / 3)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [avatarObject, setAvatarObject] = useState(null)
  const [avatar, setAvatar] = useState('')
  const [errors, setErrors] = useState({})
  const [uploadLoading, setUploadLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    setUploadLoading(props.avatarUploadLoading)
  }, [props.avatarUploadLoading])

  useEffect(() => {
    setDeleteLoading(props.avatarDeleteLoading)
  }, [props.avatarDeleteLoading])

  useEffect(() => {
    setErrors(props.errors)
  }, [props.errors])

  useEffect(() => {
    // Set Avatar
    props.goal && props.goal.avatar && setAvatar(props.goal.avatar.location)
    // Set Crop
    if (props.goal && props.goal.croppedAvatar) {
      setCrop({
        x: props.goal.croppedAvatar.crop.x,
        y: props.goal.croppedAvatar.crop.y
      })
      setZoom(props.goal.croppedAvatar.crop.zoom)
      setAspect(props.goal.croppedAvatar.crop.aspect)
    }
  }, [props.goal])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        avatar,
        croppedAreaPixels,
        rotation
      )
      if (avatarObject) {
        uploadAvatar(croppedImage)
      } else {
        uploadCroppedAvatar(croppedImage)
      }
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  const uploadGoalImages = e => {
    e.preventDefault()
    if (avatar || avatarObject) {
      showCroppedImage()
    } else {
      setErrors({ avatar: 'Goal Avatar is not selected' })
    }
  }

  const uploadAvatar = croppedImage => {
    getBase64(
      croppedImage,
      avatarObject,
      props.goal._id,
      props.uploadGoalAvatar,
      uploadCroppedAvatar,
      'goalAvatar'
    )
  }

  const uploadCroppedAvatar = croppedImage => {
    const fileExtension = extractImageFileExtensionFromBase64(croppedImage)
    const myFilename = 'previewFile.' + fileExtension
    const myNewCroppedFile = base64StringToFile(croppedImage, myFilename)

    const formData = new FormData()
    formData.append('goalCroppedAvatar', myNewCroppedFile)
    formData.append('cropX', crop.x)
    formData.append('cropY', crop.y)
    formData.append('cropAspect', aspect)
    formData.append('cropZoom', zoom)
    const configData = {
      headers: {
        'content-type': 'multipart/form/data'
      }
    }
    props.uploadGoalCroppedAvatar(props.goal._id, formData, configData)
  }

  const onDeleteAvatar = e => {
    e.preventDefault()
    if (avatar) {
      props.deleteGoalCroppedAvatar(props.goal._id)
      props.deleteGoalAvatar(props.goal._id)
    } else {
      setErrors({ avatar: 'Goal Avatar is not set' })
    }
    setAvatar('')
    setAvatarObject(null)
    setCroppedAreaPixels(null)
    setCrop({ x: 0, y: 0 })
    setAspect(4 / 3)
    setZoom(1)
    setRotation(0)
  }

  const onSelectFile = e => {
    e.preventDefault()
    setErrors({})
    if (e.target.files && e.target.files.length > 0) {
      setAvatarObject(e.target.files[0])
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setAvatar(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  let avatarUploadSpinner = null
  let avatarDeleteSpinner = null
  if (uploadLoading) {
    avatarUploadSpinner = <Spinner />
  } else {
    avatarUploadSpinner = null
  }
  if (deleteLoading) {
    avatarDeleteSpinner = <Spinner />
  } else {
    avatarDeleteSpinner = null
  }

  return (
    <div className='modal' id='goalAvatarModal'>
      <div className='modal-content'>
        <div
          style={{
            width: '100%',
            height: '300px'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: '100px'
            }}
          >
            <Cropper
              image={avatar || 'https://picsum.photos/800/600'}
              crop={crop}
              rotation={0}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <div className='row'>
          <div className='col s8'>
            <div className='input-field'>
              <div className='file-field input-field'>
                <div className='btn'>
                  <span>File</span>
                  <input
                    type='file'
                    name='goalAvatar'
                    placeholder='Select'
                    onChange={onSelectFile}
                    accept='image/png, image/jpg, image/jpeg'
                  />
                </div>
                <div className='file-path-wrapper'>
                  <input className='file-path validate' type='text' />
                </div>
              </div>
            </div>
          </div>
          <div className='col s4'>
            <button
              className='btn btn-outline-danger mr10'
              onClick={avatarDeleteSpinner ? null : onDeleteAvatar}
            >
              {avatarDeleteSpinner ? (
                <>{avatarDeleteSpinner}</>
              ) : (
                <i className='material-icons'>delete</i>
              )}
            </button>
            <button
              className='btn btn-success mr10'
              onClick={avatarUploadSpinner ? null : uploadGoalImages}
            >
              {avatarUploadSpinner ? (
                <>{avatarUploadSpinner}</>
              ) : (
                <i className='material-icons'>save</i>
              )}
            </button>
            <button className='modal-action modal-close waves-effect waves-green btn btn-success'>
              <i className='material-icons'>close</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoalAvatarModal

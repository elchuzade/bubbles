export const bootstrapModalToScreenWidth = screenWidth => {
  // Ratio of modal width to the screen width in bootstrap lg modals
  if (screenWidth < 576) {
    return screenWidth - 50
  } else if (screenWidth > 992) {
    return 766
  } else {
    return 466
  }
}

export const getBase64 = (
  croppedImage,
  file,
  _id,
  uploadImage,
  uploadCroppedImage,
  formDataName
) => {
  var reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    const formData = new FormData()
    formData.append(formDataName, file)
    const configData = {
      headers: {
        'content-type': 'multipart/form/data'
      }
    }
    uploadImage(_id, formData, configData)
    uploadCroppedImage(croppedImage)
  }
  reader.onerror = function (error) {
    console.log('Error: ', error)
    return null
  }
}

export const extractImageFileExtensionFromBase64 = base64Data => {
  return base64Data.substring(
    'data:image/'.length,
    base64Data.indexOf(';base64')
  )
}

export const base64StringToFile = (base64String, filename) => {
  var arr = base64String.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export const image64toCanvasRef = (
  canvasRef,
  image64,
  percentCrop,
  width,
  crop
) => {
  const canvas = canvasRef // document.createElement('canvas');
  canvas.width = bootstrapModalToScreenWidth(width)
  canvas.height = bootstrapModalToScreenWidth(width) / crop.aspect
  const ctx = canvas.getContext('2d')
  const image = new Image()
  image.src = image64

  image.onload = function () {
    ctx.drawImage(
      image,
      (percentCrop.x * image.width) / 100,
      (percentCrop.y * image.height) / 100,
      (percentCrop.width * image.width) / 100,
      (percentCrop.height * image.height) / 100,
      0,
      0,
      canvas.width,
      canvas.height
    )
  }
}

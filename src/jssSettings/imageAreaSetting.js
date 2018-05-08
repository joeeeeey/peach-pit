
// imageArea 图片样式
// imageContainer 样式
// 在此处统一配置

// 根据屏幕大小进行调整

const defaultImageStyle = { maxWidth: '100%', maxHeight: '100%' }

// const defaultImageContainerStyle = { margin: '1px 2%' }

function defaultImageContainerStyle(){
  return { margin: '1px 2%' }
}

function getImageStyle(porps) {
  if (porps.imageStyle) {
    return porps.imageStyle
  } else {
    return defaultImageStyle
  }
}

function getImageStyle(contanierWidth, imgDimensions) {
  // console.log(`contanierWidth is ${contanierWidth}`)
  // console.log(`imgDimensions is ${JSON.stringify(imgDimensions)}`)

  const { naturalWidth, naturaHeight } = imgDimensions
  if (contanierWidth <= naturalWidth) {
    return {maxWidth: '100%', maxHeight: '100%'}
  }else{
    if(naturalWidth >= naturaHeight){
      return {width: '100%', height: '100%'}
    }else{
      const ratio = Math.round((naturalWidth/naturaHeight) * 100)

      return {width: `${ratio}%`, height: '100%'}
    }
  }
}


const ImageAreaSetting = {
  getImageStyle: getImageStyle,
  defaultImageContainerStyle: defaultImageContainerStyle
}

export default ImageAreaSetting

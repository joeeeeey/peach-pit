
// 根据 layout porps 中背景图片的信息返回 styles
// 在此处统一进行配置
// 如: 垂直布局，画廊 的背景
// 包括可编辑组件和预览组件


// 有背景图的视差样式:
// background-repeat: no-repeat;
// background-size: cover;
// background-attachment: fixed;
// min-height: 100vh;
// background-position: 50% 50%;

// 有背景图的无视差样式，只用内容撑开:
// background-repeat: no-repeat;
//     background-size: cover;
//     background-position: 50% 50%;
//     background-image: url(http://o0m4okv24.qnssl.com/static/backgrounds/nature/170.jpg);

const defaultParallexStyle = {
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundRepeat: 'noRepeat',
  backgroundSize: 'cover',
}

// 填充样式
function getBackgroundFillTypeStyle(type, background) {
  switch (type) {
    // 平铺
    case 'tile':
      return { background: background }
    // 拉伸
    case 'stretch':
      return { background: background + ' no-repeat', backgroundSize: '100% 100%' }
    // 填充 将整个图片都放入区域，不改变长宽比例，然后居中。需要手动计算设置长宽?
    case 'fill':
      return { background: background }
    default:
      return { background: background }
  }
}
// 视差样式
function getBackgroundParallexStyle(enableParallex) {
  if (enableParallex) {
    return defaultParallexStyle;
  } else { return {} }
}

function getBackgroundStyle(backgroundInfo) {
  const {
    background,
    backgroundType,
    fillType,
    enableParallex,
  } = backgroundInfo

  // 填充样式
  const backgroundFillTypeStyle = getBackgroundFillTypeStyle(fillType, background)
  // 视差效果
  const parallexStyle = backgroundType === 'image' ? getBackgroundParallexStyle(enableParallex) : {}
  return Object.assign({}, backgroundFillTypeStyle, parallexStyle)
}


const backgroundSetting = {
  getBackgroundFillTypeStyle: getBackgroundFillTypeStyle,
  getBackgroundParallexStyle: getBackgroundParallexStyle,
  getBackgroundStyle: getBackgroundStyle,
}

export default backgroundSetting

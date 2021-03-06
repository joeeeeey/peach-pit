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
// background-size: cover;
// background-position: 50% 50%;
// background-image: url(http://o0m4okv24.qnssl.com/static/backgrounds/nature/170.jpg);

// fullHeight
// display: grid 是为了满屏时将内容垂直居中
// 子元素设置 margin: auto https://css-tricks.com/centering-css-complete-guide/
import deviceDetect from "utils/deviceDetect";

const defaultParallexStyle = {
  backgroundAttachment: "fixed",
  backgroundPosition: "50% 50%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
};

const iosParallexStyle = {
  backgroundAttachment: "initial",
  backgroundPosition: "50% 50%",
  backgroundRepeat: "no-repeat"
  // backgroundSize: 'cover',
};

// TODO 使用 webp 需要做浏览器判断
// const getBackgroundImageUrl = (originUrl) => {
//   let url = originUrl.slice(0,-1)
//   // 是否压缩 后期可作为选项?
//   const doCompress = true
//   if (doCompress) {
//     // => url(http://xxx!/format/webp)
//     url = url + '!/format/webp'
//     return `${url})`
//   } else {
//     return url
//   }
// }

// 填充样式
/**
 * 
 * @param {} fillType 
 * @param {*} background 
 * 
 */
const getBackgroundFillTypeStyle = (fillType, background) => {
  switch (fillType) {
    // 平铺
    case "tile":
      return {
        backgroundImage: background
      };
    // 拉伸
    case "stretch":
      return {
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 50%",
        backgroundImage: background
      };
    // 填充 将整个图片都放入区域，不改变长宽比例，然后居中。需要手动计算设置长宽?
    // case 'fill':
    //   return {
    //     backgroundSize: 'cover',
    //     backgroundPosition: '50% 50%',
    //     backgroundImage: background
    //   }
    default:
      return {
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
        backgroundImage: background
      };
  }
}
// 视差样式
const getBackgroundParallexStyle = (enableParallex) => {
  if (enableParallex) {
    if (deviceDetect.isIOS()) {
      return iosParallexStyle;
    } else {
      return defaultParallexStyle;
    }
  } else {
    return {};
  }
}

const getBackgroundHeightStyle = (fullHeight) => {
  // display: grid 是为了满屏时将内容垂直居中
  // 子元素设置 margin: auto https://css-tricks.com/centering-css-complete-guide/
  if (fullHeight) {
    return { minHeight: "100vh", display: "grid" };
  } else {
    return {};
  }
}

const getBackgroundStyle = (backgroundInfo) => {
  const {
    background,
    backgroundType,
    fillType,
    enableParallex,
    fullHeight
  } = backgroundInfo;

  let finalStyle = {};

  if (backgroundType === "image") {
    // 填充样式
    const backgroundFillTypeStyle = getBackgroundFillTypeStyle(
      fillType,
      background
    );

    // 视差效果
    const parallexStyle = getBackgroundParallexStyle(enableParallex);

    const heightStyle = getBackgroundHeightStyle(fullHeight);

    Object.assign(
      finalStyle,
      backgroundFillTypeStyle,
      parallexStyle,
      heightStyle
    );
  } else if (backgroundType === "pureColor") {
    const heightStyle = getBackgroundHeightStyle(fullHeight);
    Object.assign(finalStyle, { background: background }, heightStyle);
  }

  return Object.assign({}, finalStyle);
}

const backgroundSetting = {
  getBackgroundFillTypeStyle: getBackgroundFillTypeStyle,
  getBackgroundParallexStyle: getBackgroundParallexStyle,
  getBackgroundStyle: getBackgroundStyle
};

export default backgroundSetting;

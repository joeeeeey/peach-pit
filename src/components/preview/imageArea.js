// 传入 props

// {
//   native: false, nodeName: 'ImageArea',
//   props: {src: 'http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/8/1a4729c10b66ea0d2b5b9f25f2ea7039' }
// }

// {"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/8/1a4729c10b66ea0d2b5b9f25f2ea7039"}}
import React, { Component } from 'react';
import Measure from 'react-measure';
import ImageAreaSetting from '../../jssSettings/imageAreaSetting'

const defaultImageStyle = { maxWidth: '100%', maxHeight: '100%' }
const defaultImageContainerStyle = ImageAreaSetting.defaultImageContainerStyle()

export default class PreviewImageArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgDimensions: {},
      contanierWidth: -1,
      imageStyle: defaultImageStyle
    }
  }


  // 获得图片原始大小，在网页布局中展示的大小
  onImgLoad = ({ target: img }) => {
    const imgDimensions = {
      naturalWidth: img.naturalWidth,
      naturaHeight: img.naturalHeight,
    }
    this.setState({
      imgDimensions: imgDimensions
    });

    // 首次加载，获得样式
    if (!this.props.imageStyle) {
      const imageStyle = ImageAreaSetting.getImageStyle(this.state.contanierWidth, imgDimensions)
      this.setState({ imageStyle: imageStyle })
    }
  }

  // 展示 imgae 的元素
  imageElement = (src, alt) => {
    return (
      <img
        src={src}
        style={this.props.imageStyle || this.state.imageStyle}
        alt={alt || 'default_alt'}
        onLoad={this.onImgLoad}
      ></img>
    )
  }


  // 在屏幕大小发生变化时加载，获得样式
  reSizeImage = (contanierWidth, contanierHeight) => {
    this.reportHeight(contanierHeight)
    this.setState({ contanierWidth: contanierWidth })
    const imgDimensions = this.state.imgDimensions
    if (imgDimensions.naturalWidth) {
      const imageStyle = ImageAreaSetting.getImageStyle(contanierWidth, imgDimensions)
      this.setState({ imageStyle: imageStyle })
    }
  }

  // 有的父元素需要知道子元素 resize 后的高度
  // 向父元素回传自身所占高度
  reportHeight = (height) => {
    if(this.props.reportHeight){
      this.props.reportHeight(height, this.props.selfkey)
    }      
  }

  render() {
    const { src,
      alt,
      imageStyle = defaultImageStyle,
      imageContainerStyle = defaultImageContainerStyle
    } = this.props

    return (
      <div>
        {
          !this.props.noMeasure &&
          <Measure bounds onResize={(contentRect) => this.reSizeImage(contentRect.bounds.width, contentRect.bounds.height)}>
            {
              ({ measureRef }) => {
                if (this.state.contanierWidth < 1) {
                  return <div ref={measureRef}></div>;
                }
                return (
                  <div name="imageContainer"
                    ref={measureRef}
                    style={Object.assign({ position: 'relative', textAlign: 'center' }, imageContainerStyle)}>
                    {this.imageElement(src, alt)}
                  </div>)
              }
            }
          </Measure>
        }
        {
          this.props.noMeasure &&
          <div name="imageContainer"
            style={Object.assign({ position: 'relative', textAlign: 'center' }, imageContainerStyle)}>
            {this.imageElement(src, alt)}
          </div>
        }
      </div>
    );
  }
}
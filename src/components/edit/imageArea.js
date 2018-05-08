// 传入 props

// {
//   native: false, nodeName: 'ImageArea',
//   props: {src: 'http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/8/1a4729c10b66ea0d2b5b9f25f2ea7039' }
// }

// {"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/8/1a4729c10b66ea0d2b5b9f25f2ea7039"}}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Measure from 'react-measure';
import ImageAreaSetting from '../../jssSettings/imageAreaSetting'

// 有编辑功能在加上
// import EditImageDialog from '../editTools/image/editImageDialog'

import UploaderEntrance from '../editTools/image/uploaderEntrance'

const defaultImageStyle = { maxWidth: '100%', maxHeight: '100%' }
const defaultOverlayStyle = { textAlign: 'center', "position": "absolute", "width": "100%", "height": "100%", "top": "0", "left": "0", "right": "0", "bottom": "0", "backgroundColor": "rgba(0,0,0,0.5)", "zIndex": "2", "cursor": "pointer" }
const buttonStyle = { width: '100%', height: '86%', color: 'white', justifyContent: 'center' }


export default class EditableImageArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgDimensions: {},
      contanierWidth: -1,
      overlayDisplay:
        { display: 'none' },
      imageStyle: this.props.imageStyle || defaultImageStyle
    }
    this.editImageDialog = null
  }

  hoverImg = () => {
    this.setState({ overlayDisplay: { display: 'block' } })
  }

  mouseLeaveImage = () => {
    this.setState({ overlayDisplay: { display: 'none' } })
  }

  showEditTool = () => {
    this.editImageDialog.handleClickOpen()
  }

  getChildContext() {
    return { store: this.context.store };
  }

  removeImageArea = () => {
    let { selfkey, parentkey } = this.props
    this.context.store.dispatch({
      type: 'removeNode',
      payload: { targetKey: selfkey, parentKey: parentkey },
      target: 'node',
    });
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

  // image 覆盖的元素，Example: 编辑, 删除按钮
  imageOverlayElement = () => {
    return (
      <div name="imageOverlay"
        onMouseLeave={this.mouseLeaveImage}
        style={Object.assign({}, defaultOverlayStyle, this.state.overlayDisplay)}>

        <div style={buttonStyle}>
          <UploaderEntrance
            uploaderEntranceContainerStyle={{ height: '100%' }}
            uploadButtonStyle={{ height: '100%' }}
            container={'image'}
            nestedkeyprefix={`${this.props.selfkey},props`}
          />
        </div>
        <Button color="secondary" onClick={this.removeImageArea} style={{ width: '100%', height: '14%', color: 'white', justifyContent: 'center' }}>
          删除
        </Button>
        {/* <EditImageDialog ref={(el) => { this.editImageDialog = el }} parentkey={this.props.parentkey} targetkey={this.props.selfkey} /> */}
      </div>
    )
  }


  // 展示 imgae 的元素
  imageElement = (src, alt, imageStyle) => {
    return (
      <img
        src={src}
        style={this.state.imageStyle}
        alt={alt || 'default_alt'}
        onLoad={this.onImgLoad}
      ></img>
    )
  }

  getWidth = (contanierWidth) => {
    return { width: contanierWidth || '50%' }
  }

  // 在屏幕大小发生变化时加载，获得样式
  reSizeImage = (contanierWidth) => {
    this.setState({ contanierWidth: contanierWidth })
    const imgDimensions = this.state.imgDimensions
    if (imgDimensions.naturalWidth) {
      const imageStyle = ImageAreaSetting.getImageStyle(contanierWidth, imgDimensions)
      console.log(`获得重新计算的大小: ${JSON.stringify(imageStyle)}`)
      this.setState({ imageStyle: imageStyle })
    }
  }

  render() {
    // galleryStyle 中存储画廊类型以及画廊需要存储的特征, 如: { type: 'verticalGallery', width: 1, height: 1 }
    // 会影响编辑页面的显示

    const { src, alt, imageStyle = defaultImageStyle, imageContainerStyle = { margin: '1px 15px' } } = this.props

    return (
      <div>
        {
          !this.props.noMeasure && <Measure bounds onResize={(contentRect) => this.reSizeImage(contentRect.bounds.width)}>
            {
              ({ measureRef }) => {
                if (this.state.contanierWidth < 1) {
                  return <div ref={measureRef}></div>;
                }
                return (
                  <div name="imageContainer"
                    ref={measureRef}
                    style={Object.assign({ position: 'relative', textAlign: 'center' }, imageContainerStyle)}
                    onMouseOver={this.hoverImg} >
                    {this.imageOverlayElement()}
                    {this.imageElement(src, alt, imageStyle)}
                  </div>)
              }
            }
          </Measure>}
        {
          this.props.noMeasure &&
          <div name="imageContainer"
            style={Object.assign({ position: 'relative', textAlign: 'center' }, imageContainerStyle)}
            onMouseOver={this.hoverImg} >
            {this.imageOverlayElement()}
            {this.imageElement(src, alt, imageStyle)}
          </div>
        }
      </div>
    );
  }
}


EditableImageArea.childContextTypes = {
  store: PropTypes.object
};

EditableImageArea.contextTypes = {
  store: PropTypes.object
};

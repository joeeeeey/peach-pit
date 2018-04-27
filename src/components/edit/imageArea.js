// 传入 props

// {
//   native: false, nodeName: 'ImageArea',
//   props: {src: 'http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/8/1a4729c10b66ea0d2b5b9f25f2ea7039' }
// }

// {"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/8/1a4729c10b66ea0d2b5b9f25f2ea7039"}}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
// 有编辑功能在加上
// import EditImageDialog from '../editTools/image/editImageDialog'

import UploaderEntrance from '../editTools/image/uploaderEntrance'

const defaultImageStyle = { maxWidth: '100%', maxHeight: '100%' }
const defaultOverlayStyle = { textAlign: 'center', "position": "absolute", "width": "100%", "height": "100%", "top": "0", "left": "0", "right": "0", "bottom": "0", "backgroundColor": "rgba(0,0,0,0.5)", "zIndex": "2", "cursor": "pointer" }
const buttonStyle = { width: '100%', height: '86%', color: 'white', justifyContent: 'center' }


export default class EditableImageArea extends Component {
  constructor(props) {
    super(props);
    this.state = { overlayDisplay: { display: 'none' } }
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

  render() {
    // galleryStyle 中存储画廊类型以及画廊需要存储的特征, 如: { type: 'verticalGallery', width: 1, height: 1 }
    // 会影响编辑页面的显示

    const { src, alt, imageStyle = defaultImageStyle, imageContainer = { margin: '1px 15px' }, galleryStyle } = this.props

    return (
      <div name="imageContainer"
        style={Object.assign({ position: 'relative', textAlign: 'center' }, imageContainer)}
        onMouseOver={this.hoverImg} >
        <div
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
        <img src={src} style={imageStyle}></img>
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




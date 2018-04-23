// 传入 props

// {
//   native: false, nodeName: 'ImageArea',
//   props: {src: 'http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/8/1a4729c10b66ea0d2b5b9f25f2ea7039' }
// }

// {"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/8/1a4729c10b66ea0d2b5b9f25f2ea7039"}}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import EditImageDialog from '../editTools/image/editImageDialog'

const defaultImageStyle = { maxWidth: '100%', maxHeight: '100%' }
const defaultOverlayStyle = { textAlign: 'center', "position": "absolute", "width": "100%", "height": "100%", "top": "0", "left": "0", "right": "0", "bottom": "0", "backgroundColor": "rgba(0,0,0,0.5)", "zIndex": "2", "cursor": "pointer" }
const buttonStyle = { width: '100%', height: '100%', color: 'white', justifyContent: 'center' }


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


  render() {
    const { src = "url(/images/ORG_DSC01137.jpg)", alt = this.props.selfkey } = this.props

    return (
      <div
        style={{ position: 'relative', textAlign: 'center', margin: '1px 15px' }}
        onMouseOver={this.hoverImg} >
        <div
          onMouseLeave={this.mouseLeaveImage}
          style={Object.assign({}, defaultOverlayStyle, this.state.overlayDisplay)}>

          <Button color="secondary" onClick={this.showEditTool} style={buttonStyle}>
            编辑
          </Button>
          <EditImageDialog ref={(el) => { this.editImageDialog = el }} targetkey={this.props.selfkey} />
        </div>
        <img src={src} style={defaultImageStyle}></img>
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




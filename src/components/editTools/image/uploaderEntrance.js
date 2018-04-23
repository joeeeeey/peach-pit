// 可传入 props
// container  string 'div'
// uploadSuccess function 成功上传的回调函数
// nestedkeyprefix string 'xx,props,'


// TODO
// 图片上传的按钮和承载上传区域(包括上传按钮，预览区，图片库等)
// 图片上传的按钮应该可以在不同场景不同样式显示
import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import UploaderArea from './uploaderArea'
import '../../../css/imageUploader.css'

export default class UploaderEntrance extends React.Component {
  constructor(props, context) {
    super(props);
  }
  state = {
    open: false,
  };

  buttonStyle = () => {
    return { width: '100%', justifyContent: 'center' }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleUploadSuccess = () => {
    // uploadSuccess
    if (this.props.uploadSuccess && typeof (this.props.uploadSuccess) === 'function') {
      this.props.uploadSuccess()
    }
    this.handleClose()
  }
  render() {
    const { container, nestedkeyprefix } = this.props
    return (
      <div>
        <Button onClick={this.handleClickOpen} style={this.buttonStyle()} color="secondary">上传图片</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">图片上传</DialogTitle>
          <DialogContent style={{
            minWidth: '650px',
            minHeight: '270px'
          }}>
            <UploaderArea container={container} nestedkeyprefix={nestedkeyprefix} uploadSuccess={this.handleUploadSuccess} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消操作
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

UploaderEntrance.contextTypes = {
  store: PropTypes.object,
};

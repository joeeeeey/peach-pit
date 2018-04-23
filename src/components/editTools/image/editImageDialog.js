import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';

import UploaderEntrance from '../image/uploaderEntrance'

export default class EditImageDialog extends React.Component {
  constructor(props, context) {
    super(props);
  }
  state = {
    open: false,
    linkUrl: ''
  };

  buttonStyle = () => {
    return { color: 'white', width: '100%', justifyContent: 'left' }
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
    // TODO 此处可以做图片链接和描述的更新
    this.handleClose()
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">编辑图片</DialogTitle>
          <DialogContent style={{ width: 500 }}>
            <UploaderEntrance container={'image'} uploadSuccess={this.handleUploadSuccess} nestedkeyprefix={`${this.props.targetkey},props`} />
            {/* <TextField
              autoFocus
              id="textarea"
              margin="dense"
              label="link"
              placeholder="链接地址"
              value={this.state.linkUrl}
              onChange={this.handleChange('code')}
              fullWidth
            /> */}

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


EditImageDialog.contextTypes = {
  store: PropTypes.object,
};

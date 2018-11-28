// 编辑图片界面
// 后期可以做得更加人性操作，不适用 dialog
// 会根据图片不同的属性来展示编辑内容
// 如画廊中的图片就可以调整比例等

import React from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import PropTypes from "prop-types";

import UploaderEntrance from "../image/uploaderEntrance";

export default class EditImageDialog extends React.Component {
  constructor(props, context) {
    super(props);
  }
  state = {
    open: false,
    linkUrl: ""
  };

  buttonStyle = () => {
    return { color: "white", width: "100%", justifyContent: "left" };
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleUploadSuccess = () => {
    // TODO 此处可以做图片链接和描述的更新
    this.handleClose();
  };

  removeImage = () => {
    let { targetkey, parentkey } = this.props;
    this.context.store.dispatch({
      type: "removeNode",
      payload: { targetKey: targetkey, parentKey: parentkey },
      target: "node"
    });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">编辑图片</DialogTitle>
          <DialogContent style={{ width: 500 }}>
            <UploaderEntrance
              container={"image"}
              uploadSuccess={this.handleUploadSuccess}
              nestedkeyprefix={`${this.props.targetkey},props`}
              showUploadedImage={true}
            />
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <Button
                onClick={this.removeImage}
                color="secondary"
                style={{ color: "grey" }}>
                删除该图片
              </Button>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消操作
            </Button>
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
  store: PropTypes.object
};

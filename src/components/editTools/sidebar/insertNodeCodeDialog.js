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

import editToolBaseDialog from "./editToolBaseDialog";

export default class InsertNodeCodeDialog extends editToolBaseDialog {
  constructor(props, context) {
    super(props);
  }
  state = {
    open: false,
    code:
      '{"native":true,"nodeName":"h2","props":{"style":{"color":"green", "margin":"auto"}},"children":"Hello World2"}'
  };

  insertCode = () => {
    try {
      const nodeData = JSON.parse(this.state.code);
      const rootKey = this.context.store.getState().node._root;

      this.context.store.dispatch({
        type: "addNode",
        payload: { targetKey: rootKey, nodeData: nodeData },
        target: "node"
      });
    } catch (error) {
      alert(`出现了异常: ${error.toString()}`);
    }
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          style={this.buttonStyle()}
          color="secondary"
        >
          插入节点代码
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">插入节点代码</DialogTitle>
          <DialogContent>
            <DialogContentText>
              目前只支持传入 JSON.stringify(obj)
              的代码。这句话一定要很长，这样就会使得 整个 Dialog 的 width 变长.
            </DialogContentText>
            <TextField
              autoFocus
              id="textarea"
              margin="dense"
              label="code here"
              placeholder="js object"
              multiline
              value={this.state.code}
              onChange={this.handleChange("code")}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消操作
            </Button>
            <Button onClick={this.insertCode} color="primary">
              插入片段
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

InsertNodeCodeDialog.contextTypes = {
  store: PropTypes.object
};

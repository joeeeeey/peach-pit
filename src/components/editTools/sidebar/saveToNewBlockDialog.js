import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import editToolBaseDialog from './editToolBaseDialog'

import NewBlockFrom from '../../common/forms/newBlockFrom'

export default class SaveToNewBlockDialog extends editToolBaseDialog {
  constructor(props, context) {
    super(props);
  }
  state = {
    open: false,
  };

  getChildContext() {
    return { store: this.context.store };
  }

  saveSuccessHandler = () => {
    this.handleClose()
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen} style={this.buttonStyle()} color="secondary">新增至板块 </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          style={{zIndex:200}}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">插入节点代码</DialogTitle>
          <DialogContent>
            <DialogContentText>
              这句话一定要很长这句话一定要很长这句话一定要很长这句话一定要很长，这样就会使得
              整个 Dialog 的 width 变长.
            </DialogContentText>
            <NewBlockFrom saveSuccess={this.saveSuccessHandler} />
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

SaveToNewBlockDialog.childContextTypes = {
  store: PropTypes.object
};
SaveToNewBlockDialog.contextTypes = {
  store: PropTypes.object,
};

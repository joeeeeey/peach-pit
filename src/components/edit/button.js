import React, { Component } from "react";
// button
//    较少使用，可编辑用于
//     1. 跳转新页面链接 2. 跳转页面内板块 3. 文字显示

import Button from "material-ui/Button";

export default class EditableButton extends Component {
  render() {
    return (
      <div>
        <Button href="#pp" variant="raised" style={this.props.style}>
          {this.props.content}
        </Button>
        <p id="pp" style={{ marginTop: "600px" }}>
          fsdfddfds
        </p>
      </div>
    );
  }
}

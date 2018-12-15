// 布局列表气泡卡片
// props:
// 1. layouts: [{},{}]
// 2. buttonStyle: {}

import React from "react";
import Button from "material-ui/Button";
import { Popover } from "antd";
import LayoutsListPopoverImageArea from "./layoutsListPopoverImageArea";

export default class LayoutsListPopover extends React.Component {
  constructor(props) {
    super(props);
    this.state = { overlayDisplay: { display: "none" } };
  }

  hoverImg = () => {
    this.setState({ overlayDisplay: { display: "block" } });
  };

  mouseLeaveImage = () => {
    this.setState({ overlayDisplay: { display: "none" } });
  };

  getPopverContent = () => {
    return (
      <div style={{ height: 800, width: 180, overflow: "auto" }}>
        {this.props.layouts.map(layout => (
          <LayoutsListPopoverImageArea
            key={layout.id}
            layout={layout}
            addNode={this.props.addNode}
          />
        ))}
      </div>
    );
  };

  render() {
    return (
      <Popover
        content={this.getPopverContent()}
        placement="right"
        trigger="click"
      >
        <Button color="secondary" style={this.props.buttonStyle}>
          新增常用布局
        </Button>
      </Popover>
    );
  }
}

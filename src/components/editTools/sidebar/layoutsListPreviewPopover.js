// 布局列表气泡卡片
// props:
// 1. layouts: [{},{}]
// 2. buttonStyle: {}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Popover } from 'antd';
import LayoutsListPopoverImageArea from './layoutsListPopoverImageArea'

const defaultOverlayStyle = { textAlign: 'center', "position": "absolute", "width": "100%", "height": "100%", "top": "0", "left": "0", "right": "0", "bottom": "0", "backgroundColor": "rgba(0,0,0,0.5)", "zIndex": "2", "cursor": "pointer" }

export default class LayoutsListPopover extends React.Component {
  constructor(props){
    super(props);
    this.state = { overlayDisplay: { display: 'none' } }
  }


  hoverImg = () => {
    this.setState({ overlayDisplay: { display: 'block' } })
  }

  mouseLeaveImage = () => {
    this.setState({ overlayDisplay: { display: 'none' } })
  }


  getPopverContent = () => {

    return (
      <div style={{ height: 800, width: 180, overflow: 'auto' }}>
        {
          this.props.layouts.map(layout =>
            <LayoutsListPopoverImageArea
              key={layout.id}
              layout={layout}
              addNode={this.props.addNode}
            />
          )}
      </div>
    )
  }

  render() {
    return (
      <Popover content={this.getPopverContent()} placement="right" trigger="click">
        <Button color="secondary" style={this.props.buttonStyle}>
          新增常用布局
        </Button>
      </Popover>
    );
  }
}

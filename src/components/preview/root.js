// edit 根节点 
// 其实是个 div
import React, { Component } from 'react';

export default class PreviewRoot extends Component {
  constructor(props, context) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
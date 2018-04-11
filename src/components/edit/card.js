// 传入 props
// style: { maxWidth: 'auto', marginLeft: 20 }

import React, { Component } from 'react';
import Card from 'material-ui/Card';

export default class EditableCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // {style: { maxWidth: 'auto', marginLeft: 20 }} 
    const {style} = this.props
    return (
      <Card style={style}>
        {this.props.children}
      </Card>
    );
  }
}








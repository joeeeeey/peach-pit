// 传入 props
import React, { Component } from 'react';
import { CardMedia } from 'material-ui/Card';

export default class EditableCardMedia extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style, image, title } = this.props
    return (
      <CardMedia
        style={style}
        image={image}
        title={title}
      />
    );
  }
}








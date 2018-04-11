// 传入 props
// style: { height: 280 }, image: "/images/ORG_DSC01034.jpg", title: ''
import React, { Component } from 'react';
import { CardMedia } from 'material-ui/Card';

export default class PreviewCardMedia extends Component {
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








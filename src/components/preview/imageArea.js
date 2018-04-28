// 传入 props

// {
//   native: false, nodeName: 'ImageArea',
//   props: {src: 'http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/8/1a4729c10b66ea0d2b5b9f25f2ea7039' }
// }

// {"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/8/1a4729c10b66ea0d2b5b9f25f2ea7039"}}
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultImageStyle = { maxWidth: '100%', maxHeight: '100%' }

export default class PreviewImageArea extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { src, alt, imageStyle = defaultImageStyle, imageContainerStyle = { margin: '1px 15px' } } = this.props

    return (
      <div
        style={Object.assign({ position: 'relative', textAlign: 'center' }, imageContainerStyle)}>
        <img src={src} style={imageStyle}></img>
      </div>
    );
  }
}





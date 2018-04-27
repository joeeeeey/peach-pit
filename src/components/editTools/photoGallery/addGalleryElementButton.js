import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Menu, Dropdown, Slider } from 'antd';

const buttonStyle = {fontSize:15, color: '#40C4FF', width: '100%', justifyContent: 'left' }

export default class AddGalleryElementButton extends React.Component {
  constructor(props, context) {
    super(props);
  }

  updateGalleryStyle = () => {
    const updateNodesPayload = ['imgContainerMargin', 'intensity', 'galleryWidth']
      .map(key => {
        return {
          value: this.state[key],
          nestedKey: `${this.props.selfkey},props,${key}`
        }
      })

    const compositePayload = {
      payloadData: {
        updateNodes: { payloadData: updateNodesPayload },
      }
    }

    this.context.store.dispatch({
      type: 'composite',
      payload: compositePayload,
      target: 'node',
    })
  }

  addGalleryElement = () => {
    const defaultChild = {
      native: false,
      nodeName: 'ImageArea',
      props: {
        alt: 'initial',
        src: 'http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/bcde62d234912ae4371e20ec8cabcc02',
        galleryStyle: { type: 'verticalGallery', width: 1, height: 1 }
      }
    }


    this.context.store.dispatch({
      type: 'addNode',
      payload: { targetKey: this.props.selfkey, nodeData: defaultChild },
      target: 'node',
    });


    // 默认图片
    // http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/bcde62d234912ae4371e20ec8cabcc02
  }

  render() {
    return (
      <div style={{ margin: 'auto', marginTop: 5,   width: '20%', opacity: 0.5, textAlign: 'center', background: '#303233' }}>
        <Button onClick={this.addGalleryElement} style={{ width: '100%', color: '#FFF', fontSize: 8 }}>
          增加元素
        </Button>
      </div>
    );
  }
}

AddGalleryElementButton.contextTypes = {
  store: PropTypes.object,
};

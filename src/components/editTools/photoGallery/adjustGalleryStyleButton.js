import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Menu, Dropdown, Select, Slider } from 'antd';


const buttonStyle = { color: 'grey', width: '100%', justifyContent: 'left' }

const Option = Select.Option;


export default class AdjustGalleryStyleButton extends React.Component {
  constructor(props, context) {
    super(props);
    this.positionStyle = this.props.positionStyle || { position: 'absolute', left: '2%', top: 10, "borderRadius": "10%", "background": "#ABB8C3" }
    this.state = {
      visible: false,
    }
  }

  // 关闭点击自动关闭菜单
  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  }

  getFillType = (type) => {
    switch (type) {
      // 平铺
      case 'tile':
        return '平铺'
      // 拉伸
      case 'stretch':
        return '拉伸'
      // 填充 将整个图片都放入区域，不改变长宽比例，然后居中。需要手动计算设置长宽?
      case 'fill':
        return '填充'
      default:
        return ''
        break;
    }
  }

  // updateInfo => [{value: '', type: ''}]
  updateNodeBackground = (updateInfo = []) => {
    let updateNodesPayload = updateInfo.map(e => {
      return { value: e.value, nestedKey: `${this.props.parentkey},props,backgroundInfo,${e.type}` }
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


  menu = (f) => {
    const { backgroundType, fillType } = this.props.backgroundInfo
    return (
      <Menu >
        <Menu.Item key={'UploaderEntrance'}>
          <Slider defaultValue={80} />
          {/* <UploaderEntrance container={'div'} uploadSuccess={this.handleUploadSuccess} nestedkeyprefix={`${this.props.parentkey},props,backgroundInfo`} /> */}
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    return (
      <div style={this.positionStyle}>
        <Dropdown
          overlay={this.menu()}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}>
          <Button style={{ minWidth: 20, color: '#FFF', fontSize: 8 }}>
            样式
        </Button>
        </Dropdown>
      </div>
    );
  }
}

AdjustGalleryStyleButton.contextTypes = {
  store: PropTypes.object,
};

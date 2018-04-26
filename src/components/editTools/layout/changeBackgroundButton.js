import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Menu, Dropdown, Select } from 'antd';
import UploaderEntrance from '../image/uploaderEntrance'
import Grid from 'material-ui/Grid';

import { TwitterPicker, SketchPicker } from 'react-color'

const buttonStyle = { color: 'grey', width: '100%', justifyContent: 'left' }

const Option = Select.Option;


export default class ChangeBackgroundButton extends React.Component {
  constructor(props, context) {
    super(props);
    this.positionStyle = this.props.positionStyle || { position: 'absolute', right: '2%', top: 10, "borderRadius": "10%", "background": "#303233" }
    this.state = {
      visible: false,
      backgroundType: this.props.backgroundInfo.backgroundType,
      enableParallex: this.props.backgroundInfo.enableParallex,
      fillType: this.props.backgroundInfo.fillType,
      colorPicker: 'twitter',
      background: '#ffffff',
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

  updateParallexStyle = () => {
    this.setState({ enableParallex: !this.state.enableParallex },
      () =>
        this.updateNodeBackground([{ value: this.state.enableParallex, type: 'enableParallex' }]))
  }

  // 改變填充類型時, 需先禁用視差效果
  updateFillType = (value) => {
    this.setState({ fillType: value, enableParallex: false },
      () =>
        this.updateNodeBackground(
          [
            { value: value, type: 'fillType' },
            { value: false, type: 'enableParallex' }
          ]
        )
    )
  }

  // 默认 set        
  // enableParallex: true, fillType:  'stretch'
  // TODO 同時更新兩個值使用 reducer 的批量方法
  setBackgroundImageDefaultStyle = () => {
    this.updateNodeBackground(
      [
        { value: 'stretch', type: 'fillType' },
        { value: true, type: 'enableParallex' }
      ]
    )
  }


  // 得到子组件图片上传成功的回调
  handleUploadSuccess = (color) => {
    this.setBackgroundImageDefaultStyle()
  }

  handleChangeColorPicker = (color, event) => {
    this.setState({ background: color.hex })
    this.updateNodeBackground(
      [{ type: 'backgroundType', value: 'pureColor' },
      { value: color.hex, type: 'background' }]
    )
  }

  changeColorPicker = () => {
    if (this.state.colorPicker === 'twitter') {
      this.setState({ colorPicker: 'sketch' })
    } else {
      this.setState({ colorPicker: 'twitter' })
    }
  }

  menu = (f) => {
    const { backgroundType, fillType } = this.props.backgroundInfo
    return (
      <Menu >
        <Menu.Item key={'UploaderEntrance'}>
          <UploaderEntrance container={'div'} uploadSuccess={this.handleUploadSuccess} nestedkeyprefix={`${this.props.parentkey},props,backgroundInfo`} />
        </Menu.Item>
        {backgroundType === 'image' &&
          <Menu.Item key={'fillTypeSelection'}>
            <div>
              <Select defaultValue={this.getFillType(fillType)} style={{ width: 120 }} onChange={this.updateFillType}>
                <Option value="tile">平铺</Option>
                <Option value="stretch">拉伸</Option>
                <Option value="fill">填充</Option>
              </Select>
            </div>
          </Menu.Item>
        }
        {backgroundType === 'image' &&
          <Menu.Item key={'updateParallexStyleButton'}>
            <Button onClick={this.updateParallexStyle} color="secondary" style={buttonStyle}>
              {this.state.enableParallex ? '关闭视差' : '启用视差'}
            </Button>
          </Menu.Item>
        }

        <Menu.Item key={'updataBackgroundColorButtons'}>
          <div style={{ maxWidth: 150, textAlign: 'center' }}>
            <Button style={{ marginBottom: 5, }} onClick={this.changeColorPicker}> 切换画板</Button>
            {this.state.colorPicker === 'twitter' &&
              <TwitterPicker
                triangle={'hidden'}
                width={140}
                onChangeComplete={this.handleChangeColorPicker}
                color={this.state.background}
                colors={['#ABB8C3', 'white', "#448AFF", "#81D4FA", "#40C4FF", "#80DEEA", "#18FFFF", "#80CBC4",
                  "#64FFDA", "#A5D6A7", "#69F0AE", "#C5E1A5", "#B2FF59", "#E6EE9C", "#EEFF41"]}
              />
            }

            {this.state.colorPicker === 'sketch' &&
              <SketchPicker
                width={140}
                color={this.state.background}
                onChangeComplete={this.handleChangeColorPicker} />
            }
          </div>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    return (
      <div style={this.positionStyle}>
        <Dropdown
          overlay={this.menu(this.updateNodeBackground, 'background')}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}>
          <Button style={{ minWidth: 60, color: '#FFF', fontSize: 8 }}>
            背景
        </Button>
        </Dropdown>
      </div>
    );
  }
}

ChangeBackgroundButton.contextTypes = {
  store: PropTypes.object,
};

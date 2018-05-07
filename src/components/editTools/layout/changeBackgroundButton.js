import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Menu, Dropdown, Select } from 'antd';
import UploaderEntrance from '../image/uploaderEntrance'

import { TwitterPicker, SketchPicker } from 'react-color'
import red from 'material-ui/colors/red'
import pink from 'material-ui/colors/pink'
import purple from 'material-ui/colors/purple'
import deepPurple from 'material-ui/colors/deepPurple'
import indigo from 'material-ui/colors/indigo'
import blue from 'material-ui/colors/blue'
import lightBlue from 'material-ui/colors/lightBlue'
import cyan from 'material-ui/colors/cyan'
import teal from 'material-ui/colors/teal'
import green from 'material-ui/colors/green'
import lightGreen from 'material-ui/colors/lightGreen'
import lime from 'material-ui/colors/lime'
import yellow from 'material-ui/colors/yellow'
import amber from 'material-ui/colors/amber'
import orange from 'material-ui/colors/orange'
import deepOrange from 'material-ui/colors/deepOrange'
import brown from 'material-ui/colors/brown'
import grey from 'material-ui/colors/grey'
import blueGrey from 'material-ui/colors/blueGrey'


const buttonStyle = { color: 'grey', width: '100%', justifyContent: 'left' }

const Option = Select.Option;


export default class ChangeBackgroundButton extends React.Component {
  constructor(props, context) {
    super(props);
    this.positionStyle = this.props.positionStyle || { position: 'absolute', right: '2%', top: 4, "borderRadius": "10%", "background": "#303233" }
    const { backgroundInfo } = this.props
    const { backgroundType, enableParallex, fillType, fullHeight, background } = backgroundInfo

    this.state = {
      visible: false,
      backgroundType: backgroundType,
      enableParallex: enableParallex,
      fillType: fillType,
      colorPicker: 'twitter', // 默认选择的画板
      background: backgroundType === "pureColor" ? background : '#ffffff', // 默认颜色
      colorPickerHue: 100, // 默认色调为淡色 dark
      fullHeight: !!fullHeight,
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

  updateFullHeightStyle = () => {
    this.setState({ fullHeight: !this.state.fullHeight },
      () =>
        this.updateNodeBackground([{ value: this.state.fullHeight, type: 'fullHeight' }]))    
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

  getPositionStyle = () => {
    if (this.props.positionStyle) { return this.props.positionStyle }
    if (this.props.fullWithChilren) {
      return { zIndex: 50, position: 'absolute', right: '2%', top: 4, "borderRadius": "10%", "background": "#303233" }
    } else {

      return { zIndex: 50, position: 'absolute', right: '2%', top: 4, "borderRadius": "10%", "background": "#303233" }
    }
  }

  // 使用 meterial-ui 颜色阶梯
  getColorSetting = () => {
    // https://material-ui-next.com/style/color/
    const cph = this.state.colorPickerHue
    return ['ffffff', red[cph], pink[cph], purple[cph], deepPurple[cph], indigo[cph], blue[cph], lightBlue[cph], cyan[cph], teal[cph], green[cph], lightGreen[cph], lime[cph], yellow[cph], amber[cph], orange[cph], deepOrange[cph], brown[cph], grey[cph], blueGrey[cph]]
  }

  // 改变色调 // TODO 双向变化
  changeColorPickerHue = () => {
    const cph = this.state.colorPickerHue
    if (cph === 900) {
      this.setState({ colorPickerHue: 100 })
    } else {
      this.setState({ colorPickerHue: (cph + 100) })
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
          <Menu.Item key={'updateParallexStyleButton'}>
            {/* <Button onClick={this.updateParallexStyle} color="secondary" style={buttonStyle}>
              {this.state.enableParallex ? '关闭视差' : '启用视差'}
            </Button> */}
            <div style={{ maxWidth: 180, textAlign: 'center' }}>
              <div style={{ width: '100%' }}>
                <div style={{ float: 'left', width: '50%' }}>
                  <Button onClick={this.updateParallexStyle} color="secondary" size='small' style={{ marginBottom: 5 }} >
                    {this.state.enableParallex ? '关闭视差' : '启用视差'}
                  </Button>
                </div>

                <div style={{ width: '50%' }}>
                  <Button onClick={this.updateFullHeightStyle} color="secondary" size='small' style={{ marginBottom: 5 }} >
                    {this.state.fullHeight ? '内容撑开' : '满屏背景'}
                  </Button>
                </div>
              </div>
            </div>
          </Menu.Item>
        }

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


        <Menu.Item key={'updataBackgroundColorButtons'}>
          <div style={{ maxWidth: 180, textAlign: 'center' }}>
            <div style={{ width: '100%' }}>
              <div style={{ float: 'left', width: '50%' }}>
                <Button size='small' style={{ marginBottom: 5 }} onClick={this.changeColorPicker}>
                  切换画板</Button>
              </div>

              <div style={{ width: '50%' }}>
                <Button size='small' style={{ marginBottom: 5 }} onClick={this.changeColorPickerHue}>
                  色调深浅</Button>
              </div>
            </div>

            {this.state.colorPicker === 'twitter' &&
              <TwitterPicker
                triangle={'hide'}
                width={140}
                onChangeComplete={this.handleChangeColorPicker}
                color={this.state.background}
                colors={this.getColorSetting()}
              />
            }

            {this.state.colorPicker === 'sketch' &&
              <SketchPicker
                width={120}
                color={this.state.background}
                presetColors={this.getColorSetting()}
                onChangeComplete={this.handleChangeColorPicker} />
            }
          </div>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    return (
      <div style={this.getPositionStyle()}>
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

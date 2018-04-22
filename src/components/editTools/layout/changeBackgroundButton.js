import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Menu, Dropdown } from 'antd';
import UploaderEntrance from '../image/uploaderEntrance'
const buttonStyle = { color: 'grey', width: '100%', justifyContent: 'left' }

// function menu(f) {
//   return (
//     <Menu>
//         <Menu.Item key={'UploaderEntrance'}>
//           <UploaderEntrance nestedkey={`${this.props.parentkey},props,background`}/>
//         </Menu.Item>

//       {['white', '#a2c5d6', '#8c7ec9', '#f3f7aa'].map(background =>
//         <Menu.Item key={background}>
//           <Button onClick={() => { f(background) }} color="secondary" style={buttonStyle}>
//             {background}
//           </Button>
//         </Menu.Item>
//       )
//       }
//     </Menu>
//   )
// }

export default class ChangeBackgroundButton extends React.Component {
  constructor(props, context) {
    super(props);
    this.positionStyle = this.props.positionStyle || { position: 'absolute', right: 20, top: 10, "borderRadius": "10%", "background": "#303233" }
    this.state = { visible: false }
  }
  // 关闭点击自动关闭菜单
  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  }

  updateNodeBackground = (backgroundValue) => {
    let nestedKey = `${this.props.parentkey},props,background`
    this.context.store.dispatch({
      type: 'update',
      payload: { nestedKey: nestedKey, value: backgroundValue },
      target: 'node',
    })
  }

  menu = (f) => {
    return (
      <Menu>
          <Menu.Item key={'UploaderEntrance'}>
            <UploaderEntrance nestedkey={`${this.props.parentkey},props,background`}/>
          </Menu.Item>
  
        {['white', '#a2c5d6', '#8c7ec9', '#f3f7aa'].map(background =>
          <Menu.Item key={background}>
            <Button onClick={() => { f(background) }} color="secondary" style={buttonStyle}>
              {background}
            </Button>
          </Menu.Item>
        )
        }
      </Menu>
    )
  }  

  render() {
    return (
      <div style={this.positionStyle}>
        <Dropdown
          overlay={this.menu(this.updateNodeBackground)}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}>
          <Button style={{minWidth:60, color: '#FFF', fontSize: 8 }}>
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

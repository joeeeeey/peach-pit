import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Menu, Dropdown } from 'antd';

const buttonStyle = { color: 'grey', width: '100%', justifyContent: 'left' }

function menu(f) {
  return (
    <Menu>
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

export default class ChangeBackgroundButton extends React.Component {
  constructor(props, context) {
    super(props);
    this.positionStyle = this.props.positionStyle || { position: 'absolute', right: 20, top: 10, "borderRadius": "10%", "background": "#303233" }
  }

  updateNodeBackground = (backgroundValue) => {
    let nestedKey = `${this.props.parentkey},props,background`
    this.context.store.dispatch({
      type: 'update',
      payload: { nestedKey: nestedKey, value: backgroundValue },
      target: 'node',
    })
  }

  render() {
    return (
      <div style={this.positionStyle}>
        <Dropdown overlay={menu(this.updateNodeBackground)} trigger={['click']}>
          <Button style={{ color: '#FFF', fontSize: 8 }}>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Menu, Dropdown } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

export default class ChangeBackgroundButton extends React.Component {
  constructor(props, context) {
    super(props);
  }


  render() {
    return (
      <div style={{ position: 'absolute', right: 20, top: 10, "borderRadius": "10%", "background": "#303233" }}>
        <Dropdown overlay={menu} trigger={['click']}>
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

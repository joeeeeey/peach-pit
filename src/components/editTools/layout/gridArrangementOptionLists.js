import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Menu, Dropdown } from 'antd';

const buttonStyle = { color: 'grey', width: '100%', justifyContent: 'left' }

function menu(f) {
  return (
    <Menu>
      {[[6, 6], [4, 8], [8, 4], [4, 4, 4], [12], [4, 4, 2, 2], [6, 3, 3], [2, 2, 2, 2, 2, 2]].map(item =>
        <Menu.Item key={JSON.stringify(item)}>
          <Button onClick={() => { f(item) }} color="secondary" style={buttonStyle}>
            {`${item.join(',')}`}
          </Button>
        </Menu.Item>
      )
      }
    </Menu>
  )
}

export default class GridArrangementOptionLists extends React.Component {
  constructor(props, context) {
    super(props);
    this.positionStyle = this.props.positionStyle || { position: 'absolute', left: -20, top: -37, "borderRadius": "10%", "background": "#303233" }
    this.state = { visible: false }
  }

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  }
  rearrangeGird = (flex) => {
    this.props.handleRearrangeGird(flex)
  }

  render() {
    return (
      <div style={this.positionStyle}>
        <Dropdown overlay={menu(this.rearrangeGird)} trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
        >
          <Button style={{ color: '#FFF', fontSize: 8 }}>
            布局
        </Button>
        </Dropdown>
      </div>
    );
  }
}

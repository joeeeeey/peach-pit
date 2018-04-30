import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Menu, Dropdown } from 'antd';

const buttonStyle = { color: 'grey', width: '100%', justifyContent: 'left' }

// function menu(f) {
//   return (
//     <Menu>
//       {[[6, 6], [4, 8], [7, 5], [3, 6, 3], [8, 4], [4, 4, 4], [12], [4, 4, 2, 2], [6, 3, 3], [2, 2, 2, 2, 2, 2]].map(item =>
//         <Menu.Item key={JSON.stringify(item)}>
//           <Button onClick={() => { f(item) }} color="secondary" style={buttonStyle}>
//             {`${item.join(',')}`}
//           </Button>
//         </Menu.Item>
//       )
//       }

//       <Menu.Item key="fullWithChilrenButton">
//         <Button onClick={() => { f(item) }} color="secondary" style={buttonStyle}>
//           {`${item.join(',')}`}
//         </Button>
//       </Menu.Item>
//     </Menu>
//   )
// }

export default class GridArrangementOptionLists extends React.Component {
  constructor(props, context) {
    super(props);
    this.positionStyle = this.props.positionStyle || { position: 'absolute', left: '-8%', top: -20, "borderRadius": "10%", "background": "#303233" }
    this.state = { visible: false }
  }

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  }

  rearrangeGird = (flex) => {
    this.props.handleRearrangeGird(flex)
  }


  menu(f) {
    return (
      <Menu>
        <Menu.Item key="fullWithChilrenButton">
          <Button onClick={this.changeFullWithChilrenButton} color="secondary" style={buttonStyle}>
            {this.props.fullWithChilren ? '自动留空' : '子元素占满'}
          </Button>
        </Menu.Item>
        {[[6, 6], [5,2,5], [4, 8], [3, 6, 3], [8, 4], [4, 4, 4], [12], [4, 4, 2, 2], [6, 3, 3], [2, 2, 2, 2, 2, 2]].map(item =>
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

  changeFullWithChilrenButton = () => {
    this.props.changeFullWithChilrenButton(!!!this.props.fullWithChilren)
  }


  getPositionStyle = () => {
    if (this.props.positionStyle) { return this.props.positionStyle }
    if (this.props.fullWithChilren) {
      return {zIndex:50, position: 'absolute', left: '2%', top: 10, "borderRadius": "10%", "background": "#303233" }
    } else {
      return {zIndex:50,  position: 'absolute', left: '-8%', top: -20, "borderRadius": "10%", "background": "#303233" }
    }
  }

  render() {
    return (
      <div name={"GridArrangementOptionLists"}style={this.getPositionStyle()}>
        <Dropdown overlay={this.menu(this.rearrangeGird)} trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
        >
          <Button style={{ minWidth: 18, color: '#FFF', fontSize: 8 }}>
            布局
        </Button>
        </Dropdown>
      </div>
    );
  }
}

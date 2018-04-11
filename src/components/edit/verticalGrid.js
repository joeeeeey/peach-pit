// 编写一个 editable 布局组件 ，鼠标悬浮时可以出现一个 button，
// 点击则可以在这个节点 chilren 直接增加一个可编辑 textarea, 编写更新 store 的方法。
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

export default class EditableVerticalGrid extends Component {
  constructor(props, context) {
    super(props);
    this.state = { hovered: false, addNodeName: 'TextArea'}
  }
  hovorStyle = () => {
    if (this.state.hovered) {
      return { border: '0.005rem solid #6d6d6d' }
    }
  }

  onMouseOver = () => {
    this.setState({ hovered: true });
  }

  onMouseOut = () => {
    this.setState({ hovered: false });
  }

  addNode = () => {
    let nodeName = this.state.addNodeName
    switch (nodeName) {
      case 'TextArea':
        let {selfkey} = this.props
        this.context.store.dispatch({
          type: 'addNode',
          payload: {selfKey: selfkey, nodeName: nodeName}
        });
        return 'state'
      default:
        return false
    }    
  }

  removeNode = () => {
    console.log('grid removeNode')
    let nodeName = 'TextArea'
    switch (nodeName) {
      case 'TextArea':
        let {selfkey, parentkey} = this.props
        this.context.store.dispatch({
          type: 'removeNode',
          payload: {selfKey: selfkey, parentKey: parentkey, nodeName: nodeName}
        });
        return 'state'
      default:
        return false
    }    
  }

  render() {
    const { style } = this.props
    return (
      <div onMouseOver={this.onMouseOver}
      onMouseOut={this.onMouseOut}
      style={this.hovorStyle()}>
        <Grid container direction="column" >
          {this.props.children}
        </Grid>
        <Button onClick={this.addNode}>增加一个竖直布局</Button>
        <Button onClick={this.removeNode}>把自己删掉</Button>
      </div>
    );
  }
}


EditableVerticalGrid.contextTypes = {
  store: PropTypes.object
};
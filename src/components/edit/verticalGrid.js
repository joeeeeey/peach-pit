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
        console.log(this.props)
        let {selfkey} = this.props
        // console.log(this.context.store.getState())
        this.context.store.dispatch({
          type: 'addNode',
          payload: {selfKey: selfkey, nodeName: nodeName}
        });
        return 'state'
      default:
        return false
    }    
    console.log('addNode')
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
        {/* <Grid container direction="row" spacing={16} justify={'center'} alignItems={'baseline'}>
          <Grid item lg={5} md={5} sm={5} xs={11} style={{ border: '0.005rem solid #6d6d6d' }}>
            <Grid container direction="column">
            </Grid>
          </Grid>
        </Grid> */}
        <Button onClick={this.addNode}>增加一个 h1</Button>
        <Button>去掉一个 h1</Button>
      </div>
    );
  }
}


EditableVerticalGrid.contextTypes = {
  store: PropTypes.object
};
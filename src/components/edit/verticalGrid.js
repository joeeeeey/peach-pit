// 垂直布局最外层是水平布局的 Grid
// 而子 Grid 里才是垂直

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import EditableSpirit from '../edit/spirit'

import Editor from '../meta/editor'
export default class EditableVerticalGrid extends Component {
  constructor(props, context) {
    super(props);
    this.state = { hovered: false, addNodeName: 'TextArea' }
  }
  // hovorStyle = () => {
  //   if (this.state.hovered) {
  //     return { border: '0.005rem solid #6d6d6d' }
  //   }
  // }

  // onMouseOver = () => {
  //   this.setState({ hovered: true });
  // }

  // onMouseOut = () => {
  //   this.setState({ hovered: false });
  // }

  addNode = () => {
  }

  removeNode = () => {
    let nodeName = 'TextArea'
    switch (nodeName) {
      case 'TextArea':
        let { selfkey, parentkey } = this.props
        this.context.store.dispatch({
          type: 'removeNode',
          payload: { targetKey: selfkey, parentKey: parentkey, nodeName: nodeName },
          target: 'node',
        });
        return 'state'
      default:
        return false
    }
  }

  render() {
    // const { style } = this.props
    this.children = this.props.children
    if(!Array.isArray(this.children) && this.children !== null && typeof this.children === 'object'){
      this.children = [this.children]
    }
    return (
      <div onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}>

        {/* <Grid container className={{ flexGrow: 1 }}>
          <Grid item xs={12}> */}
        <Grid container style={{ flexGrow: 1 }} direction="row" justify="space-around" alignItems="center">
          {this.children ?
            this.children.map((child, index) => {
              return (
                <Grid key={child.props.selfkey} item xs={12} style={{ padding: '22px 0', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -5, width: '100%' }}>
                    <EditableSpirit parentkey={this.props.selfkey} childrenkey={child.props.selfkey} />
                  </div>
                  {child}
                </Grid>
              )
            }) : 
            <Grid item xs={12} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: -5, width: '100%' }}>
                <EditableSpirit parentkey={this.props.selfkey} />
              </div>
            </Grid>
          }

        </Grid>
      </div>
    );
  }
}


EditableVerticalGrid.contextTypes = {
  store: PropTypes.object
};
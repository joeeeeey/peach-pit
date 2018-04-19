// 垂直布局最外层是水平布局的 Grid
// 而子 Grid 里才是垂直

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

export default class EditableVerticalGrid extends Component {
  constructor(props, context) {
    super(props);
    this.state = { hovered: false, addNodeName: 'TextArea' }
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
    const { style } = this.props
    return (
      <div onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        style={this.hovorStyle()}>

        {/* <Grid container className={{ flexGrow: 1 }}>
          <Grid item xs={12}> */}
        <Grid container style={{ flexGrow: 1 }} direction="row" justify="space-around" alignItems="center">
          <Grid item xs={12}>
            <h1>一行东西</h1>
          </Grid>

          <Grid item xs={12}>
            <h1>二行东西</h1>
          </Grid>              
         
          {/* {this.props.children} */}
          {/* </Grid>
          </Grid> */}
        </Grid>
      </div>
    );
  }
}


EditableVerticalGrid.contextTypes = {
  store: PropTypes.object
};
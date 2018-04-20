// 垂直布局最外层是水平布局的 Grid
// 而子 Grid 里才是垂直

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import AddNodeSpirit from '../editTools/layout/addNodeSpirit'
import RemoveNodeSpirit from '../editTools/layout/removeNodeSpirit'


const AddNodeSpiritContainerStyle = { minHeight: 23, position: 'absolute', top: -15, width: '100%' }
const RemoveNodeSpiritContainerStyle = { position: 'absolute', right: -15, top: -4 }
export default class EditableVerticalGrid extends Component {
  constructor(props, context) {
    super(props);
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
    return (
      <div>
        <Grid container style={{ flexGrow: 1 }} direction="row" justify="space-around" alignItems="center">
          {this.props.children &&
            React.Children.toArray(this.props.children).map((child, index) => {
              return (
                <Grid key={child.props.selfkey} item xs={12} style={{ padding: '22px 0', position: 'relative' }}>
                  <div key='addNodeSpritContainer' style={AddNodeSpiritContainerStyle} >
                    <AddNodeSpirit permanent={false} ref={(el) => { this.addNodeSpirit = el }} parentkey={this.props.selfkey} childrenkey={child.props.selfkey} />
                  </div>
                  <div key='RemoveNodeSpritContainer' style={RemoveNodeSpiritContainerStyle}>
                    <RemoveNodeSpirit parentkey={this.props.selfkey} childrenkey={child.props.selfkey} />
                  </div>
                  {child}
                </Grid>
              )
            })
          }
          <Grid item xs={12} style={{ position: 'relative' }}>
            <div key='addNodeSpritContainer' style={AddNodeSpiritContainerStyle}>
              {this.props.children ?
                <AddNodeSpirit parentkey={this.props.selfkey}/>
                : <AddNodeSpirit permanent={true} parentkey={this.props.selfkey} />}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}


EditableVerticalGrid.contextTypes = {
  store: PropTypes.object
};
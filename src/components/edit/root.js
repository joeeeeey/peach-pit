// edit 根节点 
// 其实是个 div
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import nodeOperation from '../../share/nodeOperation'

export default class EditableRoot extends Component {
  constructor(props, context) {
    super(props);
    // this.state = { addNodeName: 'TextArea'}
  }

  addNode = (nodeName) => {
    // let nodeName = this.state.addNodeName
    let {selfkey} = this.props
    this.context.store.dispatch({
      type: 'addNode',
      payload: {selfKey: selfkey, nodeName: nodeName}
    });    
  }

  addLetfRightGridNode = () => {
    this.addNode('LetfRightGrid')
  }
  addTextAreaNode = () =>{
    this.addNode('TextArea')
  }

  preview = ()=>{
    console.log(nodeOperation.heightenDomTree(this.context.store.getState()))
    
    // console.log()
  }
    
  render() {
    return (
      <div>
        <Button onClick={this.addLetfRightGridNode}>增加一个左右布局</Button>
        <Button onClick={this.addTextAreaNode}>增加一个上下输入框布局</Button>
        <Button variant="raised" color="primary" onClick={this.preview}>预览</Button>
        {this.props.children}
      </div>
    );
  }
}


EditableRoot.contextTypes = {
  store: PropTypes.object
};
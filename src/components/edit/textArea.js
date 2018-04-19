import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from '../meta/editor'

// {
//   native: false, nodeName: 'TextArea',
//   props: { deltaDeltaValue: [{"insert":"\n","attributes":{"header":1}}], readOnly: false }
// }


// {"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"好吃的东西","attributes":{"color":"#1c1a1a","font":"serif","size":"large","bold":true}},{"insert":"\n","attributes":{"align":"center","header":3}}],"readOnly":false}}
export default class EditableTextArea extends Component {
  constructor(props, context) {
    super(props);
  }

  getChildContext() {
    return { store: this.context.store };
  }

  render() {
    const { deltaDeltaValue, readOnly = false } = this.props
    return (
      <Editor selfkey={this.props.selfkey} deltaDeltaValue={deltaDeltaValue} readOnly={readOnly}>
      </Editor>
    );
  }
}


EditableTextArea.childContextTypes = {
  store: PropTypes.object
};

EditableTextArea.contextTypes = {
  store: PropTypes.object
};





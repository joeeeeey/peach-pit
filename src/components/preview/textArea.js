import React, { Component } from 'react';
// import Typography from 'material-ui/Typography';
import ContentEditable from 'react-contenteditable'

import '../../css/contentEditable.css'
// 文档: https://material-ui-next.com/customization/default-theme/?expend-path=$.typography

// 可以传入 props
// { content : {'好吃的东西'}, 
//   style: {{ textAlign: 'center', fontSize: 30, fontWeight: 500, color: "#1c1a1a" }}}

export default class PreviewTextArea extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { style, content } = this.props
    return (
      <div>
        <div>
          <div style={style}>
            <ContentEditable
              html={content} // innerHTML of the editable div
              disabled={true}       // use true to disable edition
            />
          </div>
        </div>
      </div>
    );
  }
}






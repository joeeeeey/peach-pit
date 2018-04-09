import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable'

// 文档: https://material-ui-next.com/customization/default-theme/?expend-path=$.typography
// text
//     频繁使用

// 可以传入 props
// 对齐方式
// styles: { fontSize: 20, fontWeight: 900, color: "#1c1a1a" }
// children: "内容"
export default class MetaTextArea extends Component {
  constructor(props) {
    super(props);

    // this.state = { hovered: false, children: props.children }
  }

  render() {
    // const style = { fontSize: 20, fontWeight: 900, color: "#1c1a1a" }
    const {style, content} = this.props
    return (
      <div>
        <div style={style}>
          <ContentEditable
            html={content} // innerHTML of the editable div
            disabled={true}       // use true to disable edition
          />
        </div>
      </div>
    );
  }
}







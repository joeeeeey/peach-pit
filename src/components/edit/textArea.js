import React from "react";
import PropTypes from "prop-types";
import Editor from "../meta/editor";

// {
//   native: false, nodeName: 'TextArea',
//   props: { deltaDeltaValue: [{"insert":"\n","attributes":{"header":1}}], readOnly: false }
// }

// {"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"好吃的东西","attributes":{"color":"#1c1a1a","font":"serif","size":"large","bold":true}},{"insert":"\n","attributes":{"align":"center","header":3}}],"readOnly":false}}
export default class EditableTextArea extends React.PureComponent {
  constructor(props, context) {
    super(props);
  }

  getChildContext() {
    return { store: this.context.store };
  }

  render() {
    const {
      deltaDeltaValue, // 默认值
      readOnly = false,
      toolbarAbove, // toolbar 是否显示在上方
      toolbarOverlayStyle, // toolbar 绝对位置
      toolbarStyle, // toolbar 自己的宽度
      formats // toolbar 显示的内容 默认 ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "color", "align", "script", "direction", "clean"]
    } = this.props;

    return (
      <Editor
        selfkey={this.props.selfkey}
        deltaDeltaValue={deltaDeltaValue}
        readOnly={readOnly}
        toolbarAbove={toolbarAbove}
        toolbarOverlayStyle={toolbarOverlayStyle}
        toolbarStyle={toolbarStyle}
        formats={formats}
      />
    );
  }
}

EditableTextArea.childContextTypes = {
  store: PropTypes.object
};

EditableTextArea.contextTypes = {
  store: PropTypes.object
};

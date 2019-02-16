import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactQuill from "react-quill"; // ES6
import EditorToolbar from "./editorToolBar";
import * as nodeActions from "actions/node";

const randomStr = () => {
  return `${(Math.random() + Math.random()).toString()}`;
};

const mapDispatchToProps = dispatch => ({
  updateFlattenedNode: payload => {
    dispatch(nodeActions.updateFlattenedNode(payload));
  }
});

// props
// deltaDeltaValue: []  数据
// readOnly boolean 预览传入 true
// fromats 理应控制 toolbar 的数量 TODO

// 若想要初始化大小, 可以使用这样的方式 [{"insert":"\n","attributes":{"header":1}}]

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverEditor: false, // 控制样式
      foucsEditor: false, // 控制 toolbar 显示
      showToolbar: false, // 控制 toolbar 显示
      hoverToolbar: false // 控制 toolbar 显示
    };

    this.quillRef = null; // Quill instance
    this.reactQuillRef = null; // ReactQuill component

    // 用户输入完毕后出发的保存出发计时器
    this.saveTriggerTimer = undefined;

    this.deltaDeltaValue = this.props.deltaDeltaValue;
    this.readOnly = this.props.readOnly || false;
    this.formats = props.fromats || [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "color",
      "align",
      "script",
      "direction",
      "clean"
    ];
    this.quillId = `Quill${randomStr().replace(/\./i, "")}`;
  }

  componentDidMount() {
    this.attachQuillRefs();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    this.quillRef = this.reactQuillRef.getEditor();
  };

  handleChange = () => {
    if (this.quillRef) {
      // TODO 此处将 this.quillRef.editor.delta 报错
      if (this.saveTriggerTimer !== undefined) {
        clearTimeout(this.saveTriggerTimer);
      }

      // 延时两秒保存改动
      this.saveTriggerTimer = setTimeout(() => {
        this.saveTriggerTimer = undefined;
        let nestedKey = `${this.props.selfkey},props,deltaDeltaValue`;

        // TODO 需要将value 中的文本内容中的 \ => \\
        // const re = /"\n"/gi;
        // nodeCode = nodeCode.replace(re, '"\\n"');
        const payload = {
          nestedKey: nestedKey,
          value: this.quillRef.editor.delta.ops
        };
        this.props.updateFlattenedNode(payload);
      }, 2000);
    }
  };

  // 1. 光标在编辑区: 显示 toolbar
  // 2. 光标不在编辑区, 鼠标停留在 toolbar 上, 显示 toolbar
  handleFocus = () => {
    this.setState({ foucsEditor: true, showToolbar: true });
  };

  handleBlur = () => {
    if (this.state.hoverToolbar) {
      this.setState({ foucsEditor: false });
    } else {
      this.setState({ foucsEditor: false, showToolbar: false });
    }
  };

  hoverToolbarHandler = value => {
    if (this.state.foucsEditor) {
      this.setState({ hoverToolbar: value });
    } else {
      this.setState({ hoverToolbar: value, showToolbar: false });
    }
  };

  // 悬浮样式
  onMouseOver = () => {
    this.setState({ hoverEditor: true });
  };

  onMouseOut = () => {
    this.setState({ hoverEditor: false });
  };

  hovorStyle = () => {
    if (this.state.hoverEditor) {
      return { border: "0.005rem solid #6d6d6d" };
    } else {
      return {};
    }
  };

  modules = quillId => {
    return {
      toolbar: {
        container: "#" + quillId
      }
    };
  };

  render() {
    // TODO 规定长度，在靠屏幕左边时候左对齐，否则右对齐
    // const overlayStyle = {position: 'absolute', bottom: 5, left: 0, zIndex: 1300 }
    const { toolbarOverlayStyle = { bottom: 5, left: 0 }, toolbarAbove = true, toolbarStyle } = this.props;

    return (
      <div>
        {!this.readOnly && toolbarAbove && (
          <div style={{ position: "relative" }}>
            <div hidden={!this.state.showToolbar} style={Object.assign({ position: "absolute", zIndex: 300 }, toolbarOverlayStyle)}>
              <EditorToolbar formats={this.formats} toolbarStyle={this.props.toolbarStyle} id={this.quillId} hoverToolbar={this.hoverToolbarHandler} />
            </div>
          </div>
        )}
        <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} style={this.hovorStyle()}>
          <ReactQuill
            onChange={this.handleChange}
            modules={this.modules(this.quillId)}
            formats={this.formats}
            theme={"snow"} // pass false to use minimal theme
            placeholder={"Write something"}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            ref={el => {
              this.reactQuillRef = el;
            }}
            defaultValue={this.deltaDeltaValue}
            readOnly={this.readOnly}
          />
        </div>
        {!this.readOnly && !toolbarAbove && (
          <div style={{ position: "relative" }}>
            <div hidden={!this.state.showToolbar} style={Object.assign({ position: "absolute", zIndex: 300 }, toolbarOverlayStyle)}>
              <EditorToolbar toolbarStyle={toolbarStyle} id={this.quillId} hoverToolbar={this.hoverToolbarHandler} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

Editor.propTypes = {
  updateFlattenedNode: PropTypes.func,
  deltaDeltaValue: PropTypes.array,
  readOnly: PropTypes.bool,
  selfkey: PropTypes.string.isRequired,
  toolbarStyle: PropTypes.object,
}

Editor.defaultProps = {
  updateFlattenedNode: () => {},
  deltaDeltaValue: [],
  readOnly: false,
  toolbarStyle: {},
}

export default connect(
  null,
  mapDispatchToProps
)(Editor);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill'; // ES6
import EditorToolbar from './editorToolBar'

function randomStr() {
  return `${(Math.random() + Math.random()).toString()}`
}


// props
// deltaDeltaValue: []  数据
// readOnly boolean 预览传入 true
// fromats 理应控制 toolbar 的数量 TODO

// 若想要初始化大小, 可以使用这样的方式 [{"insert":"\n","attributes":{"header":1}}]

class Editor extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      hoverEditor: false, // 控制样式
      hidden: false,
      foucsEditor: false, // 控制 toolbar 显示
      showToolbar: false, // 控制 toolbar 显示
      hoverToolbar: false // 控制 toolbar 显示
    };

    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null; // ReactQuill component

    // 用户输入完毕后出发的保存出发计时器
    this.saveTriggerTimer = undefined

    this.deltaDeltaValue = this.props.deltaDeltaValue
    this.readOnly = this.props.readOnly || false
    this.formats = props.fromats || ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "color", "align", "script", "direction", "clean"]
    this.quillId = `Quill${randomStr().replace(/\./i, '')}`
  }

  componentDidMount() {
    this.attachQuillRefs()
  }

  componentDidUpdate() {
    this.attachQuillRefs()
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
  }

  handleChange = (html) => {
    if (this.quillRef) {
      // TODO 此处将 this.quillRef.editor.delta 报错
      // this.changedDeltaValue

      if (this.saveTriggerTimer !== undefined) {
        clearTimeout(this.saveTriggerTimer)
      }

      // 延时两秒保存改动
      this.saveTriggerTimer = setTimeout(() => {
        this.saveTriggerTimer = undefined;
        let nestedKey = `${this.props.selfkey},props,deltaDeltaValue`
        this.context.store.dispatch({
          type: 'update',
          payload: { nestedKey: nestedKey, value: this.quillRef.editor.delta.ops },
          target: 'node',
        })
      }, 2000);
    }
  }

  // 1. 光标在编辑区: 显示 toolbar
  // 2. 光标不在编辑区, 鼠标停留在 toolbar 上, 显示 toolbar
  handleFocus = () => {
    this.setState({ foucsEditor: true, showToolbar: true });
  }

  handleBlur = () => {
    if (this.state.hoverToolbar) {
      this.setState({ foucsEditor: false });
    } else {
      this.setState({ foucsEditor: false, showToolbar: false });
    }
  }

  hoverToolbarHandler = (value) => {
    if (this.state.foucsEditor) {
      this.setState({ hoverToolbar: value });
    } else {
      this.setState({ hoverToolbar: value, showToolbar: false });
    }
  }

  // 悬浮样式
  onMouseOver = () => {
    this.setState({ hoverEditor: true });
  }

  onMouseOut = () => {
    this.setState({ hoverEditor: false });
  }

  hovorStyle = () => {
    if (this.state.hoverEditor) {
      return { border: '0.005rem solid #6d6d6d' }
    } else {
      return {}
    }
  }

  modules = (quillId) => {
    return {
      toolbar: {
        container: "#" + quillId
      }
    }
  }

  render() {
    // TODO 规定长度，在靠屏幕左边时候左对齐，否则右对齐
    // const overlayStyle = {position: 'absolute', bottom: 5, left: 0, zIndex: 1300 }
    const { toolbarOverlayStyle = { bottom: 5, left: 0 },
      toolbarAbove = true,
      toolbarStyle
    } = this.props

    return (
      <div>
        {!this.readOnly && toolbarAbove &&
          <div style={{ position: 'relative' }}>
            <div hidden={!this.state.showToolbar} style={Object.assign({ position: 'absolute', zIndex: 300 }, toolbarOverlayStyle)}>
              <EditorToolbar formats={this.formats} toolbarStyle={this.props.toolbarStyle} id={this.quillId} hoverToolbar={this.hoverToolbarHandler} />
            </div>
          </div>
        }
        <div
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          style={this.hovorStyle()}>
          <ReactQuill
            onChange={this.handleChange}
            modules={this.modules(this.quillId)}
            formats={this.formats}
            theme={'snow'} // pass false to use minimal theme
            placeholder={"Write something"}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            ref={(el) => { this.reactQuillRef = el }}
            defaultValue={this.deltaDeltaValue}
            readOnly={this.readOnly}
          />
        </div>
        {!this.readOnly && !toolbarAbove &&
          <div style={{ position: 'relative' }}>
            <div hidden={!this.state.showToolbar} style={Object.assign({ position: 'absolute', zIndex: 300 }, toolbarOverlayStyle)}>
              <EditorToolbar toolbarStyle={toolbarStyle} id={this.quillId} hoverToolbar={this.hoverToolbarHandler} />
            </div>
          </div>
        }

      </div>

    );
  }
}


Editor.contextTypes = {
  store: PropTypes.object
};

export default Editor;

import React, { Component } from 'react';
// import Typography from 'material-ui/Typography';
import ContentEditable from 'react-contenteditable'
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import '../../css/customize.css'
// 文档: https://material-ui-next.com/customization/default-theme/?expend-path=$.typography

// 可以传入 props
// { content : {'好吃的东西'}, 
//   style: {{ textAlign: 'center', fontSize: 30, fontWeight: 500, color: "#1c1a1a" }}}


// 说明
// 对齐方式
// align: 'inherit', 'left', 'center', 'right', 'justify'
// content: "内容"
// styles
//   color 可以传入 rgb
//   fontSize
//   fontWeight
//   float    'left', 'center', 'right'
// 禁止可编辑 dom 的警告 https://github.com/gautamarora/fullstackjs-todos/commit/9e58c2fff3e79222d9857421a804abc0af857554
export default class EditableTextArea extends Component {
  constructor(props, context) {
    super(props);
    this.state = { hovered: false }
  }

  handleChange = (e) => {
    // TODO 增加更多编辑功能
    e.target.props = this.props

    let nestedKey = `${this.props.selfkey},props,content`
    this.context.store.dispatch({
      type: 'update',
      payload: { nestedKey: nestedKey, value: e.target.value },
      target: 'node',
    });
  }

  // emitChange: function(){
  //   var html = this.target.value;
  //   this.setState({html: html})
  // },

  hovorStyle = () => {
    if (this.state.hovered) {
      return { border: '0.005rem solid #6d6d6d', marginLeft: 20,  }
    }else{
      return {marginLeft: 20,}
    }
  }

  onMouseOver = () => {
    this.setState({ hovered: true });
  }

  onMouseOut = () => {
    this.setState({ hovered: false });
  }

  render() {
    // const style = { fontSize: 20, fontWeight: 900, color: "#1c1a1a", float: "center" }
    const { style, content } = this.props
    // TODO 用 ref 解决 editable 鼠标乱跳的问题
    // https://github.com/facebook/react/issues/2047
    return (
      <div>
        <div
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          style={this.hovorStyle()}>
          <div style={style}>
            <ContentEditable
              // style={{style}}
              placeholder={"填入内容..."}
              html={content} // innerHTML of the editable div
              disabled={false}       // use true to disable edition
              onChange={this.handleChange} // handle innerHTML change
            />
          </div>
        </div>
      </div>
    );
  }
}


EditableTextArea.contextTypes = {
  store: PropTypes.object
};





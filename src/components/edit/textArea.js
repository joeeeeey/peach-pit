import React, { Component } from 'react';
// import Typography from 'material-ui/Typography';
import ContentEditable from 'react-contenteditable'
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

// 文档: https://material-ui-next.com/customization/default-theme/?expend-path=$.typography
// text
//     频繁使用

// 可以传入 props
// 对齐方式
// align: 'inherit', 'left', 'center', 'right', 'justify'
// children: "内容"
// styles
//   color 可以传入 rgb
//   fontSize
//   fontWeight
//   float    'left', 'center', 'right'
// 禁止可编辑 dom 的警告 https://github.com/gautamarora/fullstackjs-todos/commit/9e58c2fff3e79222d9857421a804abc0af857554
export default class EditableTextArea extends Component {
  constructor(props, context) {
    super(props);
    this.state = { hovered: false}
  }

  handleChange = (e) => {
    // TODO 增加更多编辑功能
    e.target.props = this.props

    let nestedKey = `${this.props.selfkey},props,content`
    this.context.store.dispatch({
      type: 'update',
      payload: {nestedKey: nestedKey, value: e.target.value}
    });
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

  render() {
    // const style = { fontSize: 20, fontWeight: 900, color: "#1c1a1a", float: "center" }
    const {style, content} = this.props

    return (
      <div>
        <div
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          style={this.hovorStyle()}>
          <div style={style}>
            {/* <Grid item lg={12} md={12} sm={12} xs={12} > */}
              <ContentEditable
                html={content} // innerHTML of the editable div
                disabled={false}       // use true to disable edition
                onChange={this.handleChange} // handle innerHTML change
              />
            {/* </Grid> */}
          </div>
        </div>
      </div>
    );
  }
}


EditableTextArea.contextTypes = {
  store: PropTypes.object
};





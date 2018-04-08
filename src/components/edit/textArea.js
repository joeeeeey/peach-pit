import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import ContentEditable from 'react-contenteditable'

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
// 禁止可编辑 dom 的警告 https://github.com/gautamarora/fullstackjs-todos/commit/9e58c2fff3e79222d9857421a804abc0af857554
export default class EditableTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = { hovered: false, children: props.children}
  }

  handleChange = (e) =>{
    this.setState({children: e.target.value});
    e.target.location = "1,2,3,4"
    this.props.handler(e)
  }


  hovorStyle = () => {
    if (this.state.hovered) {
      return { border: '0.005rem solid #6d6d6d'}
    }
  }

  onMouseOver = () => {
    this.setState({ hovered: true });
  }

  onMouseOut = () => {
    this.setState({ hovered: false });
  }

  render() {
    const style = { fontSize: 20, fontWeight: 900, color: "#1c1a1a" }

    return (
      <div>
        <div
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          style={this.hovorStyle()}>
          {/* <Typography
          onInput={this.handleChange} 
          gutterBottom={true}
            // contentEditable="true"
            align={'center'}
            style={style}
            suppressContentEditableWarning={true}>
     
 fd
          </Typography> */}
          <div style={style}>
          <ContentEditable
    
              html={this.state.children} // innerHTML of the editable div
              disabled={false}       // use true to disable edition
              onChange={this.handleChange} // handle innerHTML change
            />          
          </div>

        </div>
      </div>
    );
  }
}







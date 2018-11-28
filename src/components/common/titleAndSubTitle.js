// 标题和副标题组成的组件
// 接受传入 titleContent, subTitleContent
import React, { Component } from "react";
import Typography from "material-ui/Typography"; // 规范字体

function defaltStyle() {
  return {
    titleStyle: { paddingTop: 20 },
    subTitleStyle: { paddingTop: 15 }
  };
}

export default class TitleAndSubTitle extends Component {
  render() {
    const style = this.props.style || defaltStyle();
    const { titleStyle } = style;
    const { subTitleStyle } = style;

    return (
      <div>
        <div style={titleStyle}>
          <Typography variant="headline" component="h2" gutterBottom>
            {this.props.titleContent}
          </Typography>
        </div>
        <div style={subTitleStyle}>
          <Typography variant="subheading" gutterBottom>
            {this.props.subTitleContent}
          </Typography>
        </div>
      </div>
    );
  }
}

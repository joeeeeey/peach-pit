// 可接受参数
// <FullWidthGrid
// containerConfig={spacing: 20, justify: 'space-around'}
// itemsConfig={lists: [], itemName: 'WebTemplateCard'}
// />

// container 参数, 用于控制其中的 Grid Items:
// containerConfig = {}
//   spacing: integer items间距, 8的倍数, 最大40
//   direction: string 方向(水平垂直) ["row", "row-reverse", "column"]
//   justify: string  对齐(在整个 container 的对齐) ["flex-start", "center", "flex-end", "space-between", "space-around"]
//   alignItems: string 排列(仅在 items 之间的相对排列) ["flex-start","center","flex-end","stretch","baseline"]

// item 参数:
// itemsConfig = {}
//   xs: integer 0px~600px 屏幕占比 xs/12
//   sm: integer 600px 屏幕占比  sm/12
//   md: integer 960px 屏幕占比 md/12
//   lg: integer 1280px 屏幕占比 lg/12
//   xl: integer 1920px 屏幕占比 xl/12
//     为适应 meterial-ui 定义的 breakpoints, 设置 md={5} sm={5} xs={11} 比较好
// itemName: 定义 gridItem 模板为哪个 itemName
// lists: 数据

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class ResponsiveCardGrid extends React.Component {
  render() {
    const {
      classes,
      containerConfig = {
        justify: "center",
        spacing: 16
      }
    } = this.props;
    const { justify, spacing } = containerConfig;

    return (
      <div className={classes.root}>
        <Grid container spacing={spacing} justify={justify}>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

ResponsiveCardGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResponsiveCardGrid);

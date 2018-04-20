// 纵向布局最外层是水平布局的 Grid
// 而子 Grid 里才是垂直
// Bug 无法在 layout 中被单独显示，因为在 componetDidMount 时候
// 父节点还未将 store 中的 nodeData 初始化完毕
// 是否可以更待父节点更新完 nodeData 中才调用 addNode

// 可传入 props
// children array
// flex  array
// background string


// {
//   native: false, nodeName: 'VerticalLayout',
//   props: null,
// }
// {"native":false,"nodeName":"VerticalLayout","props":{}}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

// Layout 的公共样式， 可以抽离
// 需要占据主屏幕 80% 位置左右两侧自动 margin
// TODO  padding top bottom 如何在屏幕变小时自动变小
const layoutStyle = { margin: '0 auto', width: '80%', flexGrow: 1, padding: '50px 0' }

const defalutFlexLayout = [8, 4]
export default class PreviewVerticalLayout extends Component {
  render() {
    // 如果没有 children, 那就用 addNode 方法给自己增加两个 children
    const {
      background = '#b1d3db',
      direction = 'row' } = this.props

    this.flex = this.props.flex || defalutFlexLayout

    return (
      <div style={{ background: background, position: 'relative' }}>
        <div style={layoutStyle}>
          {/* <div style={{ position: 'relative' }}> */}
            {/* <GridArrangementOptionLists handleRearrangeGird={this.handleRearrangeGird} /> */}
            <Grid container direction={direction} >
              {this.props.children &&
                React.Children.toArray(this.props.children).map((child, index) => {
                  return (
                    <Grid key={child.props.selfkey} item xs={12} sm={this.flex[index]} md={this.flex[index]} lg={this.flex[index]} xl={this.flex[index]}>
                      {child}
                    </Grid>
                  )
                })
              }
            </Grid>
          {/* </div> */}
        </div>
      </div>
    );
  }
}


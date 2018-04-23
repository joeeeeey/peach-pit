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
const layoutStyle = { margin: '0 auto', width: '84%', flexGrow: 1, padding: '50px 0' }

const defalutFlexLayout = [8, 4]

const defaultParallexStyle = {
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundRepeat: 'noRepeat',
  backgroundSize: 'cover',
}

export default class PreviewVerticalLayout extends Component {


  // 填充样式
  getBackgroundFillTypeStyle = (type, background) => {
    switch (type) {
      // 平铺
      case 'tile':
        return { background: background }
      // 拉伸
      case 'stretch':
        return { background: background + ' no-repeat', backgroundSize: '100% 100%' }
      // 填充 将整个图片都放入区域，不改变长宽比例，然后居中。需要手动计算设置长宽?
      case 'fill':
        return { background: background }
      default:
        return { background: background }
    }
  }
  // 视差样式
  getBackgroundParallexStyle = (enableParallex) => {
    if (enableParallex) {
      return defaultParallexStyle;
    } else { return {} }
  }


  render() {
    // 如果没有 children, 那就用 addNode 方法给自己增加两个 children
    // const {
    //   background = '#b1d3db',
    //   direction = 'row' } = this.props

    // this.flex = this.props.flex || defalutFlexLayout

    const { containerDirection = 'row' } = this.props

    const { backgroundInfo } = this.props
    // 有背景的 div props 约定
    // background backgroundType 必传
    const {
      background,
      backgroundType,
      // 背景是图片的时才需要的属性
      imageInfo,
      fillType,
      enableParallex,
    } = backgroundInfo


    this.flex = this.props.flex || defalutFlexLayout
    // 填充样式
    const backgroundFillTypeStyle = this.getBackgroundFillTypeStyle(fillType, background)
    // 视差效果
    const parallexStyle = backgroundType === 'image' ? this.getBackgroundParallexStyle(enableParallex) : {}
    const backgroundStyle = Object.assign({ position: 'relative' }, backgroundFillTypeStyle, parallexStyle)

    return (
      <div style={backgroundStyle}>
        <div style={layoutStyle}>
          <Grid container direction={containerDirection} >
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
        </div>
      </div>
    );
  }
}


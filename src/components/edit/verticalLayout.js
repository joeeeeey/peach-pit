// 纵向布局最外层是水平布局的 Grid
// 而子 Grid 里才是垂直
// Bug 无法在 layout 中被单独显示，因为在 componetDidMount 时候
// 父节点还未将 store 中的 nodeData 初始化完毕
// 是否可以更待父节点更新完 nodeData 中才调用 addNode

// {
//   native: false, nodeName: 'VerticalLayout',
//   props: null,
// }
// {"native":false,"nodeName":"VerticalLayout","props":{"asd": "sds"}}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import ChangeBackgroundButton from '../common/editTools/changeBackgroundButton'



const defaultChildren = [{
  native: false, nodeName: 'VerticalGrid'
}, { native: false, nodeName: 'VerticalGrid' }]


// Layout 的公共样式， 可以抽离
// 需要占据主屏幕 80% 位置左右两侧自动 margin
// TODO  padding top bottom 如果在屏幕变小时自动变小
const layoutStyle = { margin: '0 auto', width: '80%', flexGrow: 1, padding: '50px 0' }


const defalutFlexLayout = [8, 4]
export default class EditableVerticalLayout extends Component {
  // 可接受 props
  // spacing integer 控制子元素间距

  constructor(props, context) {
    super(props);
    this.state = { hovered: false }
  }
  // hovorStyle = () => {
  //   if (this.state.hovered) {
  //     return Object.assign({ border: '0.005rem solid #6d6d6d' }, layoutStyle)
  //   } else {
  //     return layoutStyle
  //   }
  // }

  componentDidMount() {
    if (this.props.children === null || this.props.children === undefined) {
      this.addDefaultChildren()
    }
  }

  addDefaultChildren = () => {
    for (let i = 0; i < defaultChildren.length; i++) {
      this.context.store.dispatch({
        type: 'addNode',
        payload: { targetKey: this.props.selfkey, nodeData: defaultChildren[i] },
        target: 'node',
      });
    }
  }

  removeNode = () => {
  }
  getChildContext() {
    return { store: this.context.store };
  }

  render() {
    // 如果没有 children, 那就用 addNode 方法给自己增加两个 children
    const {
      background = '#b1d3db',
      flex = defalutFlexLayout,
      direction = 'row' } = this.props

    // spacing 应用默认的 0, 而子元素的间距应在 verticalGrid 中践行调整
    // direction 可以是 row 或者 row-reverse

    return (
      <div id={this.props.selfkey} style={{ background: background, position: 'relative' }}>
        <ChangeBackgroundButton />
        <div style={layoutStyle}>
          <Grid container direction={direction} >
            {this.props.children &&
              this.props.children.map((child, index) => {
                return (
                  <Grid key={child.props.selfkey} item xs={12} sm={flex[index]} md={flex[index]} lg={flex[index]} xl={flex[index]}>
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

EditableVerticalLayout.childContextTypes = {
  store: PropTypes.object
};

EditableVerticalLayout.contextTypes = {
  store: PropTypes.object
};
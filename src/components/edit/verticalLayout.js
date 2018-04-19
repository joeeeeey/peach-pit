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

const defaultChildren = [{
  native: false, nodeName: 'VerticalGrid'
}, { native: false, nodeName: 'VerticalGrid' }]


// Layout 的公共样式， 可以抽离
// 需要占据主屏幕 80% 位置左右两侧自动 margin
// TODO  padding top bottom 如果在屏幕变小时自动变小
const layoutStyle = { margin: '0 auto', width: '80%', flexGrow: 1, padding: '40px 0' }


const defalutFlexLayout = [8, 4]
export default class EditableVerticalLayout extends Component {
  // 可接受 props
  // spacing integer 控制子元素间距

  constructor(props, context) {
    super(props);
    this.state = { hovered: false }

    this.flex = props.flex || defalutFlexLayout

  }
  hovorStyle = () => {
    if (this.state.hovered) {
      return Object.assign({ border: '0.005rem solid #6d6d6d' }, layoutStyle)
    } else {
      return layoutStyle
    }
  }

  onMouseOver = () => {
    this.setState({ hovered: true });
  }

  onMouseOut = () => {
    this.setState({ hovered: false });
  }

  componentDidMount() {
    if (this.props.children === null || this.props.children === undefined) {
      this.addDefaultChildren()
    }    
  }

  addDefaultChildren = () => {
    // this.flex = defalutFlexLayout

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
    // const { style } = this.props
    // const { children } = this.props

    return (
      <div
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        style={this.hovorStyle()}>
        <Grid container direction="row" >
          {this.props.children &&
            this.props.children.map((child, index) => {
              return (
                <Grid key={child.props.selfkey} item xs={12} sm={this.flex[index]} md={this.flex[index]} lg={this.flex[index]} xl={this.flex[index]}>
                  {child}
                </Grid>
              )
            })
          }
        </Grid>
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
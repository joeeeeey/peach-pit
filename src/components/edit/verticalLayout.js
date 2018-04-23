// 纵向布局最外层是水平布局的 Grid
// 而子 Grid 里才是垂直
// Bug 无法在 layout 中被单独显示，因为在 componetDidMount 时候
// 父节点还未将 store 中的 nodeData 初始化完毕
// 是否可以更待父节点更新完 nodeData 中才调用 addNode

// 可传入 props
// children array
// flex  array
// background string

// 原始代码段
// {
//   native: false, nodeName: 'VerticalLayout',
//     props: {
//       backgroundInfo: {
//         background: '#b1d3db',
//           backgroundType: 'pureColor',
//             imageInfo: { },
//         fillType: null,
//         enableParallex: null
//       }
//   }
// }
// {"native":false,"nodeName":"VerticalLayout","backgroundInfo":{"background":"#b1d3db","backgroundType":"pureColor"},"props":null}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import ChangeBackgroundButton from '../editTools/layout/changeBackgroundButton'
import GridArrangementOptionLists from '../editTools/layout/gridArrangementOptionLists'
import ArrayOper from '../../utils/arrOperation'


// Layout 的公共样式， 可以抽离
// 需要占据主屏幕 80% 位置左右两侧自动 margin
// TODO  padding top bottom 如何在屏幕变小时自动变小
const layoutStyle = { margin: '0 auto', width: '84%', flexGrow: 1, padding: '50px 0' }

const defaultChildren = {
  native: false, nodeName: 'VerticalGrid'
}

const defalutFlexLayout = [8, 4]

const defaultParallexStyle = {
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundRepeat: 'noRepeat',
  backgroundSize: 'cover',
}

export default class EditableVerticalLayout extends Component {
  // 可接受 props
  // spacing integer 控制子元素间距
  constructor(props, context) {
    super(props);
  }

  componentDidMount() {
    if (this.props.children === null || this.props.children === undefined) {
      this.flex = defalutFlexLayout
      this.addDefaultChildren()
    }
  }

  // 如果没有 children, 那就用 addNode 方法给自己增加两个 children
  // TODO 使用批量增加
  addDefaultChildren = () => {
    for (let i = 0; i < this.flex.length; i++) {
      this.context.store.dispatch({
        type: 'addNode',
        payload: { targetKey: this.props.selfkey, nodeData: defaultChildren },
        target: 'node',
      });
    }
  }

  getChildContext() {
    return { store: this.context.store };
  }

  // 重新布局，改变排列
  rearrangeChildren = (flex) => {
    if (ArrayOper.compare(flex, this.flex)) {
      return
    } else {
      if (flex.length === this.flex.length) {
        // 数量一致，只需要更新 flex 信息
        let nestedKey = `${this.props.selfkey},props,flex`
        this.context.store.dispatch({
          type: 'update',
          payload: { nestedKey: nestedKey, value: flex },
          target: 'node',
        })
      } else if (flex.length < this.flex.length) {
        // 减少了子元素个数, 默认从最后一个元素开始去除
        const reverseCount = this.flex.length - flex.length
        const reverseChildrenKeys = this.props.children.map(x => x.props.selfkey).reverse()

        let removeNodesPayload = []
        for (let i = 0; i < reverseCount; i++) {
          removeNodesPayload.push({ targetKey: reverseChildrenKeys[i], parentKey: this.props.selfkey })
        }
        let updateNodesPayload = [{ value: flex, nestedKey: `${this.props.selfkey},props,flex` }]

        const compositePayload = {
          payloadData: {
            removeNodes: { payloadData: removeNodesPayload },
            updateNodes: { payloadData: updateNodesPayload },
          }
        }

        this.context.store.dispatch({
          type: 'composite',
          payload: compositePayload,
          target: 'node',
        })


      } else {
        const increment = flex.length - this.flex.length
        let addNodesPayload = Array.from(Array(increment).keys()).map(
          x => { return { nodeData: defaultChildren, targetKey: this.props.selfkey } }
        )
        let updateNodesPayload = [{ value: flex, nestedKey: `${this.props.selfkey},props,flex` }]
        const compositePayload = {
          payloadData: {
            addNodes: { payloadData: addNodesPayload },
            updateNodes: { payloadData: updateNodesPayload },
          }
        }

        this.context.store.dispatch({
          type: 'composite',
          payload: compositePayload,
          target: 'node',
        })

      }
    }
    // flex => [4,4,4], [4,8], [8,4], [12],[4,4,2,2]
  }

  handleRearrangeGird = (flex) => {
    this.rearrangeChildren(flex)
  }

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
      <div id={this.props.selfkey} style={backgroundStyle}>
        <ChangeBackgroundButton backgroundInfo={backgroundInfo} parentkey={this.props.selfkey} />
        <div style={layoutStyle}>
          <div style={{ position: 'relative' }}>
            <GridArrangementOptionLists handleRearrangeGird={this.handleRearrangeGird} />
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
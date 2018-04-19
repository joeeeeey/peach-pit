// 纵向布局最外层是水平布局的 Grid
// 而子 Grid 里才是垂直
// Bug 无法在 layout 中被单独显示，因为在 componetDidMount 时候
// 父节点还未将 store 中的 nodeData 初始化完毕
// 是否可以更待父节点更新完 nodeData 中才调用 addNode

// {
//   native: false, nodeName: 'VerticalLayout',
//   props: null,
// }
// {"native":false,"nodeName":"VerticalLayout","props":{}}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import ChangeBackgroundButton from '../editTools/layout/changeBackgroundButton'
import GridArrangementOptionLists from '../editTools/layout/gridArrangementOptionLists'
import ArrayOper from '../../utils/arrOperation'

const defaultChildren = {
  native: false, nodeName: 'VerticalGrid'
}

// Layout 的公共样式， 可以抽离
// 需要占据主屏幕 80% 位置左右两侧自动 margin
// TODO  padding top bottom 如何在屏幕变小时自动变小
const layoutStyle = { margin: '0 auto', width: '80%', flexGrow: 1, padding: '50px 0' }

const defalutFlexLayout = [8, 4]
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

  addDefaultChildren = () => {
    for (let i = 0; i < this.flex.length; i++) {
      this.context.store.dispatch({
        type: 'addNode',
        payload: { targetKey: this.props.selfkey, nodeData: defaultChildren },
        target: 'node',
      });
    }
  }

  removeNode = () => {
  }
  getChildContext() {
    return { store: this.context.store };
  }

  // composite
  // payloadData => { addNodes: {payloadData: []}, removeNodes:  {payloadData: []} }
  // payloadData => [{nestedKey: nestedKey, value: value}] 
  // { payloadData: [{ nodeData: nodeData, targetKey: targetKey }]
  // payload 为 {payloadData: [{targetKey: targetKey, parentKey, parentKey}]
  // case 'composite':
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

  render() {
    // 如果没有 children, 那就用 addNode 方法给自己增加两个 children
    const {
      background = '#b1d3db',
      direction = 'row' } = this.props

    this.flex = this.props.flex || defalutFlexLayout
    // spacing 应用默认的 0, 而子元素的间距应在 verticalGrid 中践行调整

    this.children = this.props.children
    if (!Array.isArray(this.children) && this.children !== null && typeof this.children === 'object') {
      this.children = [this.children]
    }


    return (
      <div id={this.props.selfkey} style={{ background: background, position: 'relative' }}>
        <ChangeBackgroundButton parentkey={this.props.selfkey} />
        <div style={layoutStyle}>
          <div style={{ position: 'relative' }}>
            <GridArrangementOptionLists handleRearrangeGird={this.handleRearrangeGird} />
            <Grid container direction={direction} >
              {this.children &&
                this.children.map((child, index) => {
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
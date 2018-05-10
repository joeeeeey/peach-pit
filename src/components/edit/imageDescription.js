// const node = {
//   native: false,
//   nodeName: 'ImageDescription',
//   props: {
//   backgroundInfo: {
//     background: 'white',
//     backgroundType: 'pureColor',
//     imageInfo: {},
//     fillType: null,
//     enableParallex: null
//   },  
// column: 3,
//   },
//   children: [
// {
//   native: true, nodeName: 'div', children:
//     [
//       { native: false, nodeName: 'ImageArea', props: { src: "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6" } },
//       {
//         native: false,
//         nodeName: 'VerticalLayout',
//         props: {
//           backgroundInfo: {
//             background: 'white',
//             backgroundType: 'pureColor',
//             imageInfo: {},
//             fillType: null,
//             enableParallex: null
//           }
//         }
//       },
//     ]
// },
// {
//   native: true, nodeName: 'div', children:
//     [
//       { native: false, nodeName: 'ImageArea', props: { src: "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6" } },
//       {
//         native: false,
//         nodeName: 'VerticalLayout',
//         props: {
//           backgroundInfo: {
//             background: 'white',
//             backgroundType: 'pureColor',
//             imageInfo: {},
//             fillType: null,
//             enableParallex: null
//           }
//         }
//       },
//     ]
// },
//   ]
// }

// {"native":false,"nodeName":"ImageDescription","props":{"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null},"column":3},"children":[{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6"}},{"native":false,"nodeName":"VerticalLayout","props":{"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null}}}]},{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6"}},{"native":false,"nodeName":"VerticalLayout","props":{"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null}}}]}]}
import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import EditableImageArea from '../../components/edit/imageArea'
import EditableTextArea from '../../components/edit/textArea'
import EditableVerticalLayout from '../../components/edit/verticalLayout'
import backgroundSetting from '../../jssSettings/backgroundSetting'
import ChangeBackgroundButton from '../editTools/layout/changeBackgroundButton'
import AddImageDescriptionElementButton from '../editTools/imageDescription/addImageDescriptionElementButton'
import RemoveNodeSpirit from '../editTools/layout/removeNodeSpirit'


const RemoveNodeSpiritContainerStyle = { zIndex: 46, position: 'absolute', right: -15 }

const verticalCenterStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}


export default class EditableImageDescription extends React.Component {
  constructor(props, context) {
    super(props)

    const { column, children } = this.props
    const childrenArray = React.Children.toArray(children)
    const childrenKeys = childrenArray.map(x => x.props.children[0].props.selfkey)

    this.state = {
      column: column,
      flex: 12 / column,
      childrenKeys: childrenKeys,
      imageHeightInfo: {}, // {key1: 400, key2, 100}
    }


    const counts = childrenKeys.length
    const rows = Math.floor(counts / column) + ((counts % column) > 0 ? 1 : 0)

    let rowInfo = {}

    for (let i = 0; i < rows; i++) {
      childrenKeys.slice(i * column, ((i + 1) * column)).forEach(key => {
        this.state[`${key}Row`] = i + 1
        // this.state[`${key}IACS`] =  { minHeight: 0 } // 初始化 IACS
        rowInfo[i + 1] = rowInfo[i + 1] || []
        rowInfo[i + 1].push(key)
      });
    }
    
    this.state.rowInfo = rowInfo
  }

  componentDidMount = () => {
    // this.initState()
  }

  getChildrenKeys = () => {
    const { children } = this.props
    const childrenArray = React.Children.toArray(children)
    const childrenCounts = childrenArray.length
    // 取出子元素中的图片放入数组
    const childrenKeys = childrenArray.map(x => x.props.children[0].props.selfkey)
    return childrenKeys
  }

  initState = () => {
    const childrenKeys = this.getChildrenKeys()

    const childrenCounts = childrenKeys.length

    // 1. 初始化 IACS
    // IACS is short for 'ImageAreaContainerStyle'
    // 设置默认的 minHeight
    let state = this.state

    for (let i = 0; i < childrenCounts; i++) {
      const key = childrenKeys[i]
      state[`${key}IACS`] = state[`${key}IACS`] || { minHeight: 0 }
    }

    // 2. 计算记录每个元素位置
    // 行数 = 总数/列 的商 + 余数(大于 0 则是 1)
    const result = this.getRowStateAndInfo(childrenKeys)
    const { rowState, rowInfo } = result

    this.setState(Object.assign(rowState, state, { rowInfo: rowInfo }))
  }

  getRowStateAndInfo = (childrenKeys) => {
    const counts = childrenKeys.length
    const { column } = this.state
    const rows = Math.floor(counts / column) + ((counts % column) > 0 ? 1 : 0)

    // 重算
    let rowInfo = {}
    let rowState = {}

    for (let i = 0; i < rows; i++) {
      childrenKeys.slice(i * column, ((i + 1) * column)).forEach(key => {
        // {key1Row: 1, key2Row: 1}
        rowState[`${key}Row`] = i + 1
        // {1: [k1,k2], 2: [k3,k4]}
        rowInfo[i + 1] = rowInfo[i + 1] || []
        rowInfo[i + 1].push(key)
      });
    }

    return { rowState: rowState, rowInfo: rowInfo, rows: rows }
  }


  getChildContext() {
    return { store: this.context.store };
  }

  addElement = (selfKey, height) => {
    // 得到当前 childrenKeys imageHeightInfo 并去除这个元素
    let { childrenKeys, imageHeightInfo } = this.state
    childrenKeys.push(selfKey)
    imageHeightInfo[selfKey] = height

    // 重新计算行信息
    const result = this.getRowStateAndInfo(childrenKeys)
    const { rowState, rowInfo, rows } = result

    let updateInfo = Object.assign({}, rowState, {
      rowInfo: rowInfo,
      childrenKeys: childrenKeys,
      imageHeightInfo: imageHeightInfo,
    })

    Object.assign(updateInfo, this.redraw(rows, rowInfo, imageHeightInfo))

    this.setState(updateInfo)
  }

  // 回调自身所占高度
  reportHeight = (height, selfKey) => {
    if (window.screen.width <= 600) {
      let column = this.state.column

      let updateInfo = { column: 1 }
      if (column !== 1) {
        let childrenKeys = this.state.childrenKeys
        for (let i = 0; i < childrenKeys.length; i++) {
          const key = childrenKeys[i]
          updateInfo[`${key}IACS`] = { minHeight: 0 }
        }
      }
        
      this.setState(updateInfo)
    } else {
      this.setState({ column: this.props.column })

      if (!this.state[`${selfKey}Row`]) {
        // 找不到 selfkey, 说明是增加了元素
        // TODO 现在用这种方式检查增加子元素不是很好
        this.addElement(selfKey, height)
      } else {
        // 新方案
        const selfRow = this.state[`${selfKey}Row`]

        // => imageHeightInfo: {k1: 300, k2: 200}
        let imageHeightInfo = this.state.imageHeightInfo
        imageHeightInfo[selfKey] = height
        let rowInfo = this.state.rowInfo // => {1: [k1,k2,k3], 2: [k4]}
        let rowUpdateInfo = this.redraw(selfRow, rowInfo, imageHeightInfo)

        let updateInfo = Object.assign({}, rowUpdateInfo, { imageHeightInfo: imageHeightInfo })
        this.setState(updateInfo)

        console.log(height, selfKey)
      }
    }
  }

  // 重绘传入要重绘的行数和高度信息
  redraw = (row, rowInfo, imageHeightInfo) => {
    // 只要有图片的高度产生了变化，都会重新遍历这一层元素
    // 并且将最大的高度设为 minHeight
    let minHeight = 0
    const thisRowKeys = rowInfo[row] // => [k1,k2,k3]

    for (let i = 0; i < thisRowKeys.length; i++) {
      const key = thisRowKeys[i]
      if (imageHeightInfo[key] && imageHeightInfo[key] > minHeight) {
        minHeight = imageHeightInfo[key]
      }
    }
    // minHeight != 说明发生了改变，此时 setState
    if (minHeight !== 0) {
      let updateInfo = {}
      thisRowKeys.forEach(x => {
        updateInfo[`${x}IACS`] = { minHeight: minHeight }
      })

      // this.setState(updateInfo)
      return updateInfo
    } else {
      return {}
    }


  }

  deleteElement = (imageKey) => {
    // 得到当前 childrenKeys imageHeightInfo 并去除这个元素
    let { childrenKeys, imageHeightInfo } = this.state
    childrenKeys = childrenKeys.filter(x => x !== imageKey)
    delete imageHeightInfo[imageKey]

    // 重新计算行信息
    const result = this.getRowStateAndInfo(childrenKeys)
    const { rowState, rowInfo, rows } = result

    let updateInfo = Object.assign({}, rowState, {
      rowInfo: rowInfo,
      childrenKeys: childrenKeys,
      imageHeightInfo: imageHeightInfo,
    })

    // 对每行进行重绘
    for (let i = 1; i < rows + 1; i++) {
      Object.assign(updateInfo, this.redraw(i, rowInfo, imageHeightInfo))
    }

    this.setState(updateInfo)
  }

  render() {
    const { id = this.props.selfkey, backgroundInfo } = this.props

    const backgroundStyle = Object.assign({ position: 'relative' }, backgroundSetting.getBackgroundStyle(backgroundInfo))


    return (
      // <div style={{ background: 'white', marginTop: 20 }}>
      <div style={backgroundStyle} id={id}>
        <ChangeBackgroundButton fullWithChilren={this.props.fullWithChilren} backgroundInfo={backgroundInfo} parentkey={this.props.selfkey} />
        <Grid name="水平"
          container
          direction={'row'}
          justify={'center'}>

          {this.props.children &&
            React.Children.toArray(this.props.children).map((child, index) => {
              // 子元素的子元素
              const childChildren = child.props.children
              const imageProps = childChildren[0].props
              const verticalLayoutProps = childChildren[1].props
              const imageKey = imageProps.selfkey

              return (
                <Grid key={child.props.selfkey} item xs={12} sm={this.state.flex} md={this.state.flex} lg={this.state.flex} xl={this.state.flex}>
                  <div name="girdContainer" style={{ padding: '5%', position: 'relative' }}>
                    <div key='RemoveNodeSpritContainer' style={RemoveNodeSpiritContainerStyle}>
                      <RemoveNodeSpirit
                        parentkey={this.props.selfkey}
                        childrenkey={child.props.selfkey}
                        callBackValue={imageKey}
                        deleteCallback={this.deleteElement}
                      />
                    </div>
                    <div
                      name="imageAreaContanier"
                      style={Object.assign(
                        {},
                        this.state[`${imageKey}IACS`],
                        verticalCenterStyle)}
                    >
                      <EditableImageArea
                        hiddenDelete={true}
                        imageContainerStyle={{}}
                        noMeasure={false}
                        {...imageProps}
                        reportHeight={this.reportHeight}
                      />
                    </div>
                    <EditableVerticalLayout
                      {...verticalLayoutProps}
                    />
                  </div>

                </Grid>
              )
            })
          }
          {/* </Grid> */}
        </Grid>
        <AddImageDescriptionElementButton {...this.props} />
      </div>
    );
  }
}

EditableImageDescription.contextTypes = {
  store: PropTypes.object
};

EditableImageDescription.childContextTypes = {
  store: PropTypes.object
};

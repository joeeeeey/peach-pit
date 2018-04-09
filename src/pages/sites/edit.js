import React from 'react';
import PropTypes from 'prop-types';
// 转义
// import * as babel from 'babel-standalone';
// 此处需要引入所有可编辑组件
import AppBar from '../../components/common/layouts/appBar'
import FullWidthGrid from '../../components/common/grids/fullWidthGrid'
import EditableTextArea from '../../components/edit/textArea'

// const func = (function (React, Components) {
//   return function App() {
//     return (
//       <div>
//         {
//           React.createElement(
//             Components.AppBar,
//             null
//           )
//         }
//         {
//           React.createElement(
//             "h1",
//             null,
//             "Hello, world!")
//         }
//       </div>
//     )
//   }
// })
class Edit extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = { nodeData: null }
  }
  // 最适合取到数据的地方
  componentWillMount = () => {
    let nodeData = {
      native: true, nodeName: 'div', props: { style: { color: 'blue' } },
      children:
        [
          {
            native: true, nodeName: 'h1',
            props: { style: { color: "blue" } },
            children: "Hello World"
          },
          // {
          //   native: true, nodeName: 'h2',
          //   props: { style: { color: "green" } },
          //   children: "Hello World2"
          // },
          // {
          //   native: true, nodeName: 'h3',
          //   props: { style: { color: "black" } },
          //   children: "Hello World3"
          // },
          // { native: false, nodeName: 'AppBar', props: null },
          { native: false, nodeName: 'EditableTextArea', props: 
          { content: "发的所发生的", style: { fontSize: 30, fontWeight: 500, color: "#1c1a1a", float: "center" } } },
        ]
    }

    // 模拟向后端取数据
    setTimeout(() => {
      let ftData = this.flattenDomTree(nodeData)
      this.setState({ nodeData: ftData })
      this.context.store.dispatch({
        type: 'replace',
        payload: ftData
      });
    }, 1);
    // this.setState({ nodeData: this.flattenDomTree(nodeData)})
  }

  toF = (code) => {
    const func = new Function("React", "Components", `return ${code}`);
    // TODO ADD ALL components here
    const App = func(React, { AppBar: AppBar, EditableTextArea: EditableTextArea })
    return App
  }

  timer = () => {
    // this.state.nodeData['(0){div}(1){h2}'].nodeName = this.state.nodeData['(0){div}(1){h2}'].nodeName == 'h1' ? 'h2' : 'h1'
    this.context.store.dispatch({
      type: 'set',
      payload: this.flattenDomTree({
        native: true, nodeName: 'h1',
        props: { style: { color: "red" } },
        children: "Hello World2"
      })
    });
    // console.log(this.context.store.getState())
    // this.setState({ nodeData: this.context.store.getState() })
  }

  componentDidMount() {
    // after render
    this.context.store.subscribe(this.listener)
    // var intervalId = setInterval(this.timer, 5000);
  }

  listener = () => {
    let newState = this.context.store.getState();
    console.log("编辑页面监听到了 store 的变化")
    if (typeof newState === 'string') {
      return false
    }
    console.log('开始更新 node 树')
    this.setState({ nodeData: newState });

  }
  render = () => {
    // console.log(this.context.store)
    // console.log(this.state)
    // console.log(this.flattenedData2Code(this.state.nodeData))

    // console.log(this.flattenDomTree(store.getState()))
    // console.log(this.state.nodeData)
    return (
      <div>
        {this.toF(this.flattenedData2Code(this.state.nodeData))}
      </div>
    );
  }

  getChildContext() {
    return {store: this.context.store};
  } 

  // object 降维
  flattenDomTree = (nodeData, parentKey = '', flattenData = { _relation: {} }) => {
    if (!Array.isArray(nodeData) && nodeData !== null && typeof nodeData === 'object') {
      flattenData._root = `(0){${nodeData.nodeName}}`
      nodeData = [nodeData]
    }

    for (let i = 0; i < nodeData.length; i++) {
      let node = nodeData[i]
      let key = `${parentKey}(${i}){${node.nodeName}}`
      if (parentKey !== '') {
        let childrenKeys = flattenData._relation[parentKey]
        if (Array.isArray(childrenKeys) && childrenKeys.length > 0) {
          childrenKeys.push(key)
        } else {
          flattenData._relation[parentKey] = [key]
        }
      }
      let { children, ...value } = node;
      if (Array.isArray(children) && children.length > 0) {
        flattenData[key] = value
        flattenData = this.flattenDomTree(children, key, flattenData)
      } else {
        flattenData[key] = node
      }
    }
    return flattenData
  }

  // 降维数据转化为代码
  flattenedData2Code = (flattenData, selfDomKey = null, parentDomKey = 'root', code = "") => {
    if (flattenData === null) {
      return code;
    }
    if (selfDomKey === null) {
      selfDomKey = flattenData._root
    }
    let data = flattenData[selfDomKey]
    let tagName = data.native ? JSON.stringify(data.nodeName) : `Components.${data.nodeName}`

    let props = data.props
    if (props !== null && typeof props === 'object' && !Array.isArray(props)) {
      props.selfkey = selfDomKey
      props.parentkey = selfDomKey
    } else {
      props = { selfkey: selfDomKey, parentkey: parentDomKey }
    }
    props = JSON.stringify(props)
    let childrenNames = flattenData._relation[selfDomKey]
    let children = data.children
    let childrenCode = ""
    if (typeof children === 'string') {
      childrenCode += `,\n${JSON.stringify(children)}`
    } else if (Array.isArray(childrenNames) && childrenNames.length > 0) {
      for (let i = 0; i < childrenNames.length; i++) {
        childrenCode += this.flattenedData2Code(flattenData, childrenNames[i], selfDomKey, ",\n")
      }
    }

    code +=
      `React.createElement(
        ${tagName},
        ${props}${childrenCode}
    )`
    return code
  }
}

Edit.contextTypes = {
  store: PropTypes.object
};

Edit.childContextTypes = {
  store: PropTypes.object
};

export default Edit;
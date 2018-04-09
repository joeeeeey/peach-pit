import React from 'react';
// 转义
import * as babel from 'babel-standalone';
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
  constructor(props) {
    super(props);
    this.state = {nodeData: null}
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
          {
            native: true, nodeName: 'h2',
            props: { style: { color: "green" } },
            children: "Hello World2"
          },
          {
            native: true, nodeName: 'h3',
            props: { style: { color: "black" } },
            children: "Hello World3"
          },
          { native: false, nodeName: 'AppBar', props: null },
          { native: false, nodeName: 'EditableTextArea', props: {children: "发的所发生的", style: { fontSize: 30, fontWeight: 500, color: "#1c1a1a", float: "center" }} },
        ]
    }

    // 模拟向后端取数据
    setTimeout(() => {
      this.setState({ nodeData: this.flattenDomTree(nodeData)})
    }, 1);
    // this.setState({ nodeData: this.flattenDomTree(nodeData)})
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
  flattenedData2Code = (flattenData, selfDomKey = null, parentDomKey='root', code = "") => {
    if(flattenData===null){
      return code;
    }
    if(selfDomKey===null){
      selfDomKey = flattenData._root
    }
    let data = flattenData[selfDomKey]
    let tagName = data.native ? JSON.stringify(data.nodeName) : `Components.${data.nodeName}`
   
    let props = data.props
    if (props !== null && typeof props === 'object' && !Array.isArray(props)) {
      props.selfkey = selfDomKey
      props.parentkey = selfDomKey
    }else{
      props = {selfkey: selfDomKey, parentkey: parentDomKey}
    }
    props = JSON.stringify(props)
    let childrenNames = flattenData._relation[selfDomKey]
    let children = data.children
    let childrenCode = ""
    if(typeof children === 'string'){
      childrenCode += `,\n${JSON.stringify(children)}`    
    }else if(Array.isArray(childrenNames) && childrenNames.length > 0){
      for(let i = 0; i < childrenNames.length; i++ ){
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


  toF = (code) => {
    const func = new Function("React", "Components", `return ${code}`);
    // TODO ADD ALL components here
    const App = func(React, { AppBar: AppBar, EditableTextArea: EditableTextArea })
    return App
  }

  timer = () => {
    // setState method is used to update the state
    this.setState({ currentCount: this.state.currentCount + 1 });
    this.state.nodeData['(0){div}(1){h2}'].nodeName = this.state.nodeData['(0){div}(1){h2}'].nodeName == 'h1' ? 'h2' : 'h1'
    
    this.setState({ nodeData: this.state.nodeData })
  }

  componentDidMount() {
    // var intervalId = setInterval(this.timer, 1000);
  }

  render() {
    // console.log(this.state)
    // console.log(this.flattenedData2Code(this.state.nodeData))
    // <EditableTextArea children={this.state.children2} handler = {this.handler} />
    return (
      <div>
        {this.toF(this.flattenedData2Code(this.state.nodeData))}
      </div>
    );
  }
}

export default Edit;
import React from 'react';
// 转义
import * as babel from 'babel-standalone';
// 此处需要引入所有可编辑组件
import AppBar from '../../components/common/layouts/appBar'
import FullWidthGrid from '../../components/common/grids/fullWidthGrid'

function getTmpData() {
  //  TODO 数据从后端返回
  return [{
    native: true, nodeName: 'div', props: { style: { color: "blue" } },
    children:
      [
        { native: false, nodeName: 'AppBar', props: null },
        {
          native: true, nodeName: 'h1',
          props: { style: { color: "blue" } },
          children: "Hello World"
        },
        {
          native: false, nodeName: 'FullWidthGrid',
          props: {
            containerConfig: { spacing: 40, justify: 'space-around' },
            itemsConfig: {
              lists: [{ data: { content: "网页模板1", imgUrl: "IMG_7881.jpg", templateId: 1, }, key: 1 }],
              itemName: 'WebTemplateCard'
            }
          }
        }
      ]
  }]
}


// 递归将 dom 数据转化为 react 语法
function transfor(nodeData, code = '') {
  for (let i = 0; i < nodeData.length; i++) {
    let data = nodeData[i]
    let tagName = data.native ? JSON.stringify(data.nodeName) : `Components.${data.nodeName}`

    let props = data.props
    if (props !== null && typeof props === 'object') {
      props = JSON.stringify(props)
    }

    let children = data.children
    let childrenCode = ""
    if (Array.isArray(children) && children.length > 0) {
      childrenCode += transfor(children, ",\n")
    } else if (typeof children === 'string' || children instanceof String) {
      childrenCode = ",\n"
      childrenCode += JSON.stringify(children)
    }
    code +=
      `React.createElement(
          ${tagName},
          ${props}${childrenCode}
      )${(nodeData.length > 1 && i !== nodeData.length - 1) ? ',' : ''}`
  }

  return code
}
function assemblyCode() {
  return `function App() {
            return (
              ${transfor(getTmpData())}          
            );
          }`
}

// 组装后的代码
const babelCode = babel.transform(assemblyCode(), { presets: ['react', 'es2015'] }).code;
const code = babelCode.replace('"use strict";', "").trim();

// 用 new Function, return function 的方式形成闭包，来完成 eval 字符串效果
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function
// 为何么不直接 eval string 呢?
// TODO 弄清楚, 目前 eval 会出现无法取到变量的情况，与在终端中行为似乎不一致

const func = new Function("React", "Components", `return ${code}`);
const App = func(React, { AppBar: AppBar, FullWidthGrid: FullWidthGrid })
export default App;

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

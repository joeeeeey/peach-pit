import React from 'react';
import PropTypes from 'prop-types';
import nodeOperation from '../../share/nodeOperation'
// 转义
// import * as babel from 'babel-standalone';
// 此处需要引入所有可编辑组件
import AppBar from '../../components/common/layouts/appBar'
import FullWidthGrid from '../../components/common/grids/fullWidthGrid'

import EditableRoot from '../../components/edit/root'
import EditableTextArea from '../../components/edit/textArea'
import EditableLetfRightGrid from '../../components/edit/letfRightGrid'
import EditableCard from '../../components/edit/card'
import EditableCardMedia from '../../components/edit/cardMedia'

import EditableVerticalGrid from '../../components/edit/verticalGrid'
import EditableGridList from '../../components/edit/gridList'
import EditableGridListTile from '../../components/edit/gridListTile'
import EditableFullWidthGrid from '../../components/edit/fullWidthGrid'

// Preview components in other views
import PreviewRoot from '../../components/preview/root'
import PreviewTextArea from '../../components/preview/textArea'
import PreviewLetfRightGrid from '../../components/preview/letfRightGrid'
import PreviewCard from '../../components/preview/card'
import PreviewCardMedia from '../../components/preview/cardMedia'


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

// flattenedData2Code(flattenData, selfDomKey = null, parentDomKey = 'root', code = "", isEdit = true)
class Edit extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = { nodeData: null }
  }
  // 最适合取到数据的地方
  componentWillMount = () => {
    let nodeData = {
      native: false, nodeName: 'Root',
      children:
        [
          {
            native: false, nodeName: 'LetfRightGrid',
            children: [
              { native: false, nodeName: 'TextArea', props: { content: '好吃的东西', style: { textAlign: 'center', fontSize: 30, fontWeight: 500, color: "#1c1a1a" }, } },
              { native: false, nodeName: 'TextArea', props: { content: '就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。啊啊 啊啊啊啊啊啊啊啊', style: { textAlign: 'center', fontSize: 20, fontWeight: 400, color: "#1c1a1a", float: "center" } } },
    
              {
                native: false, nodeName: 'Card', props: { style: { maxWidth: 'auto', marginLeft: 20 } },
                children: [{ native: false, nodeName: 'CardMedia', props: { style: { height: 280 }, image: "/images/ORG_DSC01034.jpg" } }]
              },
    
            ]
          },          
          // {
          //   native: false, nodeName: 'GridList',
          //   props: {
          //     style: {
          //       root: {
          //         display: 'flex',
          //         flexWrap: 'wrap',
          //         justifyContent: 'space-around',
          //         overflow: 'hidden',
          //       },
          //       gridList: {
          //         width: 500,
          //         height: 'auto',
          //       }
          //     },
          //     cellHeight: 200,
          //     cols: 3
          //   },
          //   children: [
          //     {
          //       native: false, nodeName: 'GridListTile',
          //       props: {
          //         img: '/images/ORG_DSC01101.jpg',
          //         title: 'Image',
          //         cols: 1,
          //         rows: 1
          //       }
          //     },           
          //   ]
          // },

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
          // {
          //   native: false, nodeName: 'TextArea', props:
          //     {
          //       content: "发的所发生的", style:
          //         { fontSize: 30, fontWeight: 500, color: "#1c1a1a", float: "center" }
          //     }
          // },
          // {
          //   native: false, nodeName: 'VerticalGrid', props: { style: {} },
          //   children: [
          //     {
          //       native: false, nodeName: 'TextArea', props:
          //         {
          //           content: "hello1", style:
          //             { textAlign: 'center', fontSize: 30, fontWeight: 500, color: "#1c1a1a", float: "center" }
          //         }
          //     },
          //     {
          //       native: false, nodeName: 'TextArea', props:
          //         {
          //           content: "hello2", style:
          //             { fontSize: 30, fontWeight: 500, color: "#1c1a1a", float: "center" }
          //         }
          //     }
          //   ]
          // }
        ]
    }

    // 模拟向后端取数据
    setTimeout(() => {
      let ftData = nodeOperation.flattenDomTree(nodeData)
      // console.log(ftData)
      this.setState({ nodeData: ftData })
      this.context.store.dispatch({
        type: 'replace',
        payload: ftData
      });
    }, 1);
  }

  toF = (code) => {
    const func = new Function("React", "Components", `return ${code}`);
    // TODO ADD ALL components here
    const App = func(React, {
      AppBar: AppBar,
      EditableRoot: EditableRoot,
      EditableTextArea: EditableTextArea,
      EditableVerticalGrid: EditableVerticalGrid,
      EditableGridList: EditableGridList,
      EditableGridListTile: EditableGridListTile,
      EditableFullWidthGrid: EditableFullWidthGrid,
      EditableLetfRightGrid: EditableLetfRightGrid,
      EditableCard: EditableCard,
      EditableCardMedia: EditableCardMedia,      
      PreviewRoot: PreviewRoot,
      PreviewTextArea: PreviewTextArea,
      PreviewLetfRightGrid: PreviewLetfRightGrid,
      PreviewCard: PreviewCard,
      PreviewCardMedia: PreviewCardMedia,      
    })
    return App
  }

  timer = () => {
    // this.state.nodeData['(0){div}(1){h2}'].nodeName = this.state.nodeData['(0){div}(1){h2}'].nodeName == 'h1' ? 'h2' : 'h1'
    // this.context.store.dispatch({
    //   type: 'set',
    //   payload: nodeOperation.flattenDomTree({
    //     native: true, nodeName: 'h1',
    //     props: { style: { color: "red" } },
    //     children: "Hello World2"
    //   })
    // });
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
    // flattenedData2Code(flattenData, selfDomKey = null, parentDomKey = 'root', code = "", isEdit = true)
    // console.log(nodeOperation.flattenedData2Code(this.state.nodeData))
    return (
      <div>
        {this.toF(nodeOperation.flattenedData2Code(this.state.nodeData, false, null, 'root', ''))}
        {this.toF(nodeOperation.flattenedData2Code(this.state.nodeData))}
      </div>
    );
  }

  getChildContext() {
    return { store: this.context.store };
  }
}

Edit.contextTypes = {
  store: PropTypes.object
};

Edit.childContextTypes = {
  store: PropTypes.object
};

export default Edit;
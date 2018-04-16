import React from 'react';
import PropTypes from 'prop-types';
import nodeOperation from '../../utils/nodeOperation'

// 转义
// import * as babel from 'babel-standalone';
// 此处需要引入所有可编辑组件
// import AppBar from '../../components/common/layouts/appBar'
// import FullWidthGrid from '../../components/common/grids/fullWidthGrid'

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
    this.state = { nodeData: null, isPreview: false, editInfo: {} }
  }

  getSourceFromUrl = () => {
    try {
      const urlParams = new URL(window.location.href)
      const source = urlParams.searchParams.get('source')
      if (source.toString() !== 'null') {
        return {source: source, id: urlParams.searchParams.get('id')}
      } else {
        return {source: null}
      }      
    } catch (error) {
      alert('出现异常')
      return {source: null}
    }
  }

  getRoleNameFromStore = (store) => {
    const userState = store.getState().user
    const adminState = store.getState().administrator
    if (userState && userState.isLogin) {
      return 'user'
    } else if (adminState && adminState.isLogin) {
      return 'admin'
    } else {
      return 'unknown' 
    }
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

    // 根据`当前用户角色` 和 `资源` 初始化编辑页信息
    const source = this.getSourceFromUrl()
    let role= {role: this.getRoleNameFromStore(this.context.store)}

    const editInfo = Object.assign({}, source, role)
    this.setState({editInfo: editInfo})
    this.context.store.dispatch({
      type: 'replace',
      payload: editInfo,
      target: 'editInfo',
    });    

    // 模拟向后端取数据
    setTimeout(() => {
      let ftData = nodeOperation.flattenDomTree(nodeData)
      this.setState({ nodeData: ftData })
      this.context.store.dispatch({
        type: 'replace',
        payload: ftData,
        target: 'node',
      });
    }, 1);
  }

  toF = (code) => {
    const func = new Function("React", "Components", `return ${code}`);
    // TODO ADD ALL components here
    const App = func(React, {
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
  }

  componentDidMount() {
    this.context.store.subscribe(this.listener)
  }

  listener = () => {
    console.log('编辑页面间听到了 store  变化')
    // 此处监听 store 的变化，只要发生了 dispatch 就都会被监听到
    let {node, user} = this.context.store.getState()

    if (typeof node === 'string') {
      return false
    }
    // console.log('开始更新 node 树')
    this.setState({ nodeData: node, isPreview: user.isPreview});

  }
  render = () => {
    // console.log(nodeOperation.flattenedData2Code(this.state.nodeData))
    return (
      <div>
        {this.toF(nodeOperation.flattenedData2Code(this.state.nodeData, 'edit'))}

        {this.state.isPreview ? this.toF(nodeOperation.flattenedData2Code(this.state.nodeData, 'preview')) : null}
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
import React from 'react';
import PropTypes from 'prop-types';
import nodeOperation from '../../utils/nodeOperation'
import BlockService from '../../services/blockService'

// 转义
// import * as babel from 'babel-standalone';
// 此处需要引入所有可编辑组件
import EditableRoot from '../../components/edit/root'
import EditableTextArea from '../../components/edit/textArea'
import EditableLetfRightGrid from '../../components/edit/letfRightGrid'
import EditableCard from '../../components/edit/card'
import EditableCardMedia from '../../components/edit/cardMedia'

import EditableVerticalGrid from '../../components/edit/verticalGrid'
import EditableGridList from '../../components/edit/gridList'
import EditableGridListTile from '../../components/edit/gridListTile'
import EditableFullWidthGrid from '../../components/edit/fullWidthGrid'
import EditableVerticalLayout from '../../components/edit/verticalLayout'
import EditableImageArea from '../../components/edit/imageArea'

// Preview components in other views
// import PreviewRoot from '../../components/preview/root'
// import PreviewTextArea from '../../components/preview/textArea'
// import PreviewLetfRightGrid from '../../components/preview/letfRightGrid'
// import PreviewCard from '../../components/preview/card'
// import PreviewCardMedia from '../../components/preview/cardMedia'

// 测试的组件 
import Test from '../test'

const blockService = new BlockService()
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
    this.state = { nodeData: null, isPreview: false }
  }

  getSourceFromUrl = () => {
    try {
      const urlParams = new URL(window.location.href)
      const source = urlParams.searchParams.get('source')
      if (source.toString() !== 'null') {
        return { source: source, id: urlParams.searchParams.get('id') }
      } else {
        return { source: null }
      }
    } catch (error) {
      alert('出现异常')
      return { source: null }
    }
  }

  getRoleNameFromStore = (store) => {
    const userState = store.getState().user
    const adminState = store.getState().administrator
    if (userState && userState.isLogin) {
      return 'user'
    } else if (adminState && adminState.isLogin) {
      return 'administrator'
    } else {
      return 'unknown'
    }
  }

  // 最适合取到数据的地方
  componentDidMount = () => {
    // 根据`当前用户角色` 和 `资源` 初始化编辑页信息
    const source = this.getSourceFromUrl()
    let role = { role: this.getRoleNameFromStore(this.context.store) }

    const editInfo = Object.assign({}, source, role)

    this.context.store.dispatch({
      type: 'replace',
      payload: editInfo,
      target: 'editInfo',
    });

    if(editInfo.source){
      blockService.getNodeDataInEditInfo(editInfo)
      .then(response => {
        const { data } = response
        // console.log(data)
        if (data.code === 0) {
          this.initialNodeData(data.data)
        } else {
          console.log(data.msg)
        }
      })
      .catch(function (error) {
        console.log(error.msg)
      });
    }else{
      this.initialNodeData()
    }
    this.unsubscribe = this.context.store.subscribe(this.listener)
  }

  listener = () => {
    console.log('编辑页面间听到了 store  变化')
    // 此处监听 store 的变化，只要发生了 dispatch 就都会被监听到
    let { node, user } = this.context.store.getState()

    if (typeof node === 'string') {
      return false
    }
    // console.log('开始更新 node 树')
    this.setState({ nodeData: node, isPreview: user.isPreview });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  initialNodeData(block){
    let ftData = nodeOperation.flattenDomTree(this.wrapRoot(block))
    // console.log(JSON.parse(block.data))
    // let ftData = nodeOperation.flattenDomTree(ftData)
    console.log(ftData)
    this.setState({ nodeData: ftData })
    this.context.store.dispatch({
      type: 'replace',
      payload: ftData,
      target: 'node',
    });

    // TODO setState after dispatch
  }

  // {nodeName: 'div', children: []}
  wrapRoot = (block=null) => {
    if (block) {
      const domString = block.data
      const domData = JSON.parse(domString)
      return { native: false, nodeName: 'Root', children: domData.children }

    } else {
      return { native: false, nodeName: 'Root', children: [] }
    }


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
      EditableVerticalLayout: EditableVerticalLayout,
      EditableImageArea: EditableImageArea,
    })
    return App
  }

  timer = () => {
  }

  render = () => {
    // console.log(this.state.nodeData)
    return (
      <div>
        {this.toF(nodeOperation.flattenedData2Code(JSON.parse(JSON.stringify(this.state.nodeData)), 'edit'))}
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
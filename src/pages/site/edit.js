import React from 'react';
import PropTypes from 'prop-types';
import nodeOperation from '../../utils/nodeOperation'
import BlockService from '../../services/blockService'
import UpyunService from '../../services/upyunService'

// 转义
// import * as babel from 'babel-standalone';
// 此处需要引入所有可编辑组件
import EditableRoot from '../../components/edit/root'
import EditableTextArea from '../../components/edit/textArea'
import EditableVerticalLayout from '../../components/edit/verticalLayout'
import EditableVerticalGrid from '../../components/edit/verticalGrid'
import EditableImageArea from '../../components/edit/imageArea'
import EditableNavBar from '../../components/edit/navBar'
import EditablePhotoGallery from '../../components/edit/photoGallery'
import EditableImageDescription from '../../components/edit/imageDescription'

// 测试的组件 
// import Test from '../test'
const upyunService = new UpyunService()
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

  // 获取 '调用得到已上传的图片' 参数
  // role 是用户则将所有 sites 上传的图片都找出
  // admin 只找出当前 source id 
  getShowUploadedImageParams = (sourceInfo, role) => {
    const { source, id } = sourceInfo
    let sourceId = null
    let traversal = null
    if (role === 'user') {
      sourceId = ''
      traversal = true
    } else {
      traversal = false
      sourceId = id || 'tmp'
    }

    return {
      page: 'editPage',
      role: role,
      source: source || 'layout',
      sourceId: sourceId,
      traversal: traversal
    }
  }

  setEditInfoState = (editInfo) => {
    this.context.store.dispatch({
      type: 'replace',
      payload: editInfo,
      target: 'editInfo',
    });
  }

  // 最适合取到数据的地方
  componentDidMount = () => {
    // 根据`当前用户角色` 和 `资源` 初始化编辑页信息
    const sourceInfo = this.getSourceFromUrl()
    const role = this.getRoleNameFromStore(this.context.store)
    const roleInfo = { role: role }
    let editInfo = Object.assign({}, sourceInfo, roleInfo)

    let params = this.getShowUploadedImageParams(editInfo, role)
    this.setEditInfoState(editInfo)
    upyunService.showUploadedFiles(params)
      .then(response => {
        const { data } = response
        if (data.code === 0) {
          editInfo.uploadedImages = data.data.imageFiles
          this.setEditInfoState(editInfo)
        }
      })
      .catch((error) => {
        console.error(`获取已上传的图片出现异常: ${error}`)
      });

    if (editInfo.source) {
      blockService.getNodeDataInEditInfo(editInfo)
        .then(response => {
          const { data } = response
          // console.log(data)
          if (data.code === 0) {
            this.initialNodeData(data.data)
          } else {
            console.warn(data.msg)
          }
        })
        .catch(function (error) {
          console.warn(error)
        });
    } else {
      this.initialNodeData()
    }
    this.unsubscribe = this.context.store.subscribe(this.listener)
  }

  listener = () => {
    // console.log('编辑页面监听到了 store  变化')
    // 此处监听 store 的变化，只要发生了 dispatch 就都会被监听到
    let { node, user } = this.context.store.getState()

    if (typeof node === 'string') {
      return false
    }

    this.setState({ nodeData: node, isPreview: user.isPreview });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  initialNodeData(block) {
    let ftData = nodeOperation.flattenDomTree(this.wrapRoot(block))
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
  wrapRoot = (block = null) => {
    return nodeOperation.wrapRoot(block)
  }

  toF = (code) => {
    const func = new Function("React", "Components", `return ${code}`);
    // TODO ADD ALL components here
    const App = func(React, {
      EditableRoot: EditableRoot,
      EditableTextArea: EditableTextArea,
      EditableVerticalGrid: EditableVerticalGrid,
      EditableVerticalLayout: EditableVerticalLayout,
      EditableImageArea: EditableImageArea,
      EditableNavBar: EditableNavBar,
      EditablePhotoGallery: EditablePhotoGallery,
      EditableImageDescription: EditableImageDescription,
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
// edit 根节点 
// 显示最高权限的编辑器
// preview 其实是个空 div
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import nodeOperation from '../../utils/nodeOperation'
// 侧边栏以及 appbar
import { Layout, Menu, Icon, Popover, Divider, message } from 'antd';

// 插入节点代码
import InsertNodeCodeDialog from '../editTools/sidebar/insertNodeCodeDialog'
// 保存到新的板块
import SaveToNewBlockDialog from '../editTools/sidebar/saveToNewBlockDialog'
// 更新模板按钮
import UpdateTemplateButton from '../editTools/sidebar/updateTemplateButton'
// 更新样式按钮
import UpdateLayoutButton from '../editTools/sidebar/updateLayoutButton'
// 更新网站按钮
import UpdateSiteButton from '../editTools/sidebar/updateSiteButton'
// 部署网站按钮
import DeploySiteButton from '../editTools/sidebar/deploySiteButton'
// 顶层样式操作模板
import TopLevelMenuItem from '../editTools/sidebar/topLevelMenuItme'
// 布局列表气泡卡片
import LayoutsListPopover from '../editTools/sidebar/layoutsListPreviewPopover'

import TemplateService from '../../services/templateService'
import LayoutService from '../../services/layoutService'
import SiteService from '../../services/siteService'
import DeployService from '../../services/deployService'
// import Test from '../../pages/test'




const layoutService = new LayoutService()
const templateService = new TemplateService()
const deployService = new DeployService()
const siteService = new SiteService()
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const buttonStyle = { color: 'white', width: '100%', justifyContent: 'left' }
class EditableRoot extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      openPreview: false,
      editInfo: context.store.getState().editInfo,   // {source: "das", id: "32", role: "admin"}
      layouts: [], // 可选择加入的样式
    }
    this.navbar = []
  }

  // 获得顶层元素 key，来加载侧边栏 layout
  getRootChildrenKey = () => {
    if (this.context.store.getState().node) {
      const rootKey = this.props.selfkey
      if (rootKey) {
        return this.context.store.getState().node._relation[rootKey]
      } else {
        return []
      }
    } else {
      return []
    }
  }
  // 获得顶层元素 
  getRootChildren = () => {
    const keys = this.getRootChildrenKey()
    if (keys && keys.length > 0) {
      return keys.map(key => {
        const { layoutName, props } = this.context.store.getState().node[key]
        return {
          id: props.id,
          name: layoutName,
          layoutName: layoutName,
          sectionKey: key,
        }
      })
    } else {
      return []
    }
  }

  layoutPreView = (thumbnailUrl) => {
    return (
      <div style={{ width: 300, overflow: 'auto' }}>
        <img
          style={{ maxWidth: '100%' }}
          src={thumbnailUrl || "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/ee6abd28bece31864a13b934fdbda223"}
          alt={'layout_thumb'}
        />
      </div>
    )
  }

  insertNodeCodeButton = () => {
    return (
      <Menu.Item key="insertNodeCodeButton">
        <InsertNodeCodeDialog />
      </Menu.Item>
    )
  }

  saveToNewBlockButton = () => {
    return (
      <Menu.Item key="saveToNewBlockButton">
        <SaveToNewBlockDialog />
      </Menu.Item>
    )
  }

  // 部署按钮
  deploySiteButton = () => {
    return (
      <Menu.Item key="deploySiteButton">
        <DeploySiteButton style={buttonStyle} />
      </Menu.Item>
    )
  }


  updateTemplateButton = () => {
    return (
      <Menu.Item key="updateTemplateButton">
        <UpdateTemplateButton style={buttonStyle} />
      </Menu.Item>
    )
  }

  updateLayoutButton = () => {
    return (
      <Menu.Item key="updateLayoutButton">
        <UpdateLayoutButton style={buttonStyle} />
      </Menu.Item>
    )
  }

  updateSiteButton = () => {
    return (
      <Menu.Item key="updateSiteButton">
        <UpdateSiteButton style={buttonStyle} />
      </Menu.Item>
    )
  }

  // 根据用户 和 资源 生成保存按钮
  saveBlockButton = () => {
    const { role, source, id } = this.state.editInfo
    if (role === 'administrator') {
      if (source === 'template') {
        return this.updateTemplateButton()
      } else if (source === 'layout') {
        return this.updateLayoutButton()
      }
    }
  }

  clearNodeButton = () => {
    return (
      <Menu.Item key="clearNodeButton">
        <Button color="secondary" onClick={this.clearNode} style={buttonStyle}>
          清空节点
        </Button>
      </Menu.Item>
    )
  }

  clearNode = () => {
    const rootKey = this.props.selfkey
    this.context.store.dispatch({
      type: 'removeNode',
      payload: { targetKey: rootKey, parentKey: null },
      target: 'node',
    });
  }

  removeNode = (targetKey) => {
    let compositePayload = {
      payloadData: {
        removeNodes: { payloadData: [{ targetKey: targetKey, parentKey: this.props.selfkey }] },
      }
    }
    const updateNodesPayload = this.updateRootStyle('removeNode', this.context.store.getState().node[targetKey])

    if (updateNodesPayload) {
      compositePayload.payloadData.updateNodes = updateNodesPayload
    }

    this.context.store.dispatch({
      type: 'composite',
      payload: compositePayload,
      target: 'node',
    })
  }

  // 如果是导航栏或者其他会影响整个页面 padding margin 的 node 有变化(增删)，需要更新 root 的样式
  // example:  {affectRoot :{'paddingTop': 64}}
  updateRootStyle = (operation, node) => {
    if (operation === 'addNode') {
      if (node.nodeName === 'NavBar') {
        const affectRoot = node.props.affectRoot
        if (affectRoot) {
          let updateNodesPayload = []
          for (let a in affectRoot) {
            updateNodesPayload.push({
              value: affectRoot[a],
              nestedKey: `${this.props.selfkey},props,style,${a}`
            })
          }
          return { payloadData: updateNodesPayload }
        } else {
          return null
        }
      } else {
        return null
      }
    } else if (operation === 'removeNode') {
      if (node.nodeName === 'NavBar') {
        const affectRoot = node.props.affectRoot
        let updateNodesPayload = []
        for (let a in affectRoot) {
          updateNodesPayload.push({
            value: 0, // TODO 最好的方式是判断是字符串还是数字, 数字就减，字符变为 null
            nestedKey: `${this.props.selfkey},props,style,${a}`
          })
        }
        return { payloadData: updateNodesPayload }
      } else {
        return null
      }
    }
  }

  // 顶层版面的新增节点方法
  // 新增内容为 layout 对象
  //    新增时, 需要给这个 layout 对象的 props 增加一个新的 uniq id 
  //    若为非复合样式(指有代码文件映射这个 layout)， 每个存在数据
  //    库的 node 都会被一个仅为替代 _root 的 div 包裹, 而 div 
  //    下肯定只会有一个子元素
  // 
  // 复合样式则直接将整个 div 当成是应该加入的 layout 对象
  addNode = (nodeData, layoutName) => {
    nodeData = JSON.parse(nodeData)
    let compositePayload = null
    // 复合样式的情况
    if (nodeData.composite) {
      let compositelayoutId = Math.random().toString().slice(2, 10)
      nodeData.props.id = compositelayoutId
      nodeData.layoutName = layoutName
      let addNodesPayload = [
        { nodeData: nodeData, targetKey: this.props.selfkey }
      ]

      compositePayload = {
        payloadData: {
          addNodes: { payloadData: addNodesPayload },
        }
      }

    } else {
      // number of nodeData children should be 1
      let chilrenData = nodeData.children
      let addNodesPayload = chilrenData.map(
        x => {
          x.props.id = x.props.id ? x.props.id : nodeOperation.incryptKey(layoutName)
          x.layoutName = layoutName
          return {
            nodeData: x, targetKey: this.props.selfkey
          }
        }
      )

      compositePayload = {
        payloadData: {
          addNodes: { payloadData: addNodesPayload },
        }
      }
      // 根据是否有 navbar 来更新 root 样式 TODO 优化适应更多情况
      const updateNodesPayload = this.updateRootStyle('addNode', chilrenData[0])
      if (updateNodesPayload) {
        compositePayload.payloadData.updateNodes = updateNodesPayload
      }
    }

    this.context.store.dispatch({
      type: 'composite',
      payload: compositePayload,
      target: 'node',
    })
  }


  // 测试代码生成的功能，应该由后端完成
  // TODO Do it at Backend 
  download = (text, name, type) => {
    const a = document.getElementById("a");
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
  }

  // 该方法若是放在子元素中调用
  // window.open(url, '_blank') 始终返回 null
  // 只能用 settimeout 和判断 解决，但这样会变成弹窗，容易被浏览器拦截 https://stackoverflow.com/questions/3923321/ie7-window-open-when-focus-return-null
  // 所有还是将代码放在此处 TODO FIX THIS PROBLEM
  preview = () => {
    if (this.state.editInfo.source) {
      const { source, id, role } = this.state.editInfo
      // update node
      switch (source) {
        case 'layout':
          this.service = layoutService
          break;
        case 'template':
          this.service = templateService
          break;
        case 'site':
          this.service = siteService
          break;
        default:
          break;
      }
      let parmas = {
        id: id,
      }
      let nodeData = JSON.parse(JSON.stringify(this.context.store.getState().node));
      parmas.data = JSON.stringify(nodeOperation.heightenDomTree(nodeData))

      this.service.update(parmas)
        .then(response => {
          const { data } = response
          if (data.code === 0) {
            const url = `/${role}/previewPage?source=${source}&id=${id}`
            // 打开新页面
            const win = window.open(url, '_blank');
            win.focus();
          } else {
            message.error(`😥 ${data.msg}, 更新出现异常`, 2)
          }
        })
        .catch(function (error) {
          message.error(`😥 出现异常:, 请设置浏览器允许该网站弹窗哦`, 2)
        });
    } else {

    }
  }

  getChildContext() {
    return { store: this.context.store };
  }

  initSidebarChoosenLayouts = () => {
    const params = { limit: 10000, currentPage: 1 }

    layoutService.getAllLayouts(params, this.context.store.getState().editInfo)
      .then(response => {
        const { data } = response
        if (data.code === 0) {
          this.setState({ layouts: data.data.records })
        } else {
          console.warn(`获取样式失败: ${data.msg}`)
        }
      })
      .catch(function (error) {
        console.warn(`获取样式失败: ${error}`)
      });
  }

  componentDidMount() {
    this.initSidebarChoosenLayouts()
  }

  render() {
    const rootDivStyle = this.props.style

    return (
      <div >
        <Layout>
          <Sider style={{ zIndex: 2, overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['sub4']}>
              <Menu.Item key="goBackHomeButton">
                <Button component={Link} to={this.state.editInfo.role === 'user' ? '/user/sites' : '/admin/home/'} color="secondary" style={buttonStyle}>
                  返回主页
                </Button>
              </Menu.Item>
              <Menu.Item key="previewButton">
                <Button color="secondary" onClick={this.preview} style={buttonStyle}>
                  预览
                </Button>
              </Menu.Item>
              {this.state.editInfo.role === 'user' && this.deploySiteButton()}


              <SubMenu key="topLevelSections" title={<span><Icon type="database" />顶层板块</span>}>
                {
                  this.getRootChildren().map(child =>
                    <Menu.Item style={{ whiteSpace: 'nowrap', overflowX: 'auto' }} key={child.sectionKey}>
                      <TopLevelMenuItem child={child} removeNode={this.removeNode} />
                    </Menu.Item>
                  )
                }
              </SubMenu>

              <Menu.Item key="LayoutsListPopover">
                <LayoutsListPopover
                  layouts={this.state.layouts.filter(x => x.category === '常用')}
                  buttonStyle={buttonStyle}
                  addNode={this.addNode}
                />
              </Menu.Item>


              <SubMenu key="addNewLayout" title={<span><Icon type="setting" />新增布局(所有)</span>}>
                {
                  this.state.layouts.map(layout =>
                    <Menu.Item key={`${layout.id + 30}`}>
                      <Popover content={this.layoutPreView(`${layout.thumbnail_url}`)} placement="right">
                        <Button color="secondary" onClick={() => this.addNode(layout.data, layout.name)} style={buttonStyle}>
                          {layout.name}
                        </Button>
                      </Popover>
                    </Menu.Item>
                  )
                }
              </SubMenu>
              <Menu.Item key="Divider1">
                <Divider dashed />
              </Menu.Item>
              {this.state.editInfo.role === 'user' && this.updateSiteButton()}

              {this.state.editInfo.role === 'administrator' && this.insertNodeCodeButton()}
              {
                this.state.editInfo.role === 'administrator' &&
                this.saveBlockButton()
              }
              {this.state.editInfo.role === 'administrator' && this.saveToNewBlockButton()}
              {this.state.editInfo.role === 'administrator' && this.clearNodeButton()}
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200, minHeight: '45.25rem', background: 'none', }} className={''}>
            <div id="divInRootAfterLayout" style={rootDivStyle}>
              {this.props.children}
            </div>
          </Layout>
        </Layout>
      </div>
    );
  }
}


EditableRoot.childContextTypes = {
  store: PropTypes.object
};

EditableRoot.contextTypes = {
  store: PropTypes.object,
};


export default EditableRoot;


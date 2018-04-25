// edit 根节点 
// 显示最高权限的编辑器
// preview 其实是个空 div
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import nodeOperation from '../../utils/nodeOperation'
import DeleteIcon from 'material-ui-icons/Delete';
// 侧边栏以及 appbar
import { Layout, Menu, Icon, Popover, Divider, message } from 'antd';
import '../../css/editPage.css'
import 'antd/dist/antd.css'
import IconButton from 'material-ui/IconButton';
// 插入节点代码
import InsertNodeCodeDialog from '../editTools/sidebar/insertNodeCodeDialog'
// 保存到新的板块
import SaveToNewBlockDialog from '../editTools/sidebar/saveToNewBlockDialog'
// 更新模板按钮
import UpdateTemplateButton from '../editTools/sidebar/updateTemplateButton'
// 更新样式按钮
import UpdateLayoutButton from '../editTools/sidebar/updateLayoutButton'

import TemplateService from '../../services/templateService'
import LayoutService from '../../services/layoutService'
import DeployService from '../../services/deployService'

// import UpyunService from '../../services/upyunService'
// import Test from '../../pages/test'
// const upyunService = new UpyunService()

const layoutService = new LayoutService()
const templateService = new TemplateService()
const deployService = new DeployService()

const { Content, Sider } = Layout;
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
  }

  // 获得顶层元素，来加载侧边栏 layout
  getRootChildren = () => {
    if (this.context.store.getState().node) {
      const rootKey = this.context.store.getState().node._root
      if (rootKey) {
        return this.context.store.getState().node._relation[rootKey]
      } else {
        return []
      }
    } else {
      return []
    }
  }

  layoutPreView = (thumbnailUrl) => {
    return (
      <div>
        <p>TODO 此处应该显示布局缩略图 {thumbnailUrl}</p>
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
    const rootKey = this.context.store.getState().node._root
    this.context.store.dispatch({
      type: 'removeNode',
      payload: { targetKey: rootKey, parentKey: null },
      target: 'node',
    });
  }

  removeNode = (targetKey) => {
    const rootKey = this.context.store.getState().node._root
    this.context.store.dispatch({
      type: 'removeNode',
      payload: { targetKey: targetKey, parentKey: rootKey },
      target: 'node',
    });
  }

  // 每个存在数据库的 node 都会被 div 包裹
  // 所以取出其中子元素，这样才能被加入顶层节点
  addNode = (nodeData, layoutName) => {
    let addNodesPayload = JSON.parse(nodeData).children.map(
      x => { return { nodeData: Object.assign(x, { layoutName: layoutName }), targetKey: this.context.store.getState().node._root } }
    )
    const compositePayload = {
      payloadData: {
        addNodes: { payloadData: addNodesPayload },
      }
    }

    this.context.store.dispatch({
      type: 'composite',
      payload: compositePayload,
      target: 'node',
    })
  }

  // 单词首字母小写
  lowerFirstLetter = (s) => {
    return s.replace(/^.{1}/g, s[0].toLowerCase());
  }

  getCodeInIndex = (containerPreviewFileRelativePath) => {
    let nodeData = this.context.store.getState().node

    let importComponents = []
    for (let i in nodeData) {
      if (nodeData[i].nodeName) {
        importComponents.push(nodeData[i].nodeName)
      }
    }

    importComponents = [...new Set(importComponents)]
    let importCode = ""
    for (let i = 0; i < importComponents.length; i++) {
      importCode += `import Preview${importComponents[i]} from '${containerPreviewFileRelativePath + this.lowerFirstLetter(importComponents[i])}'\n`
    }

    let nodeCode = nodeOperation.flattenedData2Code(nodeData, 'deploy')

    const re = /"\n"/gi;
    // var str = '"\n"dadas';
    nodeCode = nodeCode.replace(re, '"\\n"');
    // console.log(newstr);     

    let indexJsCode = `
import React, { Component } from 'react';
import withRoot from '../withRoot';    
${importCode}    
class Index extends Component {
  render() {
    return (
    ${nodeCode}
   );
  }
}

export default withRoot(Index);    
    `
    return indexJsCode
  }



  
  deploy = () => {
    // TODO 部署之前先要更新这个 site
    deployService.getContainerPreviewFileRelativePath()
      .then((response) => {
        const { data } = response
        if (data.code === 0) {
          const containerPreviewFileRelativePath = data.data.containerPreviewFileRelativePath
          const indexFileCode = this.getCodeInIndex(containerPreviewFileRelativePath)
          let userId = null
          const { user } = this.context.store.getState()
          // TODO 是 admin 操作的情况
          userId = user&&user.profile ? user.profile.id : 1
          let params = {
            userId: userId,
            indexFileCode: indexFileCode
          }
          
          deployService.deploy(params)
            .then(res => {
              const { data } = res
              if (data.code === 0) {
                message.success('部署成功')
              } else {
                message.error(`😥 ${data.msg}`, 2)
              }
            })

        } else {
          message.error(`😥 ${data.msg}`, 2)
        }
      })

    // this.download(indexJsCode, 'deploy.txt', 'text/plain')
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
          // TODO 
          break;
        default:
          break;
      }
      let parmas = {
        id: id,
      }
      const nodeData = JSON.parse(JSON.stringify(this.context.store.getState().node));
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
            message.error(`😥 ${data.msg}, 请设置浏览器允许该网站弹窗哦`, 2)
          }
        })
        .catch(function (error) {
          message.error(`😥 出现异常: ${error}`, 2)
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
    const { classes, theme } = this.props;
    return (
      <div >
        <Layout>
          <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['sub4']}>
              <Menu.Item key="1">
                <Button component={Link} to={this.state.editInfo.role === 'user' ? '/' : '/admin/home/'} color="secondary" style={buttonStyle}>
                  返回主页
                </Button>
              </Menu.Item>
              <Menu.Item key="2">
                <Button color="secondary" onClick={this.preview} style={buttonStyle}>
                  预览
                </Button>
              </Menu.Item>
              <Menu.Item key="3">
                <Button onClick={this.deploy} style={buttonStyle}>
                  部署
                </Button>
              </Menu.Item>
              <Menu.Item key="4">
                <a href="" id="a" style={{ marginLeft: 15 }}>下载代码</a>
              </Menu.Item>

              <SubMenu key="topLevelSections" title={<span><Icon type="database" />顶层板块</span>}>
                {
                  this.getRootChildren().map(section_key =>
                    <Menu.Item key={section_key}>
                      <div>
                        <Button href={`#${this.context.store.getState().node[section_key].props.id}`} style={{ color: 'white', width: '50%', justifyContent: 'left' }}>
                          {this.context.store.getState().node[section_key].layoutName}
                        </Button>
                        <IconButton style={{ color: 'white', minWidth: 20 }} onClick={() => { this.removeNode(section_key) }} aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </Menu.Item>
                  )
                }
              </SubMenu>

              <SubMenu key="sub4" title={<span><Icon type="setting" />新增布局</span>}>
                {
                  this.state.layouts.map(layout =>
                    <Menu.Item key={`${layout.id + 30}`}>
                      <Popover content={this.layoutPreView(`${layout.name}`)} title="Title" placement="right">
                        <Button color="secondary" onClick={() => this.addNode(layout.data, layout.name)} style={buttonStyle}>
                          {layout.name}
                        </Button>
                      </Popover>
                    </Menu.Item>
                  )
                }
              </SubMenu>
              <Menu.Item key="12">
                <Divider dashed />
              </Menu.Item>
              {
                this.state.editInfo.role === 'user' &&
                <Menu.Item key="saveSite">
                  <Button color="secondary" style={buttonStyle}>
                    保存
                </Button>
                </Menu.Item>
              }

              {this.state.editInfo.role === 'administrator' && this.insertNodeCodeButton()}
              {
                this.state.editInfo.role === 'administrator' &&
                this.saveBlockButton()
              }
              {this.state.editInfo.role === 'administrator' && this.saveToNewBlockButton()}
              {this.state.editInfo.role === 'administrator' && this.clearNodeButton()}
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200, minHeight: '45.25rem', background: 'none' }} className={''}>
            <div id="divInRootAfterLayout">
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


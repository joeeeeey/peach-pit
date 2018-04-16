// edit 根节点 
// 显示最高权限的编辑器
// preview 其实是个空 div
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import nodeOperation from '../../utils/nodeOperation'

// 侧边栏以及 appbar
import { Layout, Menu, Icon, Popover, Divider } from 'antd';
import '../../css/editPage.css'
import 'antd/dist/antd.css'

import InsertNodeCodeDialog from '../common/editTools/insertNodeCodeDialog'
import SaveToNewBlockDialog from '../common/editTools/saveToNewBlockDialog'
// axios
import axios from 'axios'

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const content = (
  <div>
    <p>TODO 此处应该显示布局缩略图</p>
  </div>
);

const menu = (
  <Menu >
    <Menu.Item key="11">
      {/* <Button onClick={onClick}>左右模板</Button> */}
      <Button color="secondary" >
        左右布局
      </Button>
    </Menu.Item>
    <Menu.Item key="12">2nd memu item</Menu.Item>
    <Menu.Item key="13">3rd menu item</Menu.Item>
  </Menu>
);


const buttonStyle = { color: 'white', width: '100%', justifyContent: 'left' }

class EditableRoot extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      openPreview: false,
      editInfo: context.store.getState().editInfo,   // {source: "das", id: "32", role: "admin"}
    }
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
        {/* <Button color="secondary" style={buttonStyle}>
          新增至板块 🎉
        </Button> */}
        <SaveToNewBlockDialog />
      </Menu.Item>
    )
  }

  saveToTemplateButton = () => {
    return (
      <Menu.Item key="saveToTemplateButton">
        <Button onClick={this.saveTemplate} color="secondary" style={buttonStyle}>
          更新该模板
        </Button>
      </Menu.Item>
    )
  }

  saveToLayoutButton = () => {
    return (
      <Menu.Item key="saveToLayoutButton">
        <Button color="secondary" style={buttonStyle}>
         更新该布局
        </Button>
      </Menu.Item>
    )
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
    // console.log(this.context.store.getState().node)
    this.context.store.dispatch({
      type: 'removeNode',
      payload: { targetKey: rootKey, parentKey: null },
      target: 'node',
    });    
  }
  saveTemplate = () => {
    // TODO
    console.log('saveTemplate')
  }
  // 根据用户 和 资源 生成保存按钮
  saveBlockButton = () => {
    // const editInfo = this.state.editInfo
    const { role, source, id } = this.state.editInfo
    if (role === 'admin') {
      if (source === 'template') {
        return this.saveToTemplateButton()

      } else if (source === 'layout') {
        return this.saveToLayoutButton()
      }
    }
  }

  addNode = (nodeName) => {
    let { selfkey } = this.props
    this.context.store.dispatch({
      type: 'addNode',
      payload: { selfKey: selfkey, nodeName: nodeName },
      target: 'node',
    });
  }

  addLetfRightGridNode = () => {
    this.addNode('LetfRightGrid')
  }
  addTextAreaNode = () => {
    this.addNode('TextArea')
  }

  // 单词首字母小写
  lowerFirstLetter = (s) => {
    return s.replace(/^.{1}/g, s[0].toLowerCase());
  }


  deploy = () => {
    axios.get('/api/user', {
      params: {
        ID: 12345
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    //  TODO 配置在文件中
    // 引入文件的路劲前缀
    let pathPrefix = '../components/preview/'

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
      importCode += `import Preview${importComponents[i]} from '${pathPrefix + this.lowerFirstLetter(importComponents[i])}'\n`
    }

    let nodeCode = nodeOperation.flattenedData2Code(nodeData, 'deploy')
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
    this.download(indexJsCode, 'deploy.txt', 'text/plain')
  }

  // 测试代码生成的功能，应该由后端完成
  // TODO Do it at Backend 
  download = (text, name, type) => {
    var a = document.getElementById("a");
    var file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
  }

  preview = () => {
    let setPreviewState = !this.state.openPreview
    this.setState({ openPreview: setPreviewState });

    this.context.store.dispatch({
      type: 'update',
      payload: { value: setPreviewState, nestedKey: 'isPreview' },
      target: 'user',
    });
  }

  getChildContext() {
    return { store: this.context.store };
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div >
        <Layout>            
          <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['sub4']}>
              <Menu.Item key="1">
                <Button component={Link} to="/" color="secondary" style={buttonStyle}>
                  返回主页
                </Button>
              </Menu.Item>
              <Menu.Item key="2">
                <Button color="secondary" onClick={this.preview} style={buttonStyle}>
                  {this.state.openPreview ? '关闭预览' : '下方预览'}
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

              <SubMenu key="sub4" title={<span><Icon type="setting" />增加板块</span>}>
                <Menu.Item key="9">
                  <Popover content={content} title="Title" placement="right">
                    <Button color="secondary" onClick={this.addLetfRightGridNode} style={buttonStyle}>
                      左右布局
                  </Button>
                  </Popover>
                </Menu.Item>
                <Menu.Item key="10">
                  <Button color="secondary" style={buttonStyle}>
                    上下布局
                  </Button>
                </Menu.Item>
                <Menu.Item key="11">
                  <Button color="secondary" style={buttonStyle}>
                    某个布局
                  </Button>
                </Menu.Item>
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

              { this.state.editInfo.role === 'admin' && this.insertNodeCodeButton() }
              {
                this.state.editInfo.role === 'admin' &&
                this.saveBlockButton()
              }
              { this.state.editInfo.role === 'admin' && this.saveToNewBlockButton() }
              { this.state.editInfo.role === 'admin' && this.clearNodeButton() }
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>     
            {this.props.children}
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


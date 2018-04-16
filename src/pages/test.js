import React, { Component } from 'react';
// import EditableButton from '../components/edit/button'
// import EditableTextArea from '../components/edit/textArea'
// import Grid from 'material-ui/Grid';
// import EditableLetfRightGrid from '../components/edit/letfRightGrid'
// import EditableCard from '../components/edit/card'
// import EditableCardMedia from '../components/edit/cardMedia'
// import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import MuButton from 'material-ui/Button';
import { Layout, Menu, Icon, Popover } from 'antd';

import '../css/editPage.css'
import 'antd/dist/antd.css'

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
      <MuButton color="secondary" >
        左右布局
      </MuButton>
    </Menu.Item>
    <Menu.Item key="12">2nd memu item</Menu.Item>
    <Menu.Item key="13">3rd menu item</Menu.Item>
  </Menu>
);

class Test extends Component {
  constructor(props) {
    super(props);
    // this.state = { children1: "测试文字1", children2: "测试文字2", children3: "测试文字3" }
  }

  render() {
    return (
      <div>
        <Layout>
          <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>

              <Menu.Item key="3">
                <MuButton color="primary" >
                  预览
                </MuButton>
              </Menu.Item>
              <Menu.Item key="4">
                <MuButton >
                  部署
                </MuButton>
              </Menu.Item>

              <SubMenu key="sub4" title={<span><Icon type="setting" />增加板块<span></span></span>}>
                <Menu.Item key="9">
                  <Popover content={content} title="Title" placement="right">
                    <MuButton color="secondary" >
                      左右布局
                  </MuButton>
                  </Popover>
                </Menu.Item>
                <Menu.Item key="10">
                  <MuButton color="secondary" >
                    上下布局
                  </MuButton>
                </Menu.Item>
                <Menu.Item key="11">
                  <MuButton color="secondary" >
                    某个布局
                  </MuButton>
                </Menu.Item>
              </SubMenu>

            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            {/* <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                ...
          <br />
                Really
          <br />...<br />...<br />...<br />
                long
        </div>
            </Content> */}
            <div>
              <h1>dadad</h1>
              ddadsd
            </div>

          </Layout>
        </Layout>
        {/* <EditableLetfRightGrid>
          <EditableTextArea content={'好吃的东西'}
            style={{ textAlign: 'center', fontSize: 30, fontWeight: 500, color: "#1c1a1a" }}
          ></EditableTextArea>
          <EditableTextArea content={'就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。啊啊 啊啊啊啊啊啊啊啊'}
            style={{ textAlign: 'center', fontSize: 20, fontWeight: 400, color: "#1c1a1a", float: "center" }}
          ></EditableTextArea>
          <EditableCard style={{ maxWidth: 'auto', marginLeft: 20 }}>
            <EditableCardMedia 
            style={ { height: 280 }}
            image = {"/images/ORG_DSC01034.jpg"}
            />
          </EditableCard>
        </EditableLetfRightGrid> */}
      </div>
    );
  }
}

export default Test;

// props:

// navBarChildren: array 导航栏子元素
// style: object 样式 Example: {paddingTop: 60}

// edit 根节点
// 显示最高权限的编辑器
// preview 其实是个空 div
import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

// 侧边栏以及 appbar
import { Layout, Menu, Icon, Popover, Divider, message } from "antd";
import GridLayout from "react-grid-layout";
import ArrayOper from "utils/arrOperation";
// 插入节点代码
import InsertNodeCodeDialog from "components/editTools/sidebar/insertNodeCodeDialog";
// 保存到新的板块
import SaveToNewBlockDialog from "components/editTools/sidebar/saveToNewBlockDialog";
// 更新模板按钮
import UpdateTemplateButton from "components/editTools/sidebar/updateTemplateButton";
// 更新样式按钮
import UpdateLayoutButton from "components/editTools/sidebar/updateLayoutButton";
// 更新网站按钮
import UpdateSiteButton from "components/editTools/sidebar/updateSiteButton";
// 部署网站按钮
import DeploySiteButton from "components/editTools/sidebar/deploySiteButton";
// 顶层样式操作模板
import TopLevelMenuItem from "components/editTools/sidebar/topLevelMenuItme";
// 布局列表气泡卡片
import LayoutsListPopover from "components/editTools/sidebar/layoutsListPreviewPopover";
// 更改网站名称
import UpdateSiteNameItem from "components/editTools/sidebar/updateSiteNameItem";
import TemplateService from "services/templateService";
import LayoutService from "services/layoutService";
import SiteService from "services/siteService";
import nodeOperation from "utils/nodeOperation";
// import Test from '../../pages/test'
import actionTypes from "constants/action-types";

const layoutService = new LayoutService();
const templateService = new TemplateService();
const siteService = new SiteService();
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const mapStateToProps = state => ({
  flattenedNode: state.node,
});

const buttonStyle = { color: "white", width: "100%", justifyContent: "left" };
class EditableRoot extends React.PureComponent {
  constructor(props, context) {
    super(props);

    this.state = {
      openPreview: false,
      editInfo: context.store.getState().editInfo, // {source: "das", id: "32", role: "admin"}
      layouts: [], // 可选择加入的样式
      topLevelItemisDraggable: false // 顶层板块可被拖拽
    };
    this.navbar = [];
    this.selfkey = this.props.selfkey;
  }

  // 获得顶层元素 key，来加载侧边栏 layout
  getRootChildrenKey = () => {
    if (this.wholeNode()) {
      const rootKey = this.selfkey;
      if (rootKey) {
        return this.wholeNode()._relation[rootKey];
      } else {
        return [];
      }
    } else {
      return [];
    }
  };
  // 获得顶层元素
  getRootChildren = () => {
    const keys = this.getRootChildrenKey();
    if (keys && keys.length > 0) {
      return keys.map(key => {
        const { layoutName, props } = this.wholeNode()[key];
        return {
          id: props.id,
          name: layoutName,
          layoutName: layoutName,
          sectionKey: key
        };
      });
    } else {
      return [];
    }
  };

  layoutPreView = thumbnailUrl => {
    return (
      <div style={{ width: 300, overflow: "auto" }}>
        <img
          style={{ maxWidth: "100%" }}
          src={
            thumbnailUrl ||
            "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/ee6abd28bece31864a13b934fdbda223"
          }
          alt={"layout_thumb"}
        />
      </div>
    );
  };

  insertNodeCodeButton = () => {
    return (
      <Menu.Item key="insertNodeCodeButton">
        <InsertNodeCodeDialog />
      </Menu.Item>
    );
  };

  saveToNewBlockButton = () => {
    return (
      <Menu.Item key="saveToNewBlockButton">
        <SaveToNewBlockDialog />
      </Menu.Item>
    );
  };

  // 部署按钮
  deploySiteButton = () => {
    return (
      <Menu.Item key="deploySiteButton">
        <DeploySiteButton style={buttonStyle} />
      </Menu.Item>
    );
  };

  updateTemplateButton = () => {
    return (
      <Menu.Item key="updateTemplateButton">
        <UpdateTemplateButton style={buttonStyle} />
      </Menu.Item>
    );
  };

  updateLayoutButton = () => {
    return (
      <Menu.Item key="updateLayoutButton">
        <UpdateLayoutButton style={buttonStyle} />
      </Menu.Item>
    );
  };

  updateSiteButton = () => {
    return (
      <Menu.Item key="updateSiteButton">
        <UpdateSiteButton style={buttonStyle} />
      </Menu.Item>
    );
  };

  updateSiteNameItem = () => {
    return (
      <Menu.Item key="UpdateSiteNameItem">
        <UpdateSiteNameItem />
      </Menu.Item>
    );
  };

  // 根据用户 和 资源 生成保存按钮
  saveBlockButton = () => {
    const { role, source, id } = this.state.editInfo;
    if (role === "administrator") {
      if (source === "template") {
        return this.updateTemplateButton();
      } else if (source === "layout") {
        return this.updateLayoutButton();
      }
    }
  };

  clearNodeButton = () => {
    return (
      <Menu.Item key="clearNodeButton">
        <Button color="secondary" onClick={this.clearNode} style={buttonStyle}>
          清空节点
        </Button>
      </Menu.Item>
    );
  };

  clearNode = () => {
    const rootKey = this.selfkey;
    this.context.store.dispatch({
      type: actionTypes.REMOVE_FLATTENED_NODE,
      payload: { targetKey: rootKey, parentKey: null },
    });
  };

  // 删除节点时得到导航栏更新的 payload
  getRootDeleteNodeUpdateNavBarPayload = targetKey => {
    let thisNode = this.wholeNode()[targetKey];
    let updateNodesPayload = [];
    let { navBarChildren } = this.state;

    // 检查并更新导航栏内容
    // 如果有导航栏
    if (navBarChildren) {
      // 删除导航栏
      if (thisNode.nodeName === "NavBar") {
        const affectRoot = thisNode.props.affectRoot;
        let updateNodesPayload = [];
        for (let a in affectRoot) {
          updateNodesPayload.push({
            value: 0, // TODO 最好的方式是判断是字符串还是数字, 数字就减，字符变为 null
            nestedKey: `${this.selfkey},props,style,${a}`
          });
        }
        // 清空 navBarChildren 内容
        updateNodesPayload.push({
          value: null,
          nestedKey: `${this.selfkey},props,navBarChildren`
        });

        this.setNavBarState(null);

        return updateNodesPayload;
      } else {
        // 更新导航栏
        // 去除 rootChildren 中的这个元素
        const newChilren = navBarChildren.filter(
          x => x.id !== thisNode.props.id
        );
        updateNodesPayload.push({
          value: newChilren,
          nestedKey: `${this.selfkey},props,navBarChildren`
        });

        this.setNavBarState(newChilren);
        return updateNodesPayload;
      }
    }
  };

  removeNode = targetKey => {
    let compositePayload = {
      payloadData: {
        removeNodes: {
          payloadData: [{ targetKey: targetKey, parentKey: this.selfkey }]
        }
      }
    };
    let updateNodesPayload = [];

    // 得到 navBar 更新内容
    let updateNavBarPayload = this.getRootDeleteNodeUpdateNavBarPayload(
      targetKey
    );
    if (updateNavBarPayload) {
      updateNodesPayload = updateNodesPayload.concat(updateNavBarPayload);
    }

    if (updateNodesPayload && updateNodesPayload.length > 0) {
      compositePayload.payloadData.updateNodes = {
        payloadData: updateNodesPayload
      };
    }

    this.context.store.dispatch({
      type: actionTypes.MIXED_PROCESSING_FLATTENED_NODES,
      payload: compositePayload,
    });
  };

  // 如果是导航栏或者其他会影响整个页面 padding margin 的 node 有变化(增删)，需要更新 root 的样式
  // example:  {affectRoot :{'paddingTop': 64}}

  // 顶层版面的新增节点方法
  // 新增内容为 layout 对象
  //    新增时, 需要给这个 layout 对象的 props 增加一个新的 uniq id
  //    若为非复合样式(有代码文件映射这个 layout)， 每个存在数据
  //    库的 node 都会被一个仅为替代 _root 的 div 包裹, 而 div
  //    下肯定只会有一个子元素
  //
  // 复合样式则直接将整个 div 当成是应该加入的 layout 对象

  addNode = (nodeData, layoutName) => {
    nodeData = JSON.parse(nodeData);
    let compositePayload = null;
    let thisNode = null;
    // 复合节点的情况
    if (nodeData.composite) {
      let compositelayoutId = nodeOperation.incryptKey(layoutName);
      nodeData.props.id = compositelayoutId;
      nodeData.layoutName = layoutName;
      let addNodesPayload = [{ nodeData: nodeData, targetKey: this.selfkey }];

      compositePayload = {
        payloadData: {
          addNodes: { payloadData: addNodesPayload }
        }
      };
      thisNode = nodeData;
    } else {
      let chilrenData = nodeData.children;

      // number of nodeData children should be 1
      if (chilrenData.length !== 1) {
        console.warn(
          "非复合节点的 chilren 个数只能为 1， 当前为 ${chilrenData.length}"
        );
        return;
      }

      // 此处只是为了方便用了 map， 其实只有一个元素
      let addNodesPayload = chilrenData.map(x => {
        x.props.id = x.props.id
          ? x.props.id
          : `${chilrenData[0].nodeName +
          "_" +
          nodeOperation.incryptKey(layoutName)}`;
        x.layoutName = layoutName;
        return {
          nodeData: x,
          targetKey: this.selfkey
        };
      });

      compositePayload = {
        payloadData: {
          addNodes: { payloadData: addNodesPayload }
        }
      };

      thisNode = chilrenData[0];
    }

    let updateNodesPayload = [];

    // 检查并更新导航栏内容
    if (this.props.navBarChildren) {
      if (thisNode.nodeName === "NavBar") {
        // 已经存在了导航栏情况
        message.warn("不支持多个导航栏共存", 3);
        return;
      } else {
        // 更新导航栏
        const updateNavBarPayload = this.getRootAddNodeUpdateNavBarPayload(
          thisNode
        );
        updateNodesPayload = updateNodesPayload.concat(updateNavBarPayload);
      }
    } else {
      if (thisNode.nodeName === "NavBar") {
        const addNavBarPayload = this.getAddNavBarPayload(thisNode);
        updateNodesPayload = updateNodesPayload.concat(addNavBarPayload);
      }
    }

    if (updateNodesPayload && updateNodesPayload.length > 0) {
      compositePayload.payloadData.updateNodes = {
        payloadData: updateNodesPayload
      };
    }

    this.context.store.dispatch({
      type: actionTypes.MIXED_PROCESSING_FLATTENED_NODES,
      payload: compositePayload,
    });
  };

  // 根节点增加其他元素更新导航栏时的更新内容
  getRootAddNodeUpdateNavBarPayload = thisNode => {
    let updateNavBarPayload = [];
    const child = {
      id: thisNode.props.id,
      name: thisNode.layoutName,
      layoutName: thisNode.layoutName
    };

    let { navBarChildren } = this.state;
    navBarChildren.push(child);

    this.setNavBarState(navBarChildren);

    updateNavBarPayload.push({
      value: navBarChildren,
      nestedKey: `${this.selfkey},props,navBarChildren`
    });

    return updateNavBarPayload;
  };

  setNavBarState = value => {
    this.setState({ navBarChildren: value });
  };

  // 根节点增加导航栏时的更新内容
  // 1. 更新 root.props.navBarChildren
  // 2. 更新导航栏影响 root 的样式
  getAddNavBarPayload = thisNode => {
    let addNavBarPayload = [];

    let navBarChildren = this.getRootChildren().map(x => {
      let { sectionKey, ...y } = x;
      return y;
    });

    addNavBarPayload.push({
      value: navBarChildren,
      nestedKey: `${this.selfkey},props,navBarChildren`
    });

    // 更新影响 root 的样式
    const affectRoot = thisNode.props.affectRoot;
    if (affectRoot) {
      for (let a in affectRoot) {
        addNavBarPayload.push({
          value: affectRoot[a],
          nestedKey: `${this.selfkey},props,style,${a}`
        });
      }
    }

    this.setNavBarState(navBarChildren);
    return addNavBarPayload;
  };

  // 得到整个 node
  wholeNode = () => {
    // console.log('得到整个 node is: ', JSON.stringify(this.context.store.getState().node))
    return this.context.store.getState().node;
  };

  // 测试代码生成的功能，应该由后端完成
  // TODO Do it at Backend
  download = (text, name, type) => {
    const a = document.getElementById("a");
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
  };

  // 该方法若是放在子元素中调用
  // window.open(url, '_blank') 始终返回 null
  // 只能用 settimeout 和判断 解决，但这样会变成弹窗，容易被浏览器拦截 https://stackoverflow.com/questions/3923321/ie7-window-open-when-focus-return-null
  // 所有还是将代码放在此处 TODO FIX THIS PROBLEM
  preview = () => {
    if (this.state.editInfo.source) {
      const { source, id, role } = this.state.editInfo;
      // update node
      switch (source) {
        case "layout":
          this.service = layoutService;
          break;
        case "template":
          this.service = templateService;
          break;
        case "site":
          this.service = siteService;
          break;
        default:
          break;
      }
      let parmas = {
        id: id
      };
      let nodeData = JSON.parse(JSON.stringify(this.wholeNode()));
      parmas.data = JSON.stringify(nodeOperation.heightenDomTree(nodeData));

      this.service
        .update(parmas)
        .then(response => {
          const { data } = response;
          if (data.code === 0) {
            const url = `/${role}/previewPage?source=${source}&id=${id}`;
            // 打开新页面
            const win = window.open(url, "_blank");
            win.focus();
          } else {
            message.error(`😥 ${data.msg}, 更新出现异常`, 2);
          }
        })
        .catch(() => {
          message.error(`😥 出现异常:, 请设置浏览器允许该网站弹窗哦`, 2);
        });
    }
  };

  getChildContext() {
    return { store: this.context.store };
  }

  initSidebarChoosenLayouts = () => {
    const params = { limit: 10000, currentPage: 1 };

    layoutService
      .getAllLayouts(params, this.context.store.getState().editInfo)
      .then(response => {
        const { data } = response;
        if (data.code === 0) {
          this.setState({ layouts: data.data.records });
        } else {
          console.warn(`获取样式失败: ${data.msg}`);
        }
      })
      .catch(function (error) {
        console.warn(`获取样式失败: ${error}`);
      });
  };

  componentDidMount() {
    this.initSidebarChoosenLayouts();
  }

  changeTopLevelItemDraggable = () => {
    const { topLevelItemisDraggable } = this.state;
    this.setState({ topLevelItemisDraggable: !topLevelItemisDraggable });
  };
  // 顶层板块名称变化
  handleChangeLayoutName = (changLayoutPayload, newLayoutName, child) => {
    let compositePayload = { payloadData: {} };

    let updateNodesPayload = [changLayoutPayload];

    let navBarChildren = this.props.navBarChildren;
    if (navBarChildren && navBarChildren.length > 0) {
      for (let i = 0; i < navBarChildren.length; i++) {
        if (navBarChildren[i].id === child.id) {
          navBarChildren[i].name = newLayoutName;
          break;
        }
      }
      updateNodesPayload.push({
        value: navBarChildren,
        nestedKey: `${this.selfkey},props,navBarChildren`
      });
      this.setNavBarState(navBarChildren);
    }

    compositePayload.payloadData.updateNodes = {
      payloadData: updateNodesPayload
    };

    this.context.store.dispatch({
      type: actionTypes.MIXED_PROCESSING_FLATTENED_NODES,
      payload: compositePayload,
    });
  };

  // 拖拽顶层板块
  handleDrag = layout => {
    // [{ w: 1, h: 1, x: 0, y: 4, i: "aaa" }]
    const rootKey = this.props.selfkey;
    const currentRootRelation = this.wholeNode()._relation[rootKey];
    layout.sort((a, b) => {
      return a.y > b.y ? 1 : b.y > a.y ? -1 : 0;
    });
    const dragRootRealtion = layout.map(x => x.i);

    // 根据 relation 数组判断拖拽是否改变了位置
    if (ArrayOper.compare(currentRootRelation, dragRootRealtion)) {
      return;
    }

    const navBarKey = currentRootRelation.filter(x => x.includes("NavBar"))[0];

    layout = layout.filter(x => !x.i.includes("NavBar"));

    let newRootRealtion = layout.map(x => x.i);

    let compositePayload = { payloadData: {} };

    let updateNodesPayload = [];

    // [{id: "VerticalLayout_08ed82ac646dff6be8598d2f28e83a3a", name: "味觉盛宴", layoutName: "味觉盛宴"}]

    if (navBarKey) {
      let { navBarChildren } = this.state;
      let newNavBarChildren = [];
      for (let i = 0; i < navBarChildren.length; i++) {
        const child = navBarChildren[i];
        newNavBarChildren[newRootRealtion.indexOf(child.id)] = child;
      }
      this.setNavBarState(newNavBarChildren);
      updateNodesPayload.push({
        value: newNavBarChildren,
        nestedKey: `${this.selfkey},props,navBarChildren`
      });
      newRootRealtion.splice(0, 0, navBarKey);
    }

    updateNodesPayload.push({
      value: newRootRealtion,
      nestedKey: `_relation,${rootKey}`
    });

    compositePayload.payloadData.updateNodes = {
      payloadData: updateNodesPayload
    };

    this.context.store.dispatch({
      type: actionTypes.MIXED_PROCESSING_FLATTENED_NODES,
      payload: compositePayload,
    });
  };

  render() {
    // TODO 使用 state 替代
    const rootDivStyle = Object.assign({ marginBottom: '40px' }, this.props.style);
    console.log('rootDivStyle: ', this.props);

    return (
      <div id="EditableRoot">
        <Layout>
          <Sider
            style={{
              zIndex: 2,
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["sub4"]}>
              <Menu.Item key="goBackHomeButton">
                <Button
                  component={Link}
                  to={
                    this.state.editInfo.role === "user"
                      ? "/user/sites"
                      : "/admin/home/"
                  }
                  color="secondary"
                  style={buttonStyle}>
                  返回主页
                </Button>
              </Menu.Item>
              <Menu.Item key="previewButton">
                <Button
                  color="secondary"
                  onClick={this.preview}
                  style={buttonStyle}>
                  预览
                </Button>
              </Menu.Item>
              {this.state.editInfo.role === "user" && this.deploySiteButton()}

              <Menu.Item key="topLevelSectionsDivider">
                <Divider dashed />
              </Menu.Item>

              <Menu.Item
                key="topLevelSections"
                style={{ height: "100%", paddingLeft: 0 }}>
                <Button
                  color="secondary"
                  onClick={this.changeTopLevelItemDraggable}
                  style={
                    this.state.topLevelItemisDraggable
                      ? {
                        width: "100%",
                        justifyContent: "center",
                        color: "#FFECB3"
                      }
                      : {
                        width: "100%",
                        justifyContent: "center",
                        color: "#C8E6C9"
                      }
                  }>
                  {this.state.topLevelItemisDraggable
                    ? "关闭板块拖拽"
                    : "开启板块拖拽"}
                </Button>
                <div style={{ position: "relative" }}>
                  <GridLayout
                    isDraggable={this.state.topLevelItemisDraggable}
                    onDragStop={this.handleDrag}
                    useCSSTransforms={false}
                    className="layout"
                    cols={1}
                    rowHeight={30}
                    width={180}>
                    {this.getRootChildren().map((child, index) => (
                      <div
                        key={child.id}
                        data-grid={{ x: 0, y: index, w: 12, h: 1 }}>
                        <TopLevelMenuItem
                          isDraggable={this.state.topLevelItemisDraggable}
                          child={child}
                          removeNode={this.removeNode}
                          changeLayoutName={this.handleChangeLayoutName}
                        />
                      </div>
                    ))}
                  </GridLayout>
                </div>
              </Menu.Item>
              <Menu.Item key="LayoutsListPopover">
                <LayoutsListPopover
                  layouts={this.state.layouts.filter(
                    x => x.category === "常用"
                  )}
                  buttonStyle={buttonStyle}
                  addNode={this.addNode}
                />
              </Menu.Item>

              <SubMenu
                key="addNewLayout"
                title={
                  <span>
                    <Icon type="setting" />
                    新增布局(所有)
                  </span>
                }>
                {this.state.layouts.map(layout => (
                  <Menu.Item key={`${layout.id + 30}`}>
                    <Popover
                      content={this.layoutPreView(`${layout.thumbnail_url}`)}
                      placement="right">
                      <Button
                        color="secondary"
                        onClick={() => this.addNode(layout.data, layout.name)}
                        style={buttonStyle}>
                        {layout.name}
                      </Button>
                    </Popover>
                  </Menu.Item>
                ))}
              </SubMenu>
              {this.state.editInfo.role === "user" && this.updateSiteNameItem()}
              <Menu.Item key="Divider1">
                <Divider dashed />
              </Menu.Item>
              {this.state.editInfo.role === "user" && this.updateSiteButton()}

              {this.state.editInfo.role === "administrator" &&
                this.insertNodeCodeButton()}
              {this.state.editInfo.role === "administrator" &&
                this.saveBlockButton()}
              {this.state.editInfo.role === "administrator" &&
                this.saveToNewBlockButton()}
              {this.state.editInfo.role === "administrator" &&
                this.clearNodeButton()}
            </Menu>
          </Sider>
          <Layout
            style={{
              marginLeft: 200,
              minHeight: "45.25rem",
              background: "none"
            }}
            className={""}>
            {/* <Test/> */}
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
  store: PropTypes.object
};

export default connect(mapStateToProps)(EditableRoot);

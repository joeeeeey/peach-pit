import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import nodeOperation from "utils/nodeOperation";
import BlockService from "services/blockService";
import CdnService from "services/cdnService";
import actionTypes from "constants/action-types";
import EditableRoot from "components/edit/root";

const mapStateToProps = state => ({
  node: state.node ? state.node[state.node._root] : null,
});

// 测试的组件
// import Test from '../test'
const cdnService = new CdnService();
const blockService = new BlockService();

class Edit extends React.Component {
  getSourceFromUrl = () => {
    try {
      const urlParams = new URL(window.location.href);
      const source = urlParams.searchParams.get("source");
      if (source.toString() !== "null") {
        return { source: source, id: urlParams.searchParams.get("id") };
      } else {
        return { source: null };
      }
    } catch (error) {
      alert("出现异常");
      return { source: null };
    }
  };

  getRoleNameFromStore = store => {
    const userState = store.getState().user;
    const adminState = store.getState().administrator;
    if (userState && userState.isLogin) {
      return "user";
    } else if (adminState && adminState.isLogin) {
      return "administrator";
    } else {
      return "unknown";
    }
  };

  // 获取 '调用得到已上传的图片' 参数
  // role 是用户则将所有 sites 上传的图片都找出
  // admin 只找出当前 source id
  getShowUploadedImageParams = (sourceInfo, role) => {
    const { source, id } = sourceInfo;
    let sourceId = null;
    let traversal = null;
    if (role === "user") {
      sourceId = "";
      traversal = true;
    } else {
      traversal = false;
      sourceId = id || "tmp";
    }

    return {
      page: "editPage",
      role: role,
      source: source || "layout",
      sourceId: sourceId,
      traversal: traversal
    };
  };

  setEditInfoState = editInfo => {
    this.context.store.dispatch({
      type: actionTypes.RESET_EDIT_INFO,
      payload: editInfo,
    });
  };

  updateEditInfoState = (nestedKey, value) => {
    this.context.store.dispatch({
      type: actionTypes.UPDATE_EDIT_INFO,
      payload: { nestedKey: nestedKey, value: value },
    });
  };

  // 最适合取到数据的地方
  componentDidMount = () => {
    // 根据`当前用户角色` 和 `资源` 初始化编辑页信息
    const sourceInfo = this.getSourceFromUrl();
    const role = this.getRoleNameFromStore(this.context.store);
    const roleInfo = { role: role };
    let editInfo = Object.assign({}, sourceInfo, roleInfo);

    let params = this.getShowUploadedImageParams(editInfo, role);
    this.setEditInfoState(editInfo);
    cdnService
      .showUploadedFiles(params)
      .then(response => {
        const { data } = response;
        if (data.code === 0) {
          // editInfo.uploadedImages = data.data.imageFiles
          // this.setEditInfoState(editInfo)
          this.updateEditInfoState(`uploadedImages`, data.data.imageFiles);
        }
      })
      .catch(error => {
        console.error(`获取已上传的图片出现异常: ${error}`);
      });

    if (editInfo.source) {
      blockService
        .getNodeDataInEditInfo(editInfo)
        .then(response => {
          const { data } = response;
          if (data.code === 0) {
            // {id: 1, name: 'dsd', thumb_url: 'xxx', data: '..'}
            let block = data.data;
            // 此处 setEditInfoState 需要在 initialNodeData 下方执行
            // TODO why? 将两个 dispatch 合并
            this.initialNodeData(block);
          } else {
            console.warn(data.msg);
          }
        })
        .catch(function(error) {
          console.warn(error);
        });
    } else {
      this.initialNodeData();
    }
  };

  initialNodeData(block) {
    let ftData = nodeOperation.flattenDomTree(this.wrapRoot(block));

    this.context.store.dispatch({
      type: actionTypes.RESET_FLATTENED_NODE,
      payload: ftData,
      target: "node"
    });
    // 正在编辑的网站名称加入 editInfo 中
    if (block && block.name) {
      this.updateEditInfoState(`name`, block.name);
    }
    // 此处 updateEditInfoState 一定要在 replace node 下方
    // TODO why?
  }

  // {nodeName: 'div', children: []}
  wrapRoot = (block = null) => {
    return nodeOperation.wrapRoot(block);
  };

  render = () => {
    const { node } = this.props;

    if (node) {
      return <EditableRoot {...this.props.node.props} />
    }

    return null;
  };

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

Edit.propTypes = {
  node:  PropTypes.object
}

export default connect(mapStateToProps)(Edit);
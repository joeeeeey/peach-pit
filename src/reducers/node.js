/**
 * @file Redux actions of `node`.
 */
import { evalUpdate } from "utils/eval";
import nodeOperation from "utils/nodeOperation";
import actionTypes from "constants/action-types";

export default (state = null, action) => {
  const { payload } = action;
  // let { value, targetKey, parentKey, nestedKey } = action.payload;
  switch (action.type) {
    case actionTypes.RESET_FLATTENED_NODE:
      return payload;
    case actionTypes.UPDATE_FLATTENED_NODE:
      return evalUpdate(state, payload.nestedKey, payload.value);
    // 批量更新
    // payloadData => [{nestedKey: nestedKey, value: value}]
    case actionTypes.UPDATE_FLATTENED_NODES:
      updateNodes(state, payload);
      return Object.assign({}, state);
    // 增加单个节点， 父元素发出的请求
    case actionTypes.ADD_FLATTENED_NODE:
      addNode(state, payload);
      return Object.assign({}, state);
    // 批量增加节点
    // { payloadData: [{ nodeData: nodeData, targetKey: targetKey }]
    case actionTypes.ADD_FLATTENED_NODES:
      addNodes(state, payload);
      return Object.assign({}, state);
    // 销毁是子元素发出的请求
    case actionTypes.REMOVE_FLATTENED_NODE:
      nodeOperation.removeNode(state, payload.targetKey, payload.parentKey);
      return Object.assign({}, state);
    // 批量删除节点
    // payload 为 {payloadData: [{targetKey: targetKey, parentKey, parentKey}]
    case actionTypes.REMOVE_FLATTENED_NODES:
      removeNodes(state, payload);
      return Object.assign({}, state);
    case actionTypes.MIXED_PROCESSING_FLATTENED_NODES:
      mixedProcessing(state, payload);
      return Object.assign({}, state);
      // return Object.assign({}, state);
    default:
      return state;
  }
};

const addNode = (node, payload) => {
  let { nodeData, targetKey, childKey } = payload;

  if (nodeData != null) {
    nodeOperation.addNode(node, targetKey, nodeData, childKey);
  } else {
    console.warn(`增加单个节点: 需要增加的节点数据为空`);
  }
};

const updateNodes = (node, payload) => {
  const { payloadData } = payload;
  // payloadData => [{nestedKey: nestedKey, value: value}]
  if (payloadData && Array.isArray(payloadData) && payloadData.length > 0) {
    for (let i = 0; i < payloadData.length; i++) {
      evalUpdate(node, payloadData[i].nestedKey, payloadData[i].value);
    }
  } else {
    console.warn(`批量更新节点: 需要更新的数据为空`);
  }
};

// 批量增加节点
const addNodes = (node, payload) => {
  // { payloadData: [{ nodeData: nodeData, targetKey: targetKey }]
  const { payloadData } = payload;
  if (payloadData && Array.isArray(payloadData) && payloadData.length > 0) {
    for (let i = 0; i < payloadData.length; i++) {
      addNode(node, payloadData[i]);
    }
  } else {
    console.warn(`批量增加节点: 需要增加的节点数据为空`);
  }
};

// 批量删除节点
const removeNodes = (node, payload) => {
  // {payloadData: [{targetKey: targetKey, parentKey, parentKey}]
  const { payloadData } = payload;
  if (payloadData && Array.isArray(payloadData) && payloadData.length > 0) {
    for (let i = 0; i < payloadData.length; i++) {
      nodeOperation.removeNode(node, payloadData[i].targetKey, payloadData[i].parentKey);
    }
  } else {
    console.warn(`批量删除节点: 需要删除的数据为空`);
  }
};


// 混合处理节点，重组
const mixedProcessing = (node, payload) => {
  // composite
  // payloadData => {updateNodes: {payloadData: []}, addNodes: {payloadData: []}, removeNodes:  {payloadData: []} }
  const { payloadData } = payload;
  if (!Array.isArray(payloadData) && payloadData !== null && typeof payloadData === "object") {
    if (payloadData.addNodes) {
      addNodes(node, payloadData.addNodes);
    }
    if (payloadData.removeNodes) {
      removeNodes(node, payloadData.removeNodes);
    }
    if (payloadData.updateNodes) {
      updateNodes(node, payloadData.updateNodes);
    }
  } else {
    console.warn(`复合操作节点: 复合节点数据为空`);
  }
};

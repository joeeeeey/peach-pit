/**
 * @file Redux actions of `node`.
 */
import { evalUpdate } from "utils/eval";
import nodeOperation from "utils/nodeOperation";

export default (state = null, action) => {
  if (action.target === "node") {
    let { value, targetKey, parentKey, nestedKey } = action.payload;
    switch (action.type) {
      case "replace":
        return action.payload;
      case "update":
        return evalUpdate(state, nestedKey, value);
      // 批量更新
      // payloadData => [{nestedKey: nestedKey, value: value}]
      case "updateNodes":
        updateNodes(state, action.payload);
        return state;
      // 增加单个节点， 父元素发出的请求
      case "addNode":
        addNode(state, action.payload);
        return state;
      // 批量增加节点
      // { payloadData: [{ nodeData: nodeData, targetKey: targetKey }]
      case "addNodes":
        addNodes(state, action.payload);
        return state;
      // 销毁是子元素发出的请求
      case "removeNode":
        // let { targetKey, parentKey } = action.payload;
        nodeOperation.removeNode(state, targetKey, parentKey);
        return state;
      // 批量删除节点
      // payload 为 {payloadData: [{targetKey: targetKey, parentKey, parentKey}]
      case "removeNodes":
        removeNodes(state, action.payload);
        return state;
      case "composite":
        recombinateNodes(state, action.payload);
        return state;
      default:
        return state;
    }
  } else {
    return state;
  }
};

function addNode(node, payload) {
  let { nodeData, targetKey, level, childKey } = payload;

  if (nodeData != null) {
    nodeOperation.addNode(node, targetKey, nodeData, childKey);
  } else {
    console.warn(`增加单个节点: 需要增加的节点数据为空`);
  }
}

function updateNodes(node, payload) {
  const { payloadData } = payload;
  // payloadData => [{nestedKey: nestedKey, value: value}]
  if (payloadData && Array.isArray(payloadData) && payloadData.length > 0) {
    for (let i = 0; i < payloadData.length; i++) {
      evalUpdate(node, payloadData[i].nestedKey, payloadData[i].value);
    }
  } else {
    console.warn(`批量更新节点: 需要更新的数据为空`);
  }
}

// 批量删除节点
function removeNodes(node, payload) {
  // {payloadData: [{targetKey: targetKey, parentKey, parentKey}]
  const { payloadData } = payload;
  if (payloadData && Array.isArray(payloadData) && payloadData.length > 0) {
    for (let i = 0; i < payloadData.length; i++) {
      nodeOperation.removeNode(
        node,
        payloadData[i].targetKey,
        payloadData[i].parentKey
      );
    }
  } else {
    console.warn(`批量删除节点: 需要删除的数据为空`);
  }
}

// 批量增加节点
function addNodes(node, payload) {
  // { payloadData: [{ nodeData: nodeData, targetKey: targetKey }]
  const { payloadData } = payload;
  if (payloadData && Array.isArray(payloadData) && payloadData.length > 0) {
    for (let i = 0; i < payloadData.length; i++) {
      addNode(node, payloadData[i]);
    }
  } else {
    console.warn(`批量增加节点: 需要增加的节点数据为空`);
  }
}

// 复合操作节点，重组
function recombinateNodes(node, payload) {
  // composite
  // payloadData => {updateNodes: {payloadData: []}, addNodes: {payloadData: []}, removeNodes:  {payloadData: []} }
  const { payloadData } = payload;
  if (
    !Array.isArray(payloadData) &&
    payloadData !== null &&
    typeof payloadData === "object"
  ) {
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
}
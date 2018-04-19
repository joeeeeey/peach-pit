import nodeOperation from '../utils/nodeOperation'

// 调整 store 的结构
// { user: {}, node: {}, administrator: {}, editPage:{role: 'admin', source: 'template', id: 5} }

// action 结构
// target 代表操作 store 中的某个节点
// => {target: 'node', type: 'replace', payload: {}}
export default (state = { user: {} }, action) => {
  console.log(`store action here ${action.type}`)
  if (action.target === 'node') {
    switch (action.type) {
      case 'replace':
        state.node = action.payload
        return state
      case 'update':
        let { value } = action.payload
        evalUpdate(state['node'], action.payload.nestedKey, value)
        return state

      // 批量更新
      // payloadData => [{nestedKey: nestedKey, value: value}]              
      case 'updateNodes':
        updateNodes(state.node, action.payload)
        return state
      // 增加单个节点， 父元素发出的请求
      case 'addNode':
        addNode(state.node, action.payload)
        return state
      // 批量增加节点
      // { payloadData: [{ nodeData: nodeData, targetKey: targetKey }]
      case 'addNodes':
        addNodes(state.node, action.payload)
        return state
      // 销毁是子元素发出的请求
      case 'removeNode':
        let { targetKey, parentKey } = action.payload
        nodeOperation.removeNode(state.node, targetKey, parentKey)
        return state
      // 批量删除节点
      // payload 为 {payloadData: [{targetKey: targetKey, parentKey, parentKey}]
      case 'removeNodes':
        removeNodes(state.node, action.payload)
        return state
      case 'composite':
        recombinateNodes(state.node, action.payload)
        return state
      /* 不加这个注释就会有 warning */
      default:
        return state
    }
  } else if (action.target === 'user') {
    switch (action.type) {
      case 'update':
        let { value } = action.payload

        evalUpdate(state['user'], action.payload.nestedKey, value)
        return state
      case 'replace':
        state.user = action.payload
        return state
      /* 不加这个注释就会有 warning */
      default:
        return state
    }
  } else if (action.target === 'administrator') {
    switch (action.type) {
      case 'update':
        let { value } = action.payload

        evalUpdate(state['administrator'], action.payload.nestedKey, value)
        return state
      case 'replace':
        state.administrator = action.payload
        return state
      /* 不加这个注释就会有 warning */
      default:
        return state
    }
  } else if (action.target === 'editInfo') {
    switch (action.type) {
      case 'replace':
        state.editInfo = action.payload
        return state
      /* 不加这个注释就会有 warning */
      default:
        return state
    }
  }
  else {
    return state
  }
}

function addNode(node, payload) {
  let { nodeData, targetKey } = payload
  if (nodeData != null) {
    nodeOperation.addNode(
      node,
      targetKey,
      nodeOperation.flattenDomTree(nodeData)
    )
  } else {
    console.warn(`增加单个节点: 需要增加的节点数据为空`)
  }
}

function getConnectKeys(nestedKey) {
  let keys = nestedKey.split(',')
  let connectKeys = ""
  for (let i = 0; i < keys.length; i++) {
    connectKeys += `['${keys[i]}']`
  }
  return connectKeys
}

function evalUpdate(data, nestedKey, value) {
  eval(`data${getConnectKeys(nestedKey)}=value`)
}

function updateNodes(node, payload) {
  const { payloadData } = payload
  // payloadData => [{nestedKey: nestedKey, value: value}]
  if (payloadData && Array.isArray(payloadData) && payloadData.length > 0) {
    for (let i = 0; i < payloadData.length; i++) {
      evalUpdate(node, payloadData[i].nestedKey, payloadData[i].value)
    }
  } else { console.warn(`批量更新节点: 需要更新的数据为空`) }
}

// 批量删除节点
function removeNodes(node, payload) {
  // {payloadData: [{targetKey: targetKey, parentKey, parentKey}]
  const { payloadData } = payload
  if (payloadData && Array.isArray(payloadData) && payloadData.length > 0) {
    for (let i = 0; i < payloadData.length; i++) {
      nodeOperation.removeNode(node, payloadData[i].targetKey, payloadData[i].parentKey)
    }
  } else { console.warn(`批量删除节点: 需要删除的数据为空`) }
}

// 批量增加节点
function addNodes(node, payload) {
  // { payloadData: [{ nodeData: nodeData, targetKey: targetKey }]
  const { payloadData } = payload
  if (payloadData && Array.isArray(payloadData) && payloadData.length > 0) {
    for (let i = 0; i < payloadData.length; i++) {
      addNode(node, payloadData[i])
    }
  } else { console.warn(`批量增加节点: 需要增加的节点数据为空`) }
}


// 复合操作节点，重组
function recombinateNodes(node, payload) {
  // composite
  // payloadData => {updateNodes: {payloadData: []}, addNodes: {payloadData: []}, removeNodes:  {payloadData: []} }
  const { payloadData } = payload
  if (!Array.isArray(payloadData) && payloadData !== null && typeof payloadData === 'object') {
    if (payloadData.addNodes) { addNodes(node, payloadData.addNodes) }
    if (payloadData.removeNodes) { removeNodes(node, payloadData.removeNodes) }
    if (payloadData.updateNodes) { updateNodes(node, payloadData.updateNodes) }
  } else {
    console.warn(`复合操作节点: 复合节点数据为空`)
  }
}



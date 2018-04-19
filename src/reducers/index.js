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
        evalUpdate(state['node'], action, value)
        return state
      // 增加是父元素发出的请求
      case 'addNode':
        addNode(state.node, action)
        return state

      // 销毁是子元素发出的请求
      case 'removeNode':
        let { targetKey, parentKey } = action.payload
        nodeOperation.removeNode(state.node, targetKey, parentKey)
        return state
      /* 不加这个注释就会有 warning */
      default:
        return state
    }
  } else if (action.target === 'user') {
    switch (action.type) {
      case 'update':
        let { value } = action.payload

        evalUpdate(state['user'], action, value)
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

        evalUpdate(state['administrator'], action, value)
        return state
      case 'replace':
        state.administrator = action.payload
        return state
      /* 不加这个注释就会有 warning */
      default:
        return state
    }
  }else if (action.target === 'editInfo'){
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

function evalUpdate(data, action, value) {
  eval(`data${getConnectKeys(action)}=value`)
}

function addNode(state, action) {
  let { nodeData, targetKey } = action.payload

  if (nodeData != null) {
    nodeOperation.addNode(
      state,
      targetKey,
      nodeOperation.flattenDomTree(nodeData)
    )
  }
}

function getConnectKeys(action) {
  let { nestedKey } = action.payload
  let keys = nestedKey.split(',')
  let connectKeys = ""
  for (let i = 0; i < keys.length; i++) {
    connectKeys += `['${keys[i]}']`
  }
  return connectKeys
}

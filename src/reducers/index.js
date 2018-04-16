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
        console.log(state.node)
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
  let { nodeName, selfKey, nodeData } = action.payload

  nodeData = nodeData ? nodeData : nodeDefaultProps(nodeName)

  if (nodeData != null) {
    nodeOperation.addNode(
      state,
      selfKey,
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

// TODO 这个方法内容可以存储数据库 
// 增加元素的时候从后端取得数据展示成可添加内容
// 直接在添加时把对象传过来
function nodeDefaultProps(nodeName) {
  switch (nodeName) {
    case 'TextArea':
      return {
        native: false, nodeName: 'VerticalGrid', props: { style: {} },
        children: [
          {
            native: false, nodeName: 'TextArea', props:
              {
                content: "hello1", style:
                  { fontSize: 30, fontWeight: 500, color: "#1c1a1a", float: "center" }
              }
          },
          {
            native: false, nodeName: 'TextArea', props:
              {
                content: "hello2", style:
                  { fontSize: 30, fontWeight: 500, color: "#1c1a1a", float: "center" }
              }
          }
        ]
      }
    case 'LetfRightGrid':
      return {
        native: false, nodeName: 'LetfRightGrid',
        children: [
          { native: false, nodeName: 'TextArea', props: { content: '好吃的东西', style: { textAlign: 'center', fontSize: 30, fontWeight: 500, color: "#1c1a1a" }, } },
          { native: false, nodeName: 'TextArea', props: { content: '就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。啊啊 啊啊啊啊啊啊啊啊', style: { textAlign: 'center', fontSize: 20, fontWeight: 400, color: "#1c1a1a", float: "center" } } },

          {
            native: false, nodeName: 'Card', props: { style: { maxWidth: 'auto', marginLeft: 20 } },
            children: [{ native: false, nodeName: 'CardMedia', props: { style: { height: 280 }, image: "/images/ORG_DSC01034.jpg" } }]
          },

        ]
      }
    /* falls through */
    default:
      return null
  }
}



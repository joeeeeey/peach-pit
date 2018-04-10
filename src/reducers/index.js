import nodeOperation from '../share/nodeOperation'

export default (state = {}, action) => {
  console.log(`store action here ${action.type}`)

  switch (action.type) {
    case 'replace':
      state = action.payload
      return state
    case 'update':
      let { value } = action.payload
      eval(`state${getConnectKeys(action)}=value`)
      return state    
    // 增加是父元素发出的请求，销毁是子元素发出的请求
    case 'addNode':
      addNode(state, action)
      return state
    case 'removeNode':  
      let { selfKey, parentKey} = action.payload

      nodeOperation.removeNode( state, selfKey, parentKey )
    /* 不加这个注释就会有 warning */
    default:
      return state
  }
}

function addNode(state, action){
  let { nodeName, selfKey } = action.payload

  nodeOperation.addNode(
    state,
    selfKey,
    nodeOperation.flattenDomTree(nodeDefaultProps(nodeName)
    )
  )
}

function getConnectKeys(action){
  let {nestedKey  } = action.payload
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
    /* falls through */
    default:
  }
}



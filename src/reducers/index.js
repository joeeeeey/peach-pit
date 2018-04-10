import md5 from 'md5';
export default (state = {}, action) => {
  console.log(`store action here ${action.type}`)

  switch (action.type) {
    case 'replace':
      state = action.payload
      return state
    case 'update':
      let { nestedKey, value } = action.payload
      let keys = nestedKey.split(',')
      let connectKeys = ""
      for (let i = 0; i < keys.length; i++) {
        connectKeys += `['${keys[i]}']`
      }
      eval(`state${connectKeys}=value`)
      return state
      // 增加是父元素发出的请求，销毁是子元素发出的请求
    case 'addNode':
      let {nodeName, selfKey} = action.payload
      // console.log(state)
      addNodes(state, selfKey, flattenDomTree(nodeDefaultProps(nodeName)))
    default:
      return state
  }
}

// TODO 这个方法内容可以存储数据库 
// 增加元素的时候从后端取得数据展示成可添加内容
// 直接在添加时把对象传过来
function nodeDefaultProps(nodeName) {
  switch (nodeName) {
    case 'TextArea':
      return           {
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
  }
}


// 根据 parentKey 找到childrenKeys, 将 selfKey 加入
// 在 _relation 中加入自身的 relation, 并将自身除了 _root, _relation 合并到原 store
function addNodes(currentDom, nodeKey, newNode){
  // 目前的 dom
  let nodeChildren = currentDom._relation[nodeKey] || []
  
  let {_relation, _root, ...newNodeData} = newNode
  // let newNodeRootKey = newNodes._relation._root
  // 新加的节点必须有根节点
  if(_root===null){
    return
  } 
  // 合并 relation 
  nodeChildren.push(_root)
  Object.assign(currentDom._relation, _relation)

  // 合并节点内容
  Object.assign(currentDom, newNodeData)
  return currentDom
}


// { _relation: 
//   { '(0){div}': 
//      [ '(0){div}(0){AppBar}',
//        '(0){div}(1){h1}',
//        '(0){div}(2){FullWidthGrid}' ] },
//  _root: '(0){div}',
//  '(0){div}': { native: true, nodeName: 'div', props: { style: [Object] } },
//  '(0){div}(0){AppBar}': { native: false, nodeName: 'AppBar', props: null },
//  '(0){div}(1){h1}': 
//   { native: true,
//     nodeName: 'h1',
//     props: { style: [Object] },
//     children: 'Hello World' },
//  '(0){div}(2){FullWidthGrid}': 
//   { native: false,
//     nodeName: 'FullWidthGrid',
//     props: { containerConfig: [Object], itemsConfig: [Object] } } }

function incryptKey(key){
  return md5(`${Math.random().toString()+key}`)
}

function flattenDomTree(nodeData, parentKey = '', flattenData = { _relation: {} }){
  // 是根节点的情况
  if (!Array.isArray(nodeData) && nodeData !== null && typeof nodeData === 'object') {
    let rootKey = `${nodeData.nodeName}_${incryptKey(nodeData.nodeName)}`
    flattenData._root = rootKey
    // nodeData = [nodeData]
    let { children, ...value } = nodeData;
    
    if (Array.isArray(children) && children.length > 0) {
      flattenData[rootKey] = value
      flattenDomTree(children, rootKey, flattenData)
    } else {
      flattenData[rootKey] = nodeData
      return flattenData
    }      
  }

  // 是子节点
  for (let i = 0; i < nodeData.length; i++) {
    let node = nodeData[i]
    let key = `${node.nodeName}_${incryptKey(node.nodeName)}`
    if (parentKey !== '') {
      let childrenKeys = flattenData._relation[parentKey]
      if (Array.isArray(childrenKeys) && childrenKeys.length > 0) {
        childrenKeys.push(key)
      } else {
        flattenData._relation[parentKey] = [key]
      }
    }
    let { children, ...value } = node;
    if (Array.isArray(children) && children.length > 0) {
      flattenData[key] = value
      flattenData = flattenDomTree(children, key, flattenData)
    } else {
      flattenData[key] = node
    }
  }
  return flattenData
}
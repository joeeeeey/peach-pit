import md5 from 'md5';

function randomStr() {
  // random 两次使碰撞几率/2 TODO 加强
  // 页面组件数量达到 100000000 时达到 50% 碰撞概率
  return `${(Math.random() + Math.random()).toString()}`
}

function incryptKey(key) {
  return md5(`${randomStr() + key}`)
}

function arrayPresent(array) {
  if (array && Array.isArray(array) && array.length > 0) {
    return true
  } else {
    return false
  }
}

function objectPresent(obj) {
  if (!Array.isArray(obj) && obj !== null && typeof obj === 'object') {
    return true
  } else {
    return false
  }
}

// 向当前节点增加新节点 (更新降维后的 dom tree data)
//   根据 parentKey 找到childrenKeys, 将 selfKey 加入
//   在 _relation 中加入自身的 relation, 并将自身除了 _root, _relation 合并到原 store
function addNode(currentDom, nodeKey, newNode) {
  if(!currentDom._relation[nodeKey]){currentDom._relation[nodeKey] = []}
  let nodeChildren = currentDom._relation[nodeKey]

  let { _relation, _root, ...newNodeData } = newNode
  // let newNodeRootKey = newNodes._relation._root
  // 新加的节点必须有根节点
  if (_root === null) {
    return
  }
  // 合并 relation 
  nodeChildren.push(_root)

  Object.assign(currentDom._relation, _relation)

  // 合并节点内容
  Object.assign(currentDom, newNodeData)
  return currentDom
}


// 去除当前节点
// 采用自上而下的方式去除，好处是代码简便，坏处是如果中途出现问题，子节点会失去关联滞留在树中(升维后是否消失?)
function removeNode(currentDom, targetKey, parentKey) {
  let _relation = currentDom._relation

  // 若要删除所有元素，则会保留根节点
  if (targetKey === currentDom._root) {
    let rootChildrenKeys = _relation[targetKey]
    if (arrayPresent(rootChildrenKeys)) {
      for (let i = 0; i < rootChildrenKeys.length; i++) {
        removeNode(currentDom, rootChildrenKeys[i], targetKey)
      }
    }
  } else {
    currentDom._relation[parentKey] = currentDom._relation[parentKey].filter(
      childrenKey => childrenKey !== targetKey
    )
    // 去除该节点内容
    delete currentDom[targetKey]

    let selfChildrenKeys = _relation[targetKey]
    if (arrayPresent(selfChildrenKeys)) {
      for (let i = 0; i < selfChildrenKeys.length; i++) {
        removeNode(currentDom, selfChildrenKeys[i], targetKey)
      }
    }
  }


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




function doHeighten(flattenData, startDom = null){
  let domData = flattenData[startDom]
  if (domData.props) {
    delete domData.props['selfkey']
    delete domData.props['parentkey']
  }
  let childrenNames = flattenData._relation[startDom]
  if (Array.isArray(childrenNames) && childrenNames.length > 0) {
    domData.children = []
    for (let i = 0; i < childrenNames.length; i++) {
      domData.children.push(doHeighten(flattenData, childrenNames[i]))
    }
  }
  return domData
}


// 需要去除最外层的 root, 若 root children 只有一个元素, 则保存该元素
// 否则增加一层 {"native":true,"nodeName":"div"}
function heightenDomTree(flattenData) {
  if(objectPresent(flattenData)){
    const rootKey = flattenData._root
    if(rootKey){
      let childrenNames = flattenData._relation[rootKey]
      if(childrenNames.length===1){
        return doHeighten(flattenData, childrenNames[0])
      }else{
        flattenData[rootKey] = { native: true, nodeName: 'div'}
        return doHeighten(flattenData, rootKey)
      }
    }else{
      console.log("ERROR, NEED ROOT KEY")
    }
  }
}

// // 还原, dom tree object 升维
// // 在新建，更新 tmp, layout 使用

// function heightenDomTree(flattenData, startDom = null) {
//   if (startDom === null) {
//     startDom = flattenData._root
//   }
//   let domData = flattenData[startDom]
//   if (domData.props) {
//     delete domData.props['selfkey']
//     delete domData.props['parentkey']
//   }
//   let childrenNames = flattenData._relation[startDom]
//   if (Array.isArray(childrenNames) && childrenNames.length > 0) {
//     domData.children = []
//     for (let i = 0; i < childrenNames.length; i++) {
//       domData.children.push(heightenDomTree(flattenData, childrenNames[i]))
//     }
//   }

//   return domData
// }

// dom tree object 降维
function flattenDomTree(nodeData, parentKey = '', flattenData = { _relation: {} }) {
  // 是根节点的情况
  if (!Array.isArray(nodeData) && nodeData !== null && typeof nodeData === 'object') {
    let rootKey = `${nodeData.nodeName}_${incryptKey(nodeData.nodeName)}`
    flattenData._root = rootKey
    // nodeData = [nodeData]
    let { children, ...value } = nodeData;
    if (arrayPresent(children)) {
      flattenData[rootKey] = value
      flattenDomTree(children, rootKey, flattenData)
    } else {
      // 根节点没儿子
      flattenData[rootKey] = nodeData
      flattenData._relation[rootKey] = []
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



function getClassName(action) {
  switch (action) {
    case 'edit':
      return 'Components.Editable'
    case 'preview':
      return 'Components.Preview'
    case 'deploy':
      return 'Preview'
    default:
      return ''
  }
}

// 降维数据转化为代码
function flattenedData2Code(flattenData, action, selfDomKey = null, parentDomKey = 'root', code = "") {
  // console.log('flattenedData2Code')
  if (flattenData === null) {
    return code;
  }
  if (selfDomKey === null) {
    selfDomKey = flattenData._root
  }
  let data = flattenData[selfDomKey]
  let tagName;
  if (data.native) {
    tagName = JSON.stringify(data.nodeName)
  } else {
    tagName = `${getClassName(action) + data.nodeName}`
  }

  // let tagName = data.native ? JSON.stringify(data.nodeName) : `Components.Editable${data.nodeName}`
  let props = data.props
  if (props !== null && typeof props === 'object' && !Array.isArray(props)) {
    props.selfkey = selfDomKey
    props.parentkey = parentDomKey
  } else {
    props = { selfkey: selfDomKey, parentkey: parentDomKey }
  }

  props = JSON.stringify(props)

  let childrenNames = flattenData._relation[selfDomKey]
  let children = data.children
  let childrenCode = ""
  if (typeof children === 'string') {
    childrenCode += `,\n${JSON.stringify(children)}`
  } else if (Array.isArray(childrenNames) && childrenNames.length > 0) {
    for (let i = 0; i < childrenNames.length; i++) {
      childrenCode += flattenedData2Code(flattenData, action, childrenNames[i], selfDomKey, ",\n")
    }
  }

  code +=
    `React.createElement(
        ${tagName},
        ${props}${childrenCode}
    )`
  return code
}

const nodeOperation = {
  flattenDomTree: flattenDomTree,
  heightenDomTree: heightenDomTree,
  flattenedData2Code: flattenedData2Code,
  addNode: addNode,
  removeNode: removeNode,
}
export default nodeOperation;
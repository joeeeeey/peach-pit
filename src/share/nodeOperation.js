import md5 from 'md5';

function randomStr(){
  return `${(Math.random()+Math.random()).toString()}`
}

function incryptKey(key) {
  return md5(`${randomStr() + key}`)
}

// 向当前节点增加新节点 (更新降维后的 dom tree data)
//   根据 parentKey 找到childrenKeys, 将 selfKey 加入
//   在 _relation 中加入自身的 relation, 并将自身除了 _root, _relation 合并到原 store
function addNode(currentDom, nodeKey, newNode) {
  let nodeChildren = currentDom._relation[nodeKey] || []

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
function removeNode(currentDom, selfKey, parentKey){
  let _relation = currentDom._relation
  currentDom._relation[parentKey] = currentDom._relation[parentKey].filter(
    childrenKey => childrenKey !== selfKey
  )
  // 去除该节点内容
  delete currentDom[selfKey]

  let selfChildrenKeys = _relation[selfKey]
  if(selfChildrenKeys && Array.isArray(selfChildrenKeys) && selfChildrenKeys.length > 0){
    for (let i = 0; i < selfChildrenKeys.length; i++) {
      removeNode(currentDom, selfChildrenKeys[i], selfKey)
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




// dom tree object 降维
function flattenDomTree(nodeData, parentKey = '', flattenData = { _relation: {} }) {
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


// 降维数据转化为代码
function flattenedData2Code(flattenData, selfDomKey = null, parentDomKey = 'root', code = "", isEdit = true) {
  if (flattenData === null) {
    return code;
  }
  if (selfDomKey === null) {
    selfDomKey = flattenData._root
  }
  let data = flattenData[selfDomKey]
  let tagName = data.native ? JSON.stringify(data.nodeName) : `Components.Editable${data.nodeName}`

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
      childrenCode += flattenedData2Code(flattenData, childrenNames[i], selfDomKey, ",\n", isEdit)
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
  flattenedData2Code: flattenedData2Code,
  addNode: addNode,
  removeNode: removeNode,
}
export default nodeOperation;
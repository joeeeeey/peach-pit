import md5 from "md5";

function randomStr() {
  // random 两次使碰撞几率/2 TODO 加强
  // 页面组件数量达到 100000000 时达到 50% 碰撞概率
  return `${(Math.random() + Math.random()).toString()}`;
}

function incryptKey(key) {
  return md5(`${randomStr() + key}`);
}

function arrayPresent(array) {
  if (array && Array.isArray(array) && array.length > 0) {
    return true;
  } else {
    return false;
  }
}

function objectPresent(obj) {
  if (!Array.isArray(obj) && obj !== null && typeof obj === "object") {
    return true;
  } else {
    return false;
  }
}

// 向当前节点增加新节点 (更新降维后的 dom tree data)
//   根据 parentKey 找到childrenKeys, 将 selfKey 加入
//   在 _relation 中加入自身的 relation, 并将自身除了 _root, _relation 合并到原 store
//   若 childKey 存在，则需要找到 parentkey 中的 childKey 位置在后方插入
function addNode(currentDom, parentKey, newNode, childKey = null) {
  if (!currentDom._relation[parentKey]) {
    currentDom._relation[parentKey] = [];
  }

  let nodeChildren = currentDom._relation[parentKey];

  // 传入时是个多层对象，需要降维
  newNode = flattenDomTree(newNode);

  let { _relation, _root, ...newNodeData } = newNode;
  // let newNodeRootKey = newNodes._relation._root
  // 新加的节点必须有根节点
  if (_root === null) {
    return;
  }

  // 合并 relation key
  if (childKey) {
    nodeChildren.splice(nodeChildren.indexOf(childKey), 0, _root);
  } else {
    nodeChildren.push(_root);
  }

  Object.assign(currentDom._relation, _relation);

  // 合并节点内容
  Object.assign(currentDom, newNodeData);
  return currentDom;
}

// 去除当前节点
// 采用自上而下的方式去除，好处是代码简便，坏处是如果中途出现问题，子节点会失去关联滞留在树中(升维后是否消失?)
function removeNode(currentDom, targetKey, parentKey) {
  let _relation = currentDom._relation;

  // 若要删除所有元素，则会保留根节点
  if (targetKey === currentDom._root) {
    let rootChildrenKeys = _relation[targetKey];
    if (arrayPresent(rootChildrenKeys)) {
      for (let i = 0; i < rootChildrenKeys.length; i++) {
        removeNode(currentDom, rootChildrenKeys[i], targetKey);
      }
    }
  } else {
    currentDom._relation[parentKey] = currentDom._relation[parentKey].filter(
      childrenKey => childrenKey !== targetKey
    );
    // 去除该节点内容
    delete currentDom[targetKey];

    let selfChildrenKeys = _relation[targetKey];
    if (arrayPresent(selfChildrenKeys)) {
      for (let i = 0; i < selfChildrenKeys.length; i++) {
        removeNode(currentDom, selfChildrenKeys[i], targetKey);
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

function doHeighten(flattenData, startDom = null, isLayout = false) {
  let domData = flattenData[startDom];
  if (isLayout) {
    if (domData.props) {
      delete domData.props["id"];
      delete domData.props["selfkey"];
    }
  } else {
    if (domData.props) {
      domData.props.selfkey = startDom;
    } else {
      domData.props = {};
      domData.props.selfkey = startDom;
    }
  }

  // if (domData.props) {
  //   if (isLayout) {
  //     delete domData.props['id']
  //     delete domData.props['selfkey']
  //   } else {
  //     domData.props.selfkey = startDom
  //   }
  // } else {
  //   domData.props = {}
  //   domData.props.selfkey = startDom
  // }

  let childrenNames = flattenData._relation[startDom];
  if (Array.isArray(childrenNames) && childrenNames.length > 0) {
    domData.children = [];
    for (let i = 0; i < childrenNames.length; i++) {
      domData.children.push(
        doHeighten(flattenData, childrenNames[i], isLayout)
      );
    }
  }
  return domData;
}

// navbar 更新的方案, navbar 的 props.rootChildren 中需要存储当前顶层节点的内容
// navbar 必须知道总共的节点
function satisfyNavBar(flattenData, rootKey) {
  let rootNode = flattenData[rootKey];

  let navBarChildren = rootNode.props.navBarChildren;

  if (navBarChildren) {
    // 目前只能遍历查找，但其实 props 里的 selfkey 和 parentkey 应该被存下来
    let topLeaveKeys = flattenData._relation[rootKey];

    let navBarNode = null;
    for (let i = 0; i < topLeaveKeys.length; i++) {
      if (flattenData[topLeaveKeys[i]].nodeName === "NavBar") {
        navBarNode = flattenData[topLeaveKeys[i]];
        break;
      }
    }
    navBarNode.props.rootChildren = navBarChildren;
  }
  return flattenData;
}

// 需要去除最外层的 root, 若 root children 只有一个元素, 则保存该元素
// 否则增加一层 {"native":true,"nodeName":"div"}
function heightenDomTree(flattenData, options = { isLayout: false }) {
  const { isLayout } = options;
  if (objectPresent(flattenData)) {
    const rootKey = flattenData._root;
    if (rootKey) {
      // root 也是有样式的
      flattenData = satisfyNavBar(flattenData, rootKey);

      let { native, nodeName, ...remained } = flattenData[rootKey];

      flattenData[rootKey] = { native: true, nodeName: "div", ...remained };
      return doHeighten(flattenData, rootKey, isLayout);
    } else {
      console.warn("ERROR, NEED ROOT KEY");
    }
  }
}

// {nodeName: 'div', children: []}
//  div 替换为 root
function wrapRoot(block = null) {
  if (block) {
    const domString = block.data;
    const domData = JSON.parse(domString);
    return {
      native: false,
      nodeName: "Root",
      children: domData.children,
      props: domData.props || { style: {} }
    };
  } else {
    return {
      native: false,
      nodeName: "Root",
      children: [],
      props: { style: {} }
    };
  }
}

// dom tree object 降维
function flattenDomTree(
  nodeData,
  parentKey = "",
  flattenData = { _relation: {} }
) {
  // 是根节点的情况
  if (
    !Array.isArray(nodeData) &&
    nodeData !== null &&
    typeof nodeData === "object"
  ) {
    let rootKey = null;
    if (nodeData.props && nodeData.props.id) {
      rootKey = nodeData.props.id;
    } else if (nodeData.props && nodeData.props.selfkey) {
      rootKey = nodeData.props.selfkey;
    } else {
      rootKey = `${nodeData.nodeName}_${incryptKey(nodeData.nodeName)}`;
    }
    flattenData._root = rootKey;
    // nodeData = [nodeData]
    let { children, ...value } = nodeData;
    if (arrayPresent(children)) {
      flattenData[rootKey] = value;
      flattenDomTree(children, rootKey, flattenData);
    } else {
      // 根节点没儿子
      flattenData[rootKey] = nodeData;
      flattenData._relation[rootKey] = [];
      return flattenData;
    }
  }

  // 是子节点
  for (let i = 0; i < nodeData.length; i++) {
    let node = nodeData[i];
    let key = null;
    // selfkey 优先与 id 一致，其次与之前的 selfkey 一致
    if (node.props && node.props.id) {
      key = node.props.id;
    } else if (node.props && node.props.selfkey) {
      key = node.props.selfkey;
    } else {
      key = `${node.nodeName}_${incryptKey(node.nodeName)}`;
    }
    if (parentKey !== "") {
      let childrenKeys = flattenData._relation[parentKey];
      if (Array.isArray(childrenKeys) && childrenKeys.length > 0) {
        childrenKeys.push(key);
      } else {
        flattenData._relation[parentKey] = [key];
      }
    }
    let { children, ...value } = node;
    if (Array.isArray(children) && children.length > 0) {
      flattenData[key] = value;
      flattenData = flattenDomTree(children, key, flattenData);
    } else {
      flattenData[key] = node;
    }
  }
  return flattenData;
}

function getClassName(action) {
  switch (action) {
    case "edit":
      return "Components.Editable";
    case "preview":
      return "Components.Preview";
    case "deploy":
      return "Preview";
    default:
      return "";
  }
}

// 降维数据转化为代码
function flattenedData2Code(
  flattenData,
  action,
  selfDomKey = null,
  parentDomKey = "root",
  code = ""
) {
  if (flattenData === null) {
    return code;
  }
  if (selfDomKey === null) {
    selfDomKey = flattenData._root;
  }
  let data = flattenData[selfDomKey];
  let tagName;
  if (data.native) {
    tagName = JSON.stringify(data.nodeName);
  } else {
    tagName = `${getClassName(action) + data.nodeName}`;
  }

  // let tagName = data.native ? JSON.stringify(data.nodeName) : `Components.Editable${data.nodeName}`
  let props = data.props;
  if (props !== null && typeof props === "object" && !Array.isArray(props)) {
    props.selfkey = selfDomKey;
    props.parentkey = parentDomKey;
  } else {
    props = { selfkey: selfDomKey, parentkey: parentDomKey };
  }

  props = JSON.stringify(props);

  let childrenNames = flattenData._relation[selfDomKey];
  let children = data.children;
  let childrenCode = "";
  if (typeof children === "string") {
    childrenCode += `,\n${JSON.stringify(children)}`;
  } else if (Array.isArray(childrenNames) && childrenNames.length > 0) {
    for (let i = 0; i < childrenNames.length; i++) {
      childrenCode += flattenedData2Code(
        flattenData,
        action,
        childrenNames[i],
        selfDomKey,
        ",\n"
      );
    }
  }

  code += `React.createElement(
        ${tagName},
        ${props}${childrenCode}
    )`;
  return code;
}

const nodeOperation = {
  flattenDomTree: flattenDomTree,
  heightenDomTree: heightenDomTree,
  flattenedData2Code: flattenedData2Code,
  addNode: addNode,
  removeNode: removeNode,
  incryptKey: incryptKey,
  wrapRoot: wrapRoot
};
export default nodeOperation;

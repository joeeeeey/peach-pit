// import React from "react";
// import PropTypes from "prop-types";
// import nodeOperation from "utils/nodeOperation";
// import BlockService from "services/blockService";
// import CdnService from "services/cdnService";
// // 此处需要引入所有可编辑组件
// import EditableRoot from "components/edit/root";
// import EditableTextArea from "components/edit/textArea";
// import EditableVerticalLayout from "components/edit/verticalLayout";
// import EditableVerticalGrid from "components/edit/verticalGrid";
// import EditableImageArea from "components/edit/imageArea";
// import EditableNavBar from "components/edit/navBar";
// import EditablePhotoGallery from "components/edit/photoGallery";
// import EditableImageDescription from "components/edit/imageDescription";

// // 测试的组件
// // import Test from '../test'
// const cdnService = new CdnService();
// const blockService = new BlockService();
// /**
//  * Put all editable components here
//  */
// const widgets = {
//   EditableRoot: EditableRoot,
//   EditableTextArea: EditableTextArea,
//   EditableVerticalGrid: EditableVerticalGrid,
//   EditableVerticalLayout: EditableVerticalLayout,
//   EditableImageArea: EditableImageArea,
//   EditableNavBar: EditableNavBar,
//   EditablePhotoGallery: EditablePhotoGallery,
//   EditableImageDescription: EditableImageDescription
// };
// // const func = (function (React, Components) {
// //   return function App() {
// //     return (
// //       <div>
// //         {
// //           React.createElement(
// //             Components.AppBar,
// //             null
// //           )
// //         }
// //         {
// //           React.createElement(
// //             "h1",
// //             null,
// //             "Hello, world!")
// //         }
// //       </div>
// //     )
// //   }
// // })

// class Edit extends React.Component {
//   constructor(props, context) {
//     super(props);
//     this.state = { nodeData: null };
//   }

//   getSourceFromUrl = () => {
//     try {
//       const urlParams = new URL(window.location.href);
//       const source = urlParams.searchParams.get("source");
//       if (source.toString() !== "null") {
//         return { source: source, id: urlParams.searchParams.get("id") };
//       } else {
//         return { source: null };
//       }
//     } catch (error) {
//       alert("出现异常");
//       return { source: null };
//     }
//   };

//   getRoleNameFromStore = store => {
//     const userState = store.getState().user;
//     const adminState = store.getState().administrator;
//     if (userState && userState.isLogin) {
//       return "user";
//     } else if (adminState && adminState.isLogin) {
//       return "administrator";
//     } else {
//       return "unknown";
//     }
//   };

//   // 获取 '调用得到已上传的图片' 参数
//   // role 是用户则将所有 sites 上传的图片都找出
//   // admin 只找出当前 source id
//   getShowUploadedImageParams = (sourceInfo, role) => {
//     const { source, id } = sourceInfo;
//     let sourceId = null;
//     let traversal = null;
//     if (role === "user") {
//       sourceId = "";
//       traversal = true;
//     } else {
//       traversal = false;
//       sourceId = id || "tmp";
//     }

//     return {
//       page: "editPage",
//       role: role,
//       source: source || "layout",
//       sourceId: sourceId,
//       traversal: traversal
//     };
//   };

//   setEditInfoState = editInfo => {
//     this.context.store.dispatch({
//       type: "replace",
//       payload: editInfo,
//       target: "editInfo"
//     });
//   };

//   updateEditInfoState = (nestedKey, value) => {
//     this.context.store.dispatch({
//       type: "update",
//       payload: { nestedKey: nestedKey, value: value },
//       target: "editInfo"
//     });
//   };

//   // 最适合取到数据的地方
//   componentDidMount = () => {
//     // 根据`当前用户角色` 和 `资源` 初始化编辑页信息
//     const sourceInfo = this.getSourceFromUrl();
//     const role = this.getRoleNameFromStore(this.context.store);
//     const roleInfo = { role: role };
//     let editInfo = Object.assign({}, sourceInfo, roleInfo);

//     let params = this.getShowUploadedImageParams(editInfo, role);
//     this.setEditInfoState(editInfo);
//     cdnService
//       .showUploadedFiles(params)
//       .then(response => {
//         const { data } = response;
//         if (data.code === 0) {
//           // editInfo.uploadedImages = data.data.imageFiles
//           // this.setEditInfoState(editInfo)
//           this.updateEditInfoState(`uploadedImages`, data.data.imageFiles);
//         }
//       })
//       .catch(error => {
//         console.error(`获取已上传的图片出现异常: ${error}`);
//       });

//     if (editInfo.source) {
//       blockService
//         .getNodeDataInEditInfo(editInfo)
//         .then(response => {
//           const { data } = response;
//           if (data.code === 0) {
//             // {id: 1, name: 'dsd', thumb_url: 'xxx', data: '..'}
//             let block = data.data;
//             // editInfo.name = block.name

//             // 此处 setEditInfoState 需要在 initialNodeData 下方执行
//             // TODO why? 将两个 dispatch 合并
//             this.initialNodeData(block);
//           } else {
//             console.warn(data.msg);
//           }
//         })
//         .catch(function(error) {
//           console.warn(error);
//         });
//     } else {
//       this.initialNodeData();
//     }
//     this.unsubscribe = this.context.store.subscribe(this.listener);
//   };

//   // TODO 引入 react-redux
//   // Edit 组件根据顶层子元素的个数而改变
//   // 顶层子元素内部的变化则在元素内部处理

//   listener = () => {
//     // console.log('编辑页面监听到了 store  变化')
//     // 此处监听 store 的变化，只要发生了 dispatch 就都会被监听到
//     let { node } = this.context.store.getState();
    
//     if (typeof node === "string") {
//       return false;
//     }
//     const relation = node._relation;
//     const rootKey = node._root;
//     // console.log('node: ', node);
//     // console.log('relation: ', relation);
//     console.log('relation[rootKey]: ', relation[rootKey]);
//     if (relation[rootKey].length < 10) {
//       this.setState({ nodeData: node });
//     }
//     // console.log('node is: ', node);

//   };

//   // shouldComponentUpdate(nextProps) {
//   //   return true;
//   // }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   initialNodeData(block) {
//     console.log("initialNodeDatainitialNodeDatainitialNodeData");
//     let ftData = nodeOperation.flattenDomTree(this.wrapRoot(block));
//     // let ftData = nodeOperation.flattenDomTree(ftData)
//     // console.log(ftData)
//     this.setState({ nodeData: ftData });

//     this.context.store.dispatch({
//       type: "replace",
//       payload: ftData,
//       target: "node"
//     });
//     // 网站名称加入 editInfo 中
//     // value = block.name
//     if (block && block.name) {
//       this.updateEditInfoState(`name`, block.name);
//     }
//     // 此处 updateEditInfoState 一定要在 replace node 下方
//     // TODO why?
//   }

//   // {nodeName: 'div', children: []}
//   wrapRoot = (block = null) => {
//     return nodeOperation.wrapRoot(block);
//   };

//   toF = code => {
//     const func = new Function("React", "Components", `return ${code}`);
//     const App = func(React, widgets);

//     return App;
//   };

//   render = () => {
//     const codeString = nodeOperation.flattenedData2Code(JSON.parse(JSON.stringify(this.state.nodeData)), "edit");
//     const reactCode = this.toF(codeString);

//     console.log('reactCode: ', reactCode);

//     return <div>{reactCode}</div>;
//   };

//   getChildContext() {
//     return { store: this.context.store };
//   }
// }

// Edit.contextTypes = {
//   store: PropTypes.object
// };

// Edit.childContextTypes = {
//   store: PropTypes.object
// };

// export default Edit;

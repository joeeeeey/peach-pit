// 暂且不用
// 见 root preview
// 该方法若是放在子元素中调用
// window.open(url, '_blank') 始终返回 null
// 只能用 settimeout 和判断 解决，但这样会变成弹窗，容易被浏览器拦截 https://stackoverflow.com/questions/3923321/ie7-window-open-when-focus-return-null
// 所有还是将代码放在此处 TODO FIX THIS PROBLEM

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Button from 'material-ui/Button';
// import { message } from 'antd';
// import LayoutService from '../../../services/layoutService'
// import TemplateService from '../../../services/templateService'
// import nodeOperation from '../../../utils/nodeOperation'

// const layoutService = new LayoutService()
// const templateService = new TemplateService()
// const buttonStyle = { color: 'white', width: '100%', justifyContent: 'left' }

// export default class PreviewButton extends React.Component {
//   constructor(props, context) {
//     super(props);
//     this.service = null
//   }

//   doPreview = () => {
//     // 打开新链接 => /${role}/previewPage?source=${source}&id=${id}
//     if (this.context.store.getState().editInfo) {
//       const { source, id, role } = this.context.store.getState().editInfo
//       // update node
//       switch (source) {
//         case 'layout':
//           this.service = layoutService
//           break;
//         case 'template':
//           this.service = templateService
//           break;
//         case 'site':
//           // TODO 
//           break;
//         default:
//           break;
//       }
//       let parmas = {
//         id: id,
//       }
//       const nodeData = JSON.parse(JSON.stringify(this.context.store.getState().node));
//       parmas.data = JSON.stringify(nodeOperation.heightenDomTree(nodeData))

//       this.service.update(parmas)
//         .then(response => {
//           const { data } = response
//           console.log(data)
//           if (data.code === 0) {
//             const url = `/${role}/previewPage?source=${source}&id=${id}`
//             // 打开新页面
//             console.log(url)
//             // window.open(url, '_blank')
//             this.props.openPreviewPage(url)
//             // const win = window.open(url, '_blank');
//             // console.log(window.open(url, '_blank'))
//             // win.focus();
//           } else {
//             message.error(`😥 ${data.msg}`, 1.2)
//           }
//         })
//         .catch(function (error) {
//           message.error(`😥 出现异常: ${error}`, 2)
//         });

//     } else {
//       // TODO
//       // 特殊处理 admin source 为 null 的情况
//       // 将当前节点保存为新的 layout 并且 active 为 false,保存成功后 打开 source=layout 的链接
//     }
//   }

//   render() {
//     return (
//       <Button color="secondary" onClick={this.doPreview} style={buttonStyle}>
//         预览
//       </Button>
//     );
//   }
// }

// PreviewButton.contextTypes = {
//   store: PropTypes.object,
// };

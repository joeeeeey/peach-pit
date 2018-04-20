// 同等级增加元素的工具栏
// 既不是可编辑的布局，可不适合放在单独抽离
// 为了增强灵活性
// 将它设置为 edit 组件
// 但实际预览是不需要的
// 增加 onlyEdit 属性在预览时去掉为 true 的节点
// 像是精灵一样分布在各处，拥有强大的能力
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Icon from 'material-ui/Icon';
import { Menu, Dropdown, Popover } from 'antd';

const buttonStyle = { color: 'grey', width: '100%', justifyContent: 'left' }

// TextArea is Meta 组件， 应当封装为 h1, h2?
// 需要建表存储 meta

// function menu(f) {
//   return (
//     <Menu>
//       {[{ nodeName: 'TextArea', name: '文本框' }].map(item =>
//         <Menu.Item key={item.nodeName}>
//           <Button onClick={() => { f(item.nodeName) }} color="secondary" style={buttonStyle}>
//             {item.name}
//           </Button>
//         </Menu.Item>
//       )
//       }
//     </Menu>
//   )
// }

function popoverContent(f) {
  return (
    <div>
      <Button onClick={() => { f() }}> 确认删除该区域?</Button>
    </div>
  )
}

// {
//   native: false, nodeName: 'Spirit', onlyEdit: true,
//   props: { tools: [] }
// }

export default class RemoveNodeSpirit extends Component {
  constructor(props, context) {
    super(props);
  }


  confirmDeleteNode = () =>{
    console.log(`confirmDeleteNode`)
    console.log(this.props)
    this.context.store.dispatch({
      type: 'removeNode',
      payload: { targetKey: this.props.childrenkey, parentKey: this.props.parentkey },
      target: 'node',
    });
  }

  render() {
    const { } = this.props
    return (
      <Popover content={popoverContent(this.confirmDeleteNode)} trigger="click">
        <IconButton style={{ blackground: 'black', height: 30 }}>
          <DeleteIcon />
        </IconButton>
      </Popover>
    );
  }
}



RemoveNodeSpirit.contextTypes = {
  store: PropTypes.object
};




// import { Popover, Button } from 'antd';

// const content = (
//   <div>
//     <p>Content</p>
//     <p>Content</p>
//   </div>
// );

// ReactDOM.render(
//   <div>
//     <Popover content={content} title="Title" trigger="hover">
//       <Button>Hover me</Button>
//     </Popover>
//     <Popover content={content} title="Title" trigger="focus">
//       <Button>Focus me</Button>
//     </Popover>
//     <Popover content={content} title="Title" trigger="click">
//       <Button>Click me</Button>
//     </Popover>
//   </div>
// , mountNode);


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
import Icon from 'material-ui/Icon';
import { Menu, Dropdown } from 'antd';

const buttonStyle = { color: 'grey', width: '100%', justifyContent: 'left' }

// TextArea is Meta 组件， 应当封装为 h1, h2?
// 需要建表存储 meta

function menu(f) {
  return (
    <Menu>
      {[{ nodeName: 'TextArea', name: '文本框' }].map(item =>
        <Menu.Item key={item.nodeName}>
          <Button onClick={() => { f(item.nodeName) }} color="secondary" style={buttonStyle}>
            {item.name}
          </Button>
        </Menu.Item>
      )
      }
    </Menu>
  )
}

// {
//   native: false, nodeName: 'Spirit', onlyEdit: true,
//   props: { tools: [] }
// }

export default class EditableSpirit extends Component {
  constructor(props, context) {
    super(props);
    this.state = { visible: false }
  }

  // handleVisibleChange = (flag) => {
  //   this.setState({ visible: flag });
  // }

  add = (nodeName) => {
    // console.log(nodeName)
    const nodeData = this.getNodeDataByName(nodeName)
    // console.log(this.props.selfkey)
    console.log(this.props.parentkey)
    if(this.props.selfkey){

    }else{
      this.context.store.dispatch({
        type: 'addNode',
        payload: { targetKey: this.props.parentkey, nodeData: nodeData },
        target: 'node',
      });      
    }
      
    // 若是 selfkey 存在, 若明容器中有子元素，这时候增加子元素时候应该查找
    // _relation 中 selfkey 元素存在的位置，然后在后方 push 该节点
  }

  getNodeDataByName = (nodeName) => {
    // TODO 在数据库建表? META ? 或者都在此处配置?
    switch (nodeName) {
      case 'TextArea':
        return JSON.parse('{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"在此输入标题","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":1}}],"readOnly":false}}')
        break;

      default:
        break;
    }
  }



  render() {
    const { } = this.props
    return (
      <Dropdown overlay={menu(this.add)} trigger={['click']}
        >
        <div style={{ cursor: 'pointer', width: '100%', position: 'relative', textAlign: 'center' }}>
          <IconButton aria-label="Add an alarm" style={{ blackground: 'black', height: 30 }}>
            <AddIcon />
          </IconButton>
          <div key="toolbar" style={{ top: '48%', left: '5%', width: '90%', backgroundColor: 'black', height: 3, position: 'absolute' }}>
          </div>
        </div>
      </Dropdown>

    );
  }
}



EditableSpirit.contextTypes = {
  store: PropTypes.object
};





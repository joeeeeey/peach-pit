// 同等级增加元素的工具栏
// 不是可编辑的布局
// 像是精灵一样分布在各处，拥有强大的能力

// 接受 props: permanent boolean 
//  默认显示行为: 默认不显示，监听鼠标悬浮时显示，离开时消失
//  permanent 为 true 时则永久显示

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


export default class AddNodeSpirit extends Component {
  constructor(props, context) {
    super(props);
    this.state = { hidden: this.props.hidden || true}
  }

  hiddenSelf = () => {
    this.setState({hidden: true})
  }

  showSelf = () => {
    this.setState({hidden: false})
  }

  add = (nodeName) => {
    const nodeData = this.getNodeDataByName(nodeName)
    // console.log(this.props.childrenkey)
    if (this.props.childrenkey) {
      console.log(`TODO 在特定位置加入节点`)
      // TODO 在特定位置加入节点
    } else {
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
        <div style={{cursor: 'pointer', minHeight: 23}} onMouseOut={this.hiddenSelf} onMouseOver={this.showSelf}>
          <div hidden={!this.props.permanent && this.state.hidden} style={{textAlign:'center', width: '100%', position: 'relative' }}>
            <IconButton aria-label="Add an alarm" style={{ blackground: 'black', height: 22 }}>
              <AddIcon />
            </IconButton>
            <div key="toolbar" style={{ top: '48%', left: '5%', width: '90%', backgroundColor: 'black', height: 3, position: 'absolute' }}>
            </div>
          </div>
        </div>
      </Dropdown>
    );
  }
}



AddNodeSpirit.contextTypes = {
  store: PropTypes.object
};





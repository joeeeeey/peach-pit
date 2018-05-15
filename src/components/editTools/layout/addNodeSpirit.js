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
import { Menu, Dropdown } from 'antd';

const buttonStyle = { color: 'grey', width: '100%', justifyContent: 'left' }

// TextArea is Meta 组件， 应当封装为 h1, h2?
// 需要建表存储 meta

function menu(f) {
  return (
    <Menu>
      {[
        { nodeName: '文本框', name: '文本框' },
        { nodeName: '图片', name: '图片' },
        { nodeName: '图片说明', name: '图片说明' },
        { nodeName: '纵向布局', name: '纵向布局' },
        { nodeName: '展示说明', name: '展示说明' },
        { nodeName: '画廊', name: '画廊' },
        // { nodeName: '双纵向标题列表', name: '双纵向标题列表' },
      ].map(item =>
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
    this.state = { hidden: this.props.hidden || true }
  }

  hiddenSelf = () => {
    this.setState({ hidden: true })
  }

  showSelf = () => {
    this.setState({ hidden: false })
  }

  add = (nodeName) => {
    const nodeData = this.getNodeDataByName(nodeName)
    if (this.props.childrenkey) {
      // childKey
      this.context.store.dispatch({
        type: 'addNode',
        payload: { childKey: this.props.childrenkey, targetKey: this.props.parentkey, nodeData: nodeData },
        target: 'node',
      });
    } else {
      this.context.store.dispatch({
        type: 'addNode',
        payload: { targetKey: this.props.parentkey, nodeData: nodeData },
        target: 'node',
      });
    }

    // 若是 childrenkey 存在, 若明容器中有子元素，这时候增加子元素时候应该查找
    // _relation 中 parentkey 元素存在的位置，然后在 childrenkey 后方 push 该节点
  }

  getNodeDataByName = (nodeName) => {
    // TODO 在数据库建表? META ? 或者都在此处配置?
    // 需在数据库读取
    // 此处必须把数据库中数据  JSON.stringify 后得到。将 \n 转为 \\n
    switch (nodeName) {
      case '文本框':
        return JSON.parse('{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"在此输入标题","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":1}}],"readOnly":false}}')
      case '图片':
        return JSON.parse('{"native": false, "nodeName": "ImageArea", "props": { "alt": "initial", "src": "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/tmp/2f7ddd3dc6d11f62c204a2fd2adf0f47"}}')
      case '纵向布局':
        return JSON.parse('{"native":true,"nodeName":"div","props":{"style":{"paddingTop":0}},"children":[{"native":false,"nodeName":"VerticalLayout","props":{"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null},"flex":[4,8]},"layoutName":"纵向布局","children":[{"native":false,"nodeName":"VerticalGrid"},{"native":false,"nodeName":"VerticalGrid"}]}]}')
      case "图片说明":
        return JSON.parse('{"native":true,"nodeName":"div","props":{"style":{"paddingTop":0}},"children":[{"native":false,"nodeName":"ImageDescription","props":{"backgroundInfo":{"background":"#ffffff","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null},"column":3,"fullWithChilren":false},"children":[{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/tmp/2f7ddd3dc6d11f62c204a2fd2adf0f47"}},{"native":false,"nodeName":"VerticalLayout","props":{"flex":[12],"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null}},"children":[{"native":false,"nodeName":"VerticalGrid","children":[{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"标题","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":1}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"副标题","attributes":{"font":"serif","color":"#0066cc"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"说点什么..","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}}]}]}]},{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/tmp/2f7ddd3dc6d11f62c204a2fd2adf0f47"}},{"native":false,"nodeName":"VerticalLayout","props":{"flex":[12],"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null}},"children":[{"native":false,"nodeName":"VerticalGrid","children":[{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"标题","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":1}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"副标题","attributes":{"font":"serif","color":"#66a3e0"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"说点什么..","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}}]}]}]},{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/tmp/2f7ddd3dc6d11f62c204a2fd2adf0f47"}},{"native":false,"nodeName":"VerticalLayout","props":{"flex":[12],"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null}},"children":[{"native":false,"nodeName":"VerticalGrid","children":[{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"标题","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":1}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"副标题","attributes":{"font":"serif","color":"#66a3e0"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"说点什么..","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}}]}]}]}]}]}')
      case '展示说明':
        return JSON.parse('{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"VerticalLayout","props":{"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null},"flex":[12]},"layoutName":"纵向布局","children":[{"native":false,"nodeName":"VerticalGrid","children":[{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"家具展示","attributes":{"size":"large","bold":true}},{"insert":"\\n","attributes":{"align":"center","header":2}},{"insert":"\\n","attributes":{"align":"center"}},{"insert":"各个角度，艺术呈现","attributes":{"color":"#ffc266"}},{"insert":"\\n","attributes":{"align":"center","header":3}}],"readOnly":false}}]}]},{"native":false,"nodeName":"PhotoGallery","props":{"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null},"imgContainerMargin":5,"intensity":4,"galleryWidth":72},"layoutName":"画廊猫","children":[{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/e27abd953177fbf27ebfad403f9fffb6","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}},{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/2156d4338c4c758b73c1a9d79289b2d0","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}},{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/4fb134a179cf85076c365e4b5a37247c","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}},{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/f2fbb887e763ab86a774611144a1ac5a","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}},{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/0572b493c77226fa00d5c8c860ae7a6b","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}},{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/3f3caae8ef2388500705042c027b561a","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}},{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/28f1572f1bd1a32adfca33ab3cf3d476","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}},{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/331473f9e4d44c1facf3d93d51c390c2","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}}]}],"props":{"style":{}},"composite":true}')
      case '画廊':
        return JSON.parse('{"native":true,"nodeName":"div","props":{"style":{}},"children":[{"native":false,"nodeName":"PhotoGallery","props":{"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null},"imgContainerMargin":9,"intensity":4,"galleryWidth":69},"layoutName":"画廊","children":[{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/b556c066ed9577aeecb27a0998462d5e","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}},{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/ee6abd28bece31864a13b934fdbda223","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}},{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/d2376afa10f903913950b7bbfe624415","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}},{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a226d00362e6e3ee073a9716d1d9f63b","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}}]}]}')
      // 双纵向标题列表
      // case '双纵向标题列表':
      //   return JSON.parse('{"native":true,"nodeName":"div","props":{"style":{"paddingTop":0}},"children":[{"native":false,"nodeName":"ImageDescription","props":{"backgroundInfo":{"background":"#ffffff","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null},"column":3,"fullWithChilren":false},"children":[{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/tmp/2f7ddd3dc6d11f62c204a2fd2adf0f47"}},{"native":false,"nodeName":"VerticalLayout","props":{"flex":[12],"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null}},"children":[{"native":false,"nodeName":"VerticalGrid","children":[{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"标题","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":1}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"副标题","attributes":{"font":"serif","color":"#0066cc"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"说点什么..","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}}]}]}]},{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/tmp/2f7ddd3dc6d11f62c204a2fd2adf0f47"}},{"native":false,"nodeName":"VerticalLayout","props":{"flex":[12],"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null}},"children":[{"native":false,"nodeName":"VerticalGrid","children":[{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"标题","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":1}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"副标题","attributes":{"font":"serif","color":"#66a3e0"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"说点什么..","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}}]}]}]},{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/tmp/2f7ddd3dc6d11f62c204a2fd2adf0f47"}},{"native":false,"nodeName":"VerticalLayout","props":{"flex":[12],"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null}},"children":[{"native":false,"nodeName":"VerticalGrid","children":[{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"标题","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":1}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"副标题","attributes":{"font":"serif","color":"#66a3e0"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"说点什么..","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}}]}]}]}]}]}')
      default:
        break;
    }
  }

  render() {
    return (
      <Dropdown overlay={menu(this.add)} trigger={['click']}
      >
        <div style={{ cursor: 'pointer', minHeight: 23 }} onMouseOut={this.hiddenSelf} onMouseOver={this.showSelf}>
          <div hidden={!this.props.permanent && this.state.hidden} style={{ textAlign: 'center', width: '100%', position: 'relative' }}>
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





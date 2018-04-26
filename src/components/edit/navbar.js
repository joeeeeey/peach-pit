// {
//   native: false, nodeName: 'NavBar', layoutName: '导航栏', affectRoot: {'paddingTop': 64}
//   props: {},
//   children: [
//     {
//       native: false,
//       nodeName: 'ImageArea',
//       props:
//         {
//           imageStyle: { maxWidth: 130, maxHeight: 40.6 },
//           alt: 'initial',
//           src: '//nzr2ybsda.qnssl.com/images/80926/Fh49ddpmrttTdjPr5_bU8BGsD2Og.png?imageMogr2/strip/thumbnail/300x300&gt;/quality/90!/format/png'
//         }
//     },
//     { native: false,
//       nodeName: 'TextArea',
//       props: 
//        { formats: 
//           [ 'header',
//             'font',
//             'size',
//             'bold',
//             'italic',
//             'underline',
//             'strike',
//             'blockquote',
//             'bullet',
//             'link',
//             'color',
//             'align',
//             'script',
//             'direction',
//             'clean' ],
//          toolbarAbove: false,
//          toolbarOverlayStyle: { bottom: -105 },
//          toolbarStyle: { width: 300 },
//          deltaDeltaValue: [{"insert":"在此输入主题","attributes":{"font":"serif"}}, {"insert":"\n","attributes":{"header":2,"bold":true}} ] },
//       readOnly: false }    
//   ]
// }

// {"native":true,"nodeName":"div","props":{"style":{}},"children":[{"native":false,"affectRoot":{"paddingTop":64},"nodeName":"NavBar","props":{},"layoutName":"导航栏","children":[{"native":false,"nodeName":"ImageArea","props":{"imageStyle":{"maxWidth":130,"maxHeight":40.6},"alt":"initial","src":"//nzr2ybsda.qnssl.com/images/80926/Fh49ddpmrttTdjPr5_bU8BGsD2Og.png?imageMogr2/strip/thumbnail/300x300&gt;/quality/90!/format/png"}},{"native":false,"nodeName":"TextArea","props":{"formats":["header","font","size","bold","italic","underline","strike","blockquote","bullet","link","color","align","script","direction","clean"],"toolbarAbove":false,"toolbarOverlayStyle":{"bottom":-75},"toolbarStyle":{"width":300},"deltaDeltaValue":[{"insert":"在此输入主题","attributes":{"font":"serif"}},{"insert":"\n","attributes":{"header":2,"bold":true}}]},"readOnly":false}]}]}

// 规划
// 先在 edit 中 以 /navbar.js 方式存在，后期放入 /edit/navbars/   
// 外层只有一个 navbar.js, navbar.js 中 import /navbars 里面的其他 navbar 并做样式转换。 Preview 同理
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import NavBarAnchor from '../common/anchors/anchor'

const { Link, Events, scrollSpy } = Scroll

const scroll = Scroll.animateScrol

const sideBarWidth = 200 // preview 去除
const container2Style = { 'display': 'block', "position": "fixed", "top": "0px", "zIndex": "210", "left": sideBarWidth, "width": `calc(100% - ${sideBarWidth}px)`, "background": "rgb(255, 255, 255)", "transition": "all 0.25s", "boxShadow": "rgba(0, 0, 0, 0.25) 0px 1px 1px", "paddingTop": "10px", "paddingBottom": "10px" }
const container3Style = { "maxWidth": "100%", "display": "flex", "WebkitBoxAlign": "center", "alignItems": "center", "margin": "auto" }

export default class EditableNavBar extends React.Component {
  constructor(props, context) {
    super(props)
  }

  componentDidMount() {
    Events.scrollEvent.register('begin', function () {
    });

    Events.scrollEvent.register('end', function () {
    });

    scrollSpy.update();
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  getRootChildrenKey = () => {
    if (this.context.store.getState().node) {
      const rootKey = this.context.store.getState().node._root
      if (rootKey) {
        return this.context.store.getState().node._relation[rootKey]
      } else {
        return []
      }
    } else {
      return []
    }
  }

  // 获得顶层元素, 此处将 navbar 消除
  getRootChildren = () => {
    const keys = this.getRootChildrenKey()
    if (keys.length > 0) {
      return keys.map(key => {
        const { layoutName, nodeName } = this.context.store.getState().node[key]
        return {
          id: this.context.store.getState().node[key].props.id,
          name: layoutName,
          nodeName: nodeName,
        }
      }).filter(item => item.nodeName !== 'NavBar')
    } else {
      return []
    }
  }

  render() {
    return (
      <div name="navbar" style={{ borderColor: '#cdced0' }}>
        <div name="container2" style={container2Style}>
          <div name="container3" style={container3Style}>
            <div name="logo" style={{ "maxWidth": "200px" }}>
              <div style={{ paddingLeft: 10 }}>
                {this.props.children && this.props.children[0]}
              </div>
            </div>

            <div name="title" style={{ "fontSize": "120%", "marginLeft": "10px", "marginRight": "10px", "display": "inline-block", "minWidth": "70px" }}>
              {this.props.children && this.props.children[1]}
            </div>

            <div name="nav-item" style={{ "WebkitBoxFlex": "1", "flexGrow": "1", "textAlign": "right" }}>
              {this.getRootChildren().map(child =>
                <NavBarAnchor child={child} key={child.id || Math.random().toString().slice(3, 10)} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditableNavBar.contextTypes = {
  store: PropTypes.object
};
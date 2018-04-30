import React from 'react';
import Scroll from 'react-scroll';
import NavBarAnchor from '../common/anchors/anchor'

const { Events, scrollSpy } = Scroll

const sideBarWidth = 0 // preview 0
const container2Style = { 'display': 'block', "position": "fixed", "top": "0px", "zIndex": "210", "left": sideBarWidth, "width": `calc(100% - ${sideBarWidth}px)`, "background": "rgb(255, 255, 255)", "transition": "all 0.25s", "boxShadow": "rgba(0, 0, 0, 0.25) 0px 1px 1px", "paddingTop": "10px", "paddingBottom": "10px" }
const container3Style = { "maxWidth": "100%", "display": "flex", "WebkitBoxAlign": "center", "alignItems": "center", "margin": "auto" }

export default class PreviewNavBar extends React.Component {
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
              {this.props.rootChildren.map(child =>
                <NavBarAnchor affectRoot={this.props.affectRoot} child={child} key={child.id || Math.random().toString().slice(3, 10)} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

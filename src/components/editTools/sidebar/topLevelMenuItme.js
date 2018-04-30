// 顶层样式的编辑面板子元素
// 具有锚点，删除自身，编辑版块名称等功能
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import DoneIcon from 'material-ui-icons/Done';
import IconButton from 'material-ui/IconButton';
import Scroll from 'react-scroll';
import { Input } from 'antd';
// 悬浮

const ScLink = Scroll.Link

const anchorStyle = {
  "textAlign": "center", "width": "50%",
  "position": "absolute", "display": "inline-block",
  "top": "10%"
}
const itemFontStyle = { "fontFamily": "\"Times New Roman\",Georgia,Serif" }


export default class TopLevelMenuItem extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isEditing: false,
      layoutName: this.props.child.layoutName,
      active: false
    }
  }

  beginEditing = () => {
    this.setState({ isEditing: true })
  }
  done = () => {
    this.setState({ isEditing: false })
    if (this.props.child.layoutName !== this.state.layoutName) {
      const nestedKey = `${this.props.child.sectionKey},layoutName`
      this.context.store.dispatch({
        type: 'update',
        payload: { nestedKey: nestedKey, value: this.state.layoutName },
        target: 'node',
      });
    }

  }
  changeLayoutName = (e) => {
    this.setState({ layoutName: e.target.value })
  }

  // 滑动改变样式
  handleSetInactive = () => {
    this.setState({ active: false })
  }

  handleSetActive = () => {
    this.setState({ active: true })
  }

  getLinkStyle = () => {
    if (this.state.active) {
      return { color: '#7BD27E' }
    } else {
      return { color: 'white' }
    }
  }

  render() {
    const { child } = this.props

    return (
      <div>
        <div id="anchor" style={anchorStyle}>
          {this.state.isEditing === false &&
            <ScLink
              onSetInactive={this.handleSetInactive}
              onSetActive={this.handleSetActive}
              offset={-60}
              activeClass="active"
              to={`${child.id}`}
              spy={true}
              smooth={true}
              duration={500}  >
              <Button style={Object.assign({ width: '100%' }, itemFontStyle, this.getLinkStyle())}>{this.props.child.layoutName}</Button>
            </ScLink>
          }
          {this.state.isEditing &&
            <Input placeholder="输入板块名称" 
            defaultValue={this.props.child.layoutName} 
            onChange={this.changeLayoutName}
            onPressEnter={this.done}
            />
          }
        </div>

        {this.state.isEditing &&
          <div id="doneDiv" style={{ display: 'inline-block', position: 'absolute', left: '2%' }}>
            <IconButton
              style={{ color: '#A3D9A5' }}
              onClick={this.done}
              aria-label="Done">
              <DoneIcon />
            </IconButton>


          </div>
        }
        {this.state.isEditing === false &&
          <div id="editDiv" style={{ display: 'inline-block', position: 'absolute', left: '3%' }}>
            <IconButton
              style={{ color: '#CBD1CB' }}
              onClick={this.beginEditing}
              aria-label="Edit">
              <EditIcon />
            </IconButton>
          </div>
        }


        <div id="inco12" style={{ display: 'inline-block', position: 'absolute', right: '3%' }}>
          <IconButton
            style={{ color: '#CBD1CB' }}
            onClick={() => { this.props.removeNode(child.sectionKey) }}
            aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </div>

      </div>
    );
  }
}

TopLevelMenuItem.contextTypes = {
  store: PropTypes.object,
};

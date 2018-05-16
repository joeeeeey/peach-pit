// 顶层样式的编辑面板子元素
// 具有锚点，删除自身，编辑版块名称等功能
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import EditIcon from 'material-ui-icons/Edit';
import DoneIcon from 'material-ui-icons/Done';
import IconButton from 'material-ui/IconButton';

import { Input } from 'antd';

const itemFontStyle = { "fontFamily": "\"Times New Roman\",Georgia,Serif" }

export default class UpdateSiteNameItem extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isEditing: false,
      siteName: '',
      active: false
    }
  }

  componentDidMount() {
    this.setSiteName()
  }


  updateEditInfoState = (nestedKey, value) => {
    this.context.store.dispatch({
      type: 'update',
      payload: { nestedKey: nestedKey, value: value },
      target: 'editInfo',
    });
  }

  setSiteName = () => {
    if (this.setSiteNameTriggerTimer !== undefined) {
      clearTimeout(this.setSiteNameTriggerTimer)
    }

    // 延时两秒保存改动
    this.setSiteNameTriggerTimer = setTimeout(() => {
      this.setSiteNameTriggerTimer = undefined;
      const editInfo = this.context.store.getState().editInfo
      if (editInfo && editInfo.name) {
        this.setState({ siteName: editInfo.name })
      } else {
        this.setSiteName()
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (this.setSiteNameTriggerTimer) {
      clearTimeout(this.setSiteNameTriggerTimer)
    }
  }

  getSiteName = () => {
    const editInfo = this.context.store.getState().editInfo
    if (editInfo) {
      return editInfo.name
    } else {
      return '未知'
    }
  }

  beginEditing = () => {
    this.setState({ isEditing: true })
  }

  done = () => {
    this.setState({ isEditing: false })

    if (this.getSiteName() !== this.state.siteName) {
      this.updateEditInfoState('name', this.state.siteName)
    }
  }

  changeSiteName = (e) => {
    this.setState({ siteName: e.target.value })
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
        {this.state.isEditing === false &&
          <Button style={Object.assign({ width: '100%' },
            itemFontStyle, { color: 'white' })}>
            网站名称:  {this.state.siteName}
          </Button>
        }
        {this.state.isEditing &&
          <Input placeholder="输入网站名称"
            defaultValue={this.state.siteName}
            onChange={this.changeSiteName}
            onPressEnter={this.done}
          />
        }

        {
          this.state.isEditing &&
          <div id="doneDiv" className={'updateSiteNameItemLeftIcon'} >
            <IconButton
              style={{ color: '#A3D9A5' }}
              onClick={this.done}
              aria-label="Done">
              <DoneIcon />
            </IconButton>
          </div>
        }

        {this.state.isEditing === false &&
          <div id="editDiv" className={'updateSiteNameItemLeftIcon'} >
            <IconButton
              style={{ color: '#CBD1CB' }}
              onClick={this.beginEditing}
              aria-label="Edit">
              <EditIcon />
            </IconButton>
          </div>
        }
      </div>
    );
  }
}

UpdateSiteNameItem.contextTypes = {
  store: PropTypes.object,
};

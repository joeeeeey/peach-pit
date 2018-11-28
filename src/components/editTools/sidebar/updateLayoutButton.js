import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { message } from 'antd';

import LayoutService from 'services/layoutService'
import nodeOperation from 'utils/nodeOperation'

const layoutService = new LayoutService()

export default class UpdateLayoutButton extends React.Component {
  constructor(props, context) {
    super(props);
  }

  updateLayout = () => {
    let parmas = {
      id: this.context.store.getState().editInfo.id,
    }

    let nodeData = JSON.parse(JSON.stringify(this.context.store.getState().node));
    let heightOption = { isLayout: true }
    parmas.data = JSON.stringify(nodeOperation.heightenDomTree(nodeData, heightOption))

    layoutService.updateLayout(parmas)
      .then(response => {
        const { data } = response
        if (data.code === 0) {
          message.success(`更新成功`, 6)
        } else {
          message.error(`😥 ${data.msg}`, 1.2)
        }
      })
      .catch(function (error) {
        message.error(`😥 出现异常: ${error.msg}`, 2)
      });

    console.log('saveLayout')
  }
  render() {
    return (
      <Button onClick={this.updateLayout} color="secondary" style={this.props.style}>
        更新该样式
      </Button>
    );
  }
}

UpdateLayoutButton.contextTypes = {
  store: PropTypes.object,
};

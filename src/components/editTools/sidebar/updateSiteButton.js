import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { message } from 'antd';

import SiteService from '../../../services/siteService'
import nodeOperation from '../../../utils/nodeOperation'

const siteService = new SiteService()

export default class UpdateSiteButton extends Component {
  constructor(props, context) {
    super(props);
  }

  updateSite = () => {
    let parmas = {
      id: parseInt(this.context.store.getState().editInfo.id),
    }

    let nodeData = JSON.parse(JSON.stringify(this.context.store.getState().node));
    parmas.data = JSON.stringify(nodeOperation.heightenDomTree(nodeData))

    siteService.update(parmas)
      .then(response => {
        const { data } = response
        if (data.code === 0) {
          message.success(`更新成功`, 6)
        } else {
          message.error(`😥 ${data.msg}`, 1.2)
        }
      })
      .catch(function (error) {
        message.error(`😥 出现异常: ${error}`, 2)
      });
  }
  render() {
    return (
      <Button onClick={this.updateSite} color="secondary" style={this.props.style}>
        保存修改
      </Button>
    );
  }
}

UpdateSiteButton.contextTypes = {
  store: PropTypes.object,
};

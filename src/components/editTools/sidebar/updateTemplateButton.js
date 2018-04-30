import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { message } from 'antd';

import TemplateService from '../../../services/templateService'
import nodeOperation from '../../../utils/nodeOperation'

const templateService = new TemplateService()

export default class UpdateTemplateButton extends React.Component {
  constructor(props, context) {
    super(props);
  }

  updateTemplate = () => {
    let parmas = {
      id: this.context.store.getState().editInfo.id,
    }

    let nodeData = JSON.parse(JSON.stringify(this.context.store.getState().node));
    parmas.data = JSON.stringify(nodeOperation.heightenDomTree(nodeData))

    templateService.updateTemplate(parmas)
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

    console.log('saveTemplate')
  }
  render() {
    return (
      <Button onClick={this.updateTemplate} color="secondary" style={this.props.style}>
        更新该模板
       </Button>
    );
  }
}

UpdateTemplateButton.contextTypes = {
  store: PropTypes.object,
};

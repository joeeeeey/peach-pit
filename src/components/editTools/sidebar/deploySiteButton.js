import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { message } from 'antd';

import SiteService from '../../../services/siteService'
import DeployService from '../../../services/deployService'

import nodeOperation from '../../../utils/nodeOperation'

import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { Link } from 'react-router-dom';


const deployService = new DeployService()
const siteService = new SiteService()

export default class DeploySiteButton extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isDeploying: false,
      openDeployFinishedDialog: true,
      siteUrl: null,
    }
  }

  getSiteData = () => {
    if (this.siteData) {
      return this.siteData
    } else {
      this.siteData = JSON.parse(JSON.stringify(this.context.store.getState().node))
      return this.siteData
    }
  }

  getUpdateSiteParmas = () => {
    this.siteId = parseInt(this.context.store.getState().editInfo.id)
    let params = {
      id: this.siteId,
    }

    params.data = JSON.stringify(nodeOperation.heightenDomTree(this.getSiteData()))

    return params
  }


  deploy = () => {
    this.setState({ isDeploying: true })
    const removeMsgLoading = message.loading('正在部署中..大概需要40秒', 0);
    siteService.update(this.getUpdateSiteParmas())
      .then(response => {
        const { data } = response
        if (data.code === 0) {
          deployService.getContainerPreviewFileRelativePath()
            .then((response) => {
              const { data } = response
              if (data.code === 0) {
                const containerPreviewFileRelativePath = data.data.containerPreviewFileRelativePath
                const indexFileCode = this.getCodeInIndex(containerPreviewFileRelativePath)

                let params = {
                  indexFileCode: indexFileCode,
                  siteId: this.siteId,
                }
                deployService.deploy(params)
                  .then(res => {
                    removeMsgLoading()
                    const { data } = res
                    this.setState({ isDeploying: false })
                    if (data.code === 0) {
                      message.success('部署成功')
                      this.setState({ siteUrl: data.data.siteUrl, openDeployFinishedDialog: true })
                    } else {
                      this.setState({ isDeploying: false })
                      message.error(`😥 ${data.msg}`, 2)
                    }
                  })
              } else {
                removeMsgLoading()
                this.setState({ isDeploying: false })
                message.error(`😥 部署失败 ${data.msg}`, 2)
              }
            })
        } else {
          removeMsgLoading()
          this.setState({ isDeploying: false })
          message.error(`😥 部署失败 ${data.msg}`, 2)
        }
      })

    // this.download(indexJsCode, 'deploy.txt', 'text/plain')
  }


  // 单词首字母小写
  lowerFirstLetter = (s) => {
    return s.replace(/^.{1}/g, s[0].toLowerCase());
  }

  getCodeInIndex = (containerPreviewFileRelativePath) => {
    let nodeData = this.getSiteData()

    let importComponents = []
    for (let i in nodeData) {
      if (!nodeData[i].native && nodeData[i].nodeName) {
        importComponents.push(nodeData[i].nodeName)
      }
    }

    importComponents = [...new Set(importComponents)]
    let importCode = ""
    for (let i = 0; i < importComponents.length; i++) {
      importCode += `import Preview${importComponents[i]} from '${containerPreviewFileRelativePath + this.lowerFirstLetter(importComponents[i])}'\n`
    }

    let nodeCode = nodeOperation.flattenedData2Code(nodeData, 'deploy')

    const re = /"\n"/gi;
    // var str = '"\n"dadas';
    nodeCode = nodeCode.replace(re, '"\\n"');
    // console.log(newstr);     

    let indexJsCode = `
import React, { Component } from 'react';
import withRoot from '../withRoot';    
${importCode}    
class Index extends Component {
  render() {
    return (
    ${nodeCode}
   );
  }
}

export default withRoot(Index);    
    `
    return indexJsCode
  }

  handleDeployFinishedDialogClose = () => {
    this.setState({ openDeployFinishedDialog: false });
  };

  render() {
    return (
      <div>
        {this.state.isDeploying ?
          <Button disabled style={this.props.style}>
            正在部署中...
          </Button>
          :
          <Button onClick={this.deploy} color="secondary" style={this.props.style}>
            部署上线
        </Button>}

        <Dialog
          open={this.state.openDeployFinishedDialog}
          onClose={this.handleDeployFinishedDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{textAlign: 'center'}}>部署完成</DialogTitle>
          <DialogContent style={{ minWidth: 500 }}>
            <DialogContentText id="alert-dialog-description">
              {this.state.siteUrl &&
                <div style={{ textAlign: 'center' }}>

                  <Typography variant="subheading" gutterBottom>
                    你现在可以点击以下域名
                  </Typography>
                  <a href={this.state.siteUrl} target='_blank'>{this.state.siteUrl}</a>

                  <Typography variant="subheading" gutterBottom>
                    来查看你的网页啦
                  </Typography>
                </div>
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {
              this.state.siteUrl &&
              <Button component={Link} to={this.state.siteUrl} target='_blank' color="primary">
                点我也行
              </Button>
            }
            <Button onClick={this.handleDeployFinishedDialogClose} color="primary" autoFocus>
              继续编辑
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeploySiteButton.contextTypes = {
  store: PropTypes.object,
};


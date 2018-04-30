import React, { Component } from 'react';
import AppBar from '../../components/common/layouts/appBar'
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import Typography from 'material-ui/Typography';
import green from 'material-ui/colors/green';
import grey from 'material-ui/colors/grey';

// import Tooltip from 'material-ui/Tooltip';

import { Link } from 'react-router-dom';
import { List,  Divider,  Popconfirm, message } from 'antd';


import SiteService from '../../services/siteService'

const siteService = new SiteService()

export default class UserSite extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      sites: []
    }
  }

  componentDidMount() {
    siteService.getUserSitesInfo()
      .then(response => {
        const { data } = response
        if (data.code === 0) {
          this.setState({ sites: data.data.records })
        } else {
          console.error(`获取用户网站信息失败: ${data.msg}`)
        }
      })
  }

  deleteSite = (siteId) => {
    siteService.deleteSite({ siteId: siteId })
      .then(response => {
        const { data } = response
        if (data.code === 0) {
          if (data.data.deleteSuccess) {
            message.success('删除成功', 2)
            const remianedSites = this.state.sites.filter(site => site.id !== siteId);

            this.setState({ sites: remianedSites })
          }
        } else {
          console.error(`获取用户网站信息失败: ${data.msg}`)
        }
      })
  }

  render() {
    const { nickname } = this.context.store.getState().user.profile
    return (
      <div>
        <AppBar />
        <div style={{ marginTop: 30, width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
          <Button
            style={{ width: 200, height: 40 }}
            variant="raised"
            component={Link} to={`/user/chooseTemplate`}
            color='secondary' >新建网站</Button>
          <Divider />
          <List
            pagination={true}
            itemLayout="vertical"
            size="large"
            dataSource={this.state.sites}
            footer={<div><b>到底了</b></div>}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={
                  [
                    <Button component={Link} to={`/user/editPage?source=site&id=${item.id}`} color="primary">
                      <EditIcon />
                    </Button>,

                    <Popconfirm title="确定要删除吗?" onConfirm={() => this.deleteSite(item.id)} okText="确认" cancelText="取消">
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </Popconfirm>
                  ]}

              >
                <List.Item.Meta
                  title={<div><span>{nickname}的网站</span>
                    <button style={{
                      marginLeft: 5,
                      backgroundColor: item.deployment_id ? green[500] : grey[500],
                      color: 'white',
                      borderRadius: 6,
                      fontSize: 12,
                      height: 25,
                      border: 'none'
                    }}>{item.deployment_id ? '已上线' : '未上线'}</button></div>}
                />

                <Typography variant="subheading" gutterBottom>
                  模板: {item.name}
                </Typography>
                <Typography variant="subheading" gutterBottom>
                  新建于: {item.created_at}
                </Typography>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

UserSite.contextTypes = {
  store: PropTypes.object
};




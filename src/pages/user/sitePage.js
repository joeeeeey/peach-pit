import React, { Component } from "react";
import AppBar from "../../components/common/layouts/appBar";
import PropTypes from "prop-types";
import Button from "material-ui/Button";

import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import EditIcon from "material-ui-icons/Edit";
import green from "material-ui/colors/green";
import grey from "material-ui/colors/grey";
import blue from "material-ui/colors/blue";

import { Link } from "react-router-dom";
import { List, Divider, Popconfirm, message, Tooltip } from "antd";

import SiteService from "../../services/siteService";

const siteService = new SiteService();

const h3Style = {
  color: "rgba(0, 0, 0, 0.87)",
  fontSize: "1rem",
  fontWeight: "400",
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  lineHeight: "1.5em"
};

export default class UserSite extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      sites: []
    };
  }

  componentDidMount() {
    siteService.getUserSitesInfo().then(response => {
      const { data } = response;
      if (data.code === 0) {
        this.setState({ sites: data.data.records });
      } else {
        console.error(`获取用户网站信息失败: ${data.msg}`);
      }
    });
  }

  deleteSite = siteId => {
    siteService.deleteSite({ siteId: siteId }).then(response => {
      const { data } = response;
      if (data.code === 0) {
        if (data.data.deleteSuccess) {
          message.success("删除成功", 2);
          const remianedSites = this.state.sites.filter(
            site => site.id !== siteId
          );

          this.setState({ sites: remianedSites });
        }
      } else {
        console.error(`获取用户网站信息失败: ${data.msg}`);
      }
    });
  };

  // 压缩静态文件
  compressStaticFiles = siteId => {
    siteService.compressStaticFile({ siteId: siteId }).then(response => {
      const { data } = response;
      if (data.code === 0) {
        const { compressedFilePath, compressedFileName } = data.data;
        try {
          let a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = compressedFilePath;
          a.download = compressedFileName;
          a.click();
          document.body.removeChild(a);
        } catch (error) {
          console.error("下载失败");
        }
      } else {
        console.error(`获取用户网站信息失败: ${data.msg}`);
      }
    });
  };

  render() {
    const { nickname } = this.context.store.getState().user.profile;
    return (
      <div>
        <AppBar />
        <div
          style={{
            marginTop: 30,
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
          <Button
            style={{ width: 200, height: 40 }}
            variant="raised"
            component={Link}
            to={`/user/chooseTemplate`}
            color="secondary">
            新建网站
          </Button>
          <Divider />
          <List
            pagination={true}
            itemLayout="vertical"
            size="large"
            dataSource={this.state.sites}
            footer={
              <div>
                <b>到底了</b>
              </div>
            }
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <Button
                    component={Link}
                    to={`/user/editPage?source=site&id=${item.id}`}
                    color="primary">
                    <EditIcon />
                  </Button>,

                  <Popconfirm
                    title="确定要删除吗?"
                    onConfirm={() => this.deleteSite(item.id)}
                    okText="确认"
                    cancelText="取消">
                    <IconButton aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </Popconfirm>
                ]}>
                <List.Item.Meta
                  title={
                    <div>
                      <span>{nickname}的网站</span>
                      {item.deployment_id && item.deploymentUrl && (
                        <Tooltip title={`点击前往: ${item.deploymentUrl}`}>
                          <Button
                            size={"small"}
                            component={Link}
                            to={item.deploymentUrl && item.deploymentUrl}
                            target={"_blank"}
                            style={{
                              marginLeft: 5,
                              backgroundColor: green[500],
                              color: "white",
                              borderRadius: 6,
                              fontSize: 10,
                              border: "none"
                            }}>
                            已上线
                          </Button>
                        </Tooltip>
                      )}

                      {item.deployment_id && item.deploymentUrl && (
                        <Tooltip title={`压缩打包文件并下载`}>
                          <Button
                            size={"small"}
                            onClick={() => this.compressStaticFiles(item.id)}
                            target={"_blank"}
                            style={{
                              marginLeft: 5,
                              backgroundColor: blue[500],
                              color: "white",
                              borderRadius: 6,
                              fontSize: 10,
                              border: "none"
                            }}>
                            下载代码
                          </Button>
                        </Tooltip>
                      )}

                      {!item.deployment_id && !item.deploymentUrl && (
                        <Button
                          size={"small"}
                          disabled
                          style={{
                            marginLeft: 5,
                            backgroundColor: grey[500],
                            color: "white",
                            borderRadius: 6,
                            fontSize: 10,
                            border: "none"
                          }}>
                          未上线
                        </Button>
                      )}
                    </div>
                  }
                />
                <h3 style={{ h3Style }}> 模板: {item.name}</h3>
                <h3 style={{ h3Style }}>
                  {" "}
                  新建于: {item.created_at}
                  {item.name}
                </h3>
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

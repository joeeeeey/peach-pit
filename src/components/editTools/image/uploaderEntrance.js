// 可传入 props
// container  string 'div' 传入 UploaderArea
// uploadSuccess function 成功上传的回调函数
// nestedkeyprefix string 'xx,props,'
// showUploadedImage  boolean 是否显示已经上传的图片

// TODO
// 图片上传的按钮和承载上传区域(包括上传按钮，预览区，图片库等)
// 图片上传的按钮应该可以在不同场景不同样式显示
import React from "react";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import PropTypes from "prop-types";
import UploaderArea from "./uploaderArea";
import AnButton from "antd/lib/button";
import UpyunService from "../../../services/upyunService";
import { Modal, Tabs, message } from "antd";
import DoneOutlineIcon from "material-ui-icons/CheckCircle";
import dateOperation from "../../../utils/dateOperation";

const TabPane = Tabs.TabPane;
const upyunService = new UpyunService();

export default class UploaderEntrance extends React.Component {
  constructor(props, context) {
    super(props);
  }
  state = {
    open: false
  };

  // 更新以 div 为容器的背景信息，
  // 1. background 2. backgroundType 3. imageInfo
  getDivContainerUpdateInfo = nestedkeyprefix => {
    let updateNodesPayload = [
      { key: "background", value: `url(${this.imgUrl})` },
      { key: "backgroundType", value: "image" },
      { key: "imageInfo", value: this.imageInfo } // TODO REMOVE?
    ].map(element => {
      return {
        value: element.value,
        nestedKey: `${nestedkeyprefix},${element.key}`
      };
    });

    return {
      payloadData: {
        updateNodes: { payloadData: updateNodesPayload }
      }
    };
  };
  getImageContainerUpdateInfo = nestedkeyprefix => {
    return {
      payloadData: {
        updateNodes: {
          payloadData: [
            {
              value: `${this.imgUrl}`,
              nestedKey: `${nestedkeyprefix},src`
            }
          ]
        }
      }
    };
  };

  // 根据承载图片不同的元素来更新不同的 nodeTree props
  // About  css background VS img tag => http://buildawesomewebsites.com/blog/html-img-tags-vs-css-background-images
  updateNodeTree = () => {
    const { nestedkeyprefix } = this.props;
    if (!nestedkeyprefix) {
      message.error(`更新编辑页面失败,缺少需要更新的节点位置`, 1.2);
    } else {
      let compositePayload = null;
      switch (this.props.container) {
        case "div":
          compositePayload = this.getDivContainerUpdateInfo(nestedkeyprefix);
          break;
        case "image":
          compositePayload = this.getImageContainerUpdateInfo(nestedkeyprefix);
          break;
        default:
          return false;
      }
      this.context.store.dispatch({
        type: "composite",
        payload: compositePayload,
        target: "node"
      });
    }
  };

  updateEditInfo = () => {
    let uploadedImages = this.state.uploadedImages;
    uploadedImages.push({
      name: `${this.fileSize}tmp`,
      type: "N",
      size: this.fileSize,
      updatedAt: Math.floor(new Date().getTime() / 1000),
      path: this.imgUrl
    });

    this.setState({ uploadedImages: uploadedImages });

    this.context.store.dispatch({
      type: "composite",
      payload: { nestedKey: "uploadedImages", value: uploadedImages },
      target: "editInfo"
    });
    // editInfo.uploadedImages
  };

  handleUploadSuccess = (imgUrl, fileSize) => {
    this.imgUrl = imgUrl;
    this.fileSize = fileSize;
    this.updateEditInfo();
    this.updateNodeTree();
    // uploadSuccess
    if (
      this.props.uploadSuccess &&
      typeof this.props.uploadSuccess === "function"
    ) {
      this.props.uploadSuccess();
    }
    this.handleClose();
  };
  buttonStyle = () => {
    return { width: "100%", justifyContent: "center" };
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
      // [{"name":"697ds","type":"N","size":"9828","updatedAt":"1525228916","path":"http://xx"}]
      uploadedImages:
        this.context.store.getState().editInfo.uploadedImages || []
    });
  };

  handleClose = () => {
    this.setState({ open: false, uploadedImages: [] });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const {
      container,
      nestedkeyprefix,
      uploaderEntranceContainerStyle = {},
      uploadButtonStyle = {}
    } = this.props;

    return (
      <div
        name="UploaderEntranceContainer"
        style={uploaderEntranceContainerStyle}>
        <Button
          onClick={this.handleClickOpen}
          style={Object.assign(this.buttonStyle(), uploadButtonStyle)}
          color="secondary">
          上传图片
        </Button>
        {this.state.open && (
          <Modal
            visible={this.state.open}
            title="图片操作"
            // style={{ minWidth: '60vw', "top": "50%", "transform": "translateY(-50%)" }}
            style={{ minWidth: "70vw" }}
            onCancel={this.handleClose}
            footer={[
              <AnButton key="back" onClick={this.handleClose}>
                取消操作
              </AnButton>
            ]}>
            <Tabs
              defaultActiveKey="1"
              style={{ minHeight: "80vh", maxHeight: "80vh" }}>
              <TabPane tab="上传新图片" key="1">
                <div>
                  <UploaderArea
                    container={container}
                    nestedkeyprefix={nestedkeyprefix}
                    uploadSuccess={this.handleUploadSuccess}
                  />
                </div>
              </TabPane>
              {this.props.showUploadedImage && (
                <TabPane
                  tab="使用已上传的图片"
                  key="2"
                  style={{ overflow: "auto", maxHeight: "80vh" }}>
                  <Grid container alignItems={"center"}>
                    {this.state.uploadedImages.map(x => (
                      <Grid item xs={12} lg={3} md={3} sm={3} key={x.name}>
                        <div
                          style={{
                            padding: "4%",
                            textAlign: "center",
                            marginBottom: 10
                          }}>
                          <img
                            onClick={() => this.handleUploadSuccess(x.path)}
                            src={`${x.path}!thumbnails/fw/200`}
                            style={{
                              width: "100%",
                              height: "100%",
                              cursor: "pointer",
                              marginBottom: 6
                            }}
                          />
                          <p>大小: {Math.floor(parseInt(x.size) / 1024)}KB</p>
                          <span>
                            日期:{" "}
                            {dateOperation.unixTime2FormatDate(x.updatedAt)}
                          </span>
                          <Button
                            onClick={() => this.handleUploadSuccess(x.path)}
                            mini={true}
                            style={{ color: "#A5D6A7" }}>
                            <DoneOutlineIcon style={{ marginRight: 8 }} />
                            使用
                          </Button>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </TabPane>
              )}
              <TabPane tab="编辑该图片" key="3">
                这个功能还没做好
              </TabPane>
            </Tabs>
          </Modal>
        )}
      </div>
    );
  }
}

UploaderEntrance.contextTypes = {
  store: PropTypes.object
};

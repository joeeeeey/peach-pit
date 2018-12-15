import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import { Menu, Dropdown, Slider } from "antd";

export default class AdjustGalleryStyleButton extends React.Component {
  constructor(props, context) {
    super(props);
    this.positionStyle = this.props.positionStyle || {
      zIndex: 30,
      position: "absolute",
      left: "1%",
      top: 10,
      borderRadius: "10%",
      background: "#303233"
    };
    const { imgContainerMargin, intensity, galleryWidth } = this.props;
    this.state = {
      visible: false,
      imgContainerMargin: imgContainerMargin,
      intensity: intensity,
      galleryWidth: galleryWidth
    };
  }

  // 关闭点击自动关闭菜单
  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  commonHandleChange = name => value => {
    this.setState({
      [name]: value
    });
  };
  updateGalleryStyle = () => {
    const updateNodesPayload = [
      "imgContainerMargin",
      "intensity",
      "galleryWidth"
    ].map(key => {
      return {
        value: this.state[key],
        nestedKey: `${this.props.selfkey},props,${key}`
      };
    });

    const compositePayload = {
      payloadData: {
        updateNodes: { payloadData: updateNodesPayload }
      }
    };

    this.context.store.dispatch({
      type: "composite",
      payload: compositePayload,
      target: "node"
    });
    // { value: e.value, nestedKey: `${this.props.parentkey},props,backgroundInfo,${e.type}` }
  };

  menu = f => {
    return (
      <Menu>
        <Menu.Item key={"imgContainerMargin"}>
          <div>
            <h4>间距</h4>
            <Slider
              max={30}
              onAfterChange={this.commonHandleChange("imgContainerMargin")}
              defaultValue={this.props.imgContainerMargin}
              style={{ minWidth: 256 }}
            />
          </div>
        </Menu.Item>
        <Menu.Item key={"galleryWidth"}>
          <div>
            <h4>画幅</h4>
            <Slider
              min={30}
              onAfterChange={this.commonHandleChange("galleryWidth")}
              defaultValue={this.props.galleryWidth}
              style={{ minWidth: 256 }}
            />
          </div>
        </Menu.Item>
        <Menu.Item key={"intensity"}>
          <div>
            <h4>密集度(单行容纳的相对最大列数)</h4>
            <Slider
              onAfterChange={this.commonHandleChange("intensity")}
              min={2}
              max={4}
              defaultValue={this.props.intensity}
              style={{ minWidth: 256 }}
            />
          </div>
        </Menu.Item>
        <Menu.Item key={"updateGalleryStyle"}>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{ marginBottom: 5 }}
              onClick={this.updateGalleryStyle}
            >
              {" "}
              确认
            </Button>
          </div>
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    return (
      <div style={this.positionStyle}>
        <Dropdown
          overlay={this.menu()}
          trigger={["click"]}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
        >
          <Button style={{ minWidth: 20, color: "#FFF", fontSize: 8 }}>
            样式
          </Button>
        </Dropdown>
      </div>
    );
  }
}

AdjustGalleryStyleButton.contextTypes = {
  store: PropTypes.object
};

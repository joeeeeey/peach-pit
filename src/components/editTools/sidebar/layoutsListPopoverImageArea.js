// 布局列表气泡卡片 item
// props: 1. layout 2. addNode function
import React from "react";
import Button from "material-ui/Button";
import { Divider } from "antd";
const defaultOverlayStyle = {
  textAlign: "center",
  position: "absolute",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: "2",
  cursor: "pointer"
};

export default class LayoutsListPopoverImageArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { overlayDisplay: { display: "none" } };
  }

  hoverImg = () => {
    this.setState({ overlayDisplay: { display: "block" } });
  };

  mouseLeaveImage = () => {
    this.setState({ overlayDisplay: { display: "none" } });
  };

  render() {
    const { layout } = this.props;

    return (
      <div style={{ width: "100%" }}>
        <h3
          style={{
            fontWeight: 700,
            fontFamily: '"Times New Roman",Georgia,Serif'
          }}
        >
          {layout.name}
        </h3>
        <div
          name="imageContainer"
          style={{ width: "100%", position: "relative", textAlign: "center" }}
          onMouseOver={this.hoverImg}
        >
          <div
            name="imageOverlay"
            onMouseLeave={this.mouseLeaveImage}
            style={Object.assign(
              {},
              defaultOverlayStyle,
              this.state.overlayDisplay
            )}
          >
            <Button
              color="secondary"
              onClick={() => this.props.addNode(layout.data, layout.name)}
              style={{
                width: "100%",
                height: "100%",
                color: "white",
                justifyContent: "center"
              }}
            >
              加入
            </Button>
          </div>
          <img
            style={{ maxWidth: "100%" }}
            src={
              layout.thumbnail_url ||
              "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/ee6abd28bece31864a13b934fdbda223"
            }
            alt="layout_thumb"
          />
        </div>
        <Divider dashed />
      </div>
    );
  }
}

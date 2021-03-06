// 传入 props
// container  string 'div' 根据不同容器保存不同内容
// src,
// alt,
// imageContainerStyle

// {
//   native: false, nodeName: 'ImageArea',
//   props: {src: 'http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/8/1a4729c10b66ea0d2b5b9f25f2ea7039' }
// }

// {"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/8/1a4729c10b66ea0d2b5b9f25f2ea7039"}}
// 有编辑功能在加上
// import EditImageDialog from 'components/editTools/image/editImageDialog'
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "material-ui/Button";
import Measure from "react-measure";
import ImageAreaSetting from "jssSettings/imageAreaSetting";
import UploaderEntrance from "components/editTools/image/uploaderEntrance";
import * as nodeActions from "actions/node";

const defaultImageStyle = { maxWidth: "100%", maxHeight: "100%" };
const defaultImageContainerStyle = ImageAreaSetting.defaultImageContainerStyle();

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
const buttonStyle = {
  width: "100%",
  height: "73%",
  color: "white",
  justifyContent: "center"
};

const mapDispatchToProps = dispatch => ({
  removeFlattenedNode: payload => {
    dispatch(nodeActions.removeFlattenedNode(payload));
  }
});

class EditableImageArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgDimensions: {},
      contanierWidth: -1,
      overlayDisplay: { display: "none" },
      imageStyle: defaultImageStyle
    };
    this.editImageDialog = null;
  }

  hoverImg = () => {
    this.setState({ overlayDisplay: { display: "block" } });
  };

  mouseLeaveImage = () => {
    this.setState({ overlayDisplay: { display: "none" } });
  };

  showEditTool = () => {
    this.editImageDialog.handleClickOpen();
  };

  removeImageArea = () => {
    let { selfkey, parentkey, removeFlattenedNode } = this.props;
    const payload = {targetKey: selfkey, parentKey: parentkey};
    removeFlattenedNode(payload);
  };

  // 获得图片原始大小，在网页布局中展示的大小
  onImgLoad = ({ target: img }) => {
    const imgDimensions = {
      naturalWidth: img.naturalWidth,
      naturaHeight: img.naturalHeight
    };

    this.reportHeight(img.offsetHeight);

    this.setState({
      imgDimensions: imgDimensions
    });

    // 首次加载，获得样式
    if (!this.props.imageStyle) {
      const imageStyle = ImageAreaSetting.getImageStyle(
        this.state.contanierWidth,
        imgDimensions
      );
      this.setState({ imageStyle: imageStyle });
    }
  };

  // image 覆盖的元素，Example: 编辑, 删除按钮
  imageOverlayElement = () => {
    return (
      <div
        name="imageOverlay"
        onMouseLeave={this.mouseLeaveImage}
        style={Object.assign(
          {},
          defaultOverlayStyle,
          this.state.overlayDisplay
        )}>
        <div style={buttonStyle}>
          <UploaderEntrance
            uploaderEntranceContainerStyle={{ height: "100%" }}
            uploadButtonStyle={{ height: "100%" }}
            container={"image"}
            nestedkeyprefix={`${this.props.selfkey},props`}
            showUploadedImage={true}
          />
        </div>
        {!this.props.hiddenDelete && (
          <Button
            color="secondary"
            onClick={this.removeImageArea}
            style={{
              width: "100%",
              height: "14%",
              color: "white",
              justifyContent: "center"
            }}>
            删除
          </Button>
        )}

        {/* TODO 图片编辑功能 */}
        {/* <EditImageDialog ref={(el) => { this.editImageDialog = el }} parentkey={this.props.parentkey} targetkey={this.props.selfkey} /> */}
      </div>
    );
  };

  // 展示 imgae 的元素
  imageElement = (src, alt) => {
    // TODO 使用 webp 需要做浏览器判断
    // src={src + '!/format/webp'}
    return (
      <img
        src={src}
        style={this.props.imageStyle || this.state.imageStyle}
        alt={alt || "default_alt"}
        onLoad={this.onImgLoad}
      />
    );
  };

  // 在屏幕大小发生变化时加载，获得样式
  reSizeImage = (contanierWidth, contanierHeight) => {
    this.reportHeight(contanierHeight);

    this.setState({ contanierWidth: contanierWidth });
    const imgDimensions = this.state.imgDimensions;
    if (imgDimensions.naturalWidth) {
      const imageStyle = ImageAreaSetting.getImageStyle(
        contanierWidth,
        imgDimensions
      );
      this.setState({ imageStyle: imageStyle });
    }
  };

  // 有的父元素需要知道子元素 resize 后的高度
  // 向父元素回传自身所占高度
  reportHeight = height => {
    if (this.props.reportHeight) {
      this.props.reportHeight(height, this.props.selfkey);
    }
  };

  render() {
    // galleryStyle 中存储画廊类型以及画廊需要存储的特征, 如: { type: 'verticalGallery', width: 1, height: 1 }
    // 会影响编辑页面的显示

    const {
      src,
      alt,
      imageContainerStyle = defaultImageContainerStyle
    } = this.props;
    return (
      <div>
        {!this.props.noMeasure && (
          <Measure
            bounds
            onResize={contentRect =>
              this.reSizeImage(
                contentRect.bounds.width,
                contentRect.bounds.height
              )
            }>
            {({ measureRef }) => {
              if (this.state.contanierWidth < 1) {
                return <div ref={measureRef} />;
              }
              return (
                <div
                  name="imageContainer"
                  ref={measureRef}
                  style={Object.assign(
                    { position: "relative", textAlign: "center" },
                    imageContainerStyle
                  )}
                  onMouseOver={this.hoverImg}>
                  {this.imageOverlayElement()}
                  {this.imageElement(src, alt)}
                </div>
              );
            }}
          </Measure>
        )}
        {this.props.noMeasure && (
          <div
            name="imageContainer"
            style={Object.assign(
              { position: "relative", textAlign: "center" },
              imageContainerStyle
            )}
            onMouseOver={this.hoverImg}>
            {this.imageOverlayElement()}
            {this.imageElement(src, alt)}
          </div>
        )}
      </div>
    );
  }
}

EditableImageArea.propTypes = {
  removeFlattenedNode: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
  imageContainerStyle: PropTypes.object,
}

EditableImageArea.defaultProps = {
  imageContainerStyle: defaultImageContainerStyle,
  removeFlattenedNode: () => {},
  src: '',
  alt: 'default',
};

export default connect(
  null,
  mapDispatchToProps
)(EditableImageArea);
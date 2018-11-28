import React, { Component } from "react";
import Measure from "react-measure";
import computeImage from "utils/computeImage";
import PreviewImageArea from "../preview/imageArea";
import backgroundSetting from "jssSettings/backgroundSetting";

const imgContainerStyle = {
  overflow: "hidden",
  float: "left",
  position: "relative"
};

export default class PreviewPhotoGallery extends Component {
  constructor(props, context) {
    super(props);
    this.state = { width: -1 }; // 假定屏幕原始宽度
  }

  // { src: 'https://source.unsplash.com/I1ASdgphUH4/800x599', width: 4, height: 3 }
  getChildrenPhotoInfo = (width, childrens, columns, margin = 2) => {
    const photos = childrens.map(child => {
      return {
        src: child.props.src,
        width: child.props.galleryStyle.width,
        height: child.props.galleryStyle.height,
        props: child.props
      };
    });

    const results = (0, computeImage.computeSizes)({
      width: width, // 屏幕的宽度
      columns: columns, // 外层能放几列
      margin: margin,
      photos: photos
    });

    return results;
  };

  // 根据密集程度获得列数
  getColumnsByIntensity = intensity => {
    return [intensity, intensity + 2, intensity + 4];
  };

  render() {
    const {
      imgContainerMargin, // 图片间距
      intensity, // 密集度，默认在不同屏幕尺寸下排列的元素
      galleryWidth, // 画廊所占宽度 全幅，中幅，小幅 'fullWidth'
      id,
      backgroundInfo
    } = this.props;
    // 背景样式
    const backgroundStyle = Object.assign(
      { position: "relative" },
      backgroundSetting.getBackgroundStyle(backgroundInfo)
    );

    const width = this.state.width;

    const columnArrange = this.getColumnsByIntensity(intensity);

    return (
      <Measure
        bounds
        onResize={contentRect =>
          this.setState({ width: contentRect.bounds.width })
        }>
        {({ measureRef }) => {
          if (width < 1) {
            return <div ref={measureRef} />;
          }
          let columns = 1;
          if (width >= 280) {
            columns = columnArrange[0];
          }
          if (width >= 1200) {
            columns = columnArrange[1];
          }
          if (width >= 1824) {
            columns = columnArrange[2];
          }

          return (
            <div id={id} style={backgroundStyle}>
              <div
                style={{ width: `${galleryWidth}%`, margin: "auto" }}
                ref={measureRef}
                name="gallery">
                {this.getChildrenPhotoInfo(
                  width,
                  React.Children.toArray(this.props.children),
                  columns,
                  imgContainerMargin
                ).map(childPhotoInfo => (
                  <div
                    key={childPhotoInfo.props.selfkey}
                    name="imgContainer"
                    style={Object.assign(
                      { margin: imgContainerMargin },
                      imgContainerStyle
                    )}>
                    <div>
                      <PreviewImageArea
                        noMeasure={true}
                        src={childPhotoInfo.src}
                        imageContainerStyle={{}}
                        imageStyle={{
                          width: childPhotoInfo.width,
                          height: childPhotoInfo.height
                        }}
                        {...childPhotoInfo.props}
                      />
                    </div>
                  </div>
                ))}
                <div
                  name="buzhidaoganshadediv"
                  style={{ display: "table", clear: "both" }}
                />
              </div>
            </div>
          );
        }}
      </Measure>
    );
  }
}

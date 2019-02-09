// {
//   native: false, nodeName: 'PhotoGallery',
//     props: { imgContainerMargin: 2, intensity: 'normal', galleryWidth: '100%' },
//   children: [
//     {
//       native: false,
//       nodeName: 'ImageArea',
//       props: {
//         alt: 'initial',
//         src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
//         galleryStyle: { type: 'verticalGallery', width: 1, height: 1 }
//       }
//     },

//     {
//       native: false,
//       nodeName: 'ImageArea',
//       props: {
//         alt: 'initial',
//         src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
//         galleryStyle: { type: 'verticalGallery', width: 1, height: 1 }
//       }
//     },
//     {
//       native: false,
//       nodeName: 'ImageArea',
//       props: {
//         alt: 'initial',
//         src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
//         galleryStyle: { type: 'verticalGallery', width: 1, height: 1 }
//       }
//     },
//     {
//       native: false,
//       nodeName: 'ImageArea',
//       props: {
//         alt: 'initial',
//         src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
//         galleryStyle: { type: 'verticalGallery', width: 1, height: 1 }
//       }
//     },
//   ]
// }

// {"native":false,"nodeName":"PhotoGallery","props":{"imgContainerMargin":2},"children":[{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"https://source.unsplash.com/2ShvY8Lf6l0/800x599","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}},{"native":false,"nodeName":"ImageArea","props":{"alt":"initial","src":"https://source.unsplash.com/iecJiKe_RNg/600x799","galleryStyle":{"type":"verticalGallery","width":1,"height":1}}}]}

// const photos = [

//   { src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 3, height: 1 },
//   // { src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', width: 1, height: 1 },
//   // { src: 'http://blog-src.b0.upaiyun.com/production/photography/RackMultipart20180221-16175-12510tn.jpeg', width: 3, height: 1 },
//   { src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', width: 1, height: 1 },
//   { src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', width: 1, height: 1 },
//   { src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599', width: 1, height: 1 },
//   { src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 1, height: 1 },
//   { src: 'https://source.unsplash.com/PpOHJezOalU/800x599', width: 8, height: 6.9 },
//   { src: 'https://source.unsplash.com/I1ASdgphUH4/800x599', width: 4, height: 3 }
// ];

import React from "react";
import PropTypes from "prop-types";
import Measure from "react-measure";
import computeImage from "utils/computeImage";
import EditableImageArea from "../edit/imageArea";
import AdjustGalleryStyleButton from "components/editTools/photoGallery/adjustGalleryStyleButton";
import AddGalleryElementButton from "components/editTools/photoGallery/addGalleryElementButton";
import ChangeBackgroundButton from "components/editTools/layout/changeBackgroundButton";
import backgroundSetting from "jssSettings/backgroundSetting";
import actionTypes from "constants/action-types";

const imgContainerStyle = {
  overflow: "hidden",
  float: "left",
  position: "relative"
};

export default class EditablePhotoGallery extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = { width: -1 }; // 假定屏幕原始宽度
  }

  getChildContext() {
    return { store: this.context.store };
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

  initialLayoutId = () => {
    this.context.store.dispatch({
      type: actionTypes.UPDATE_FLATTENED_NODE,
      payload: {
        nestedKey: `${this.props.selfkey},props,id`,
        value: this.props.selfkey
      },
      target: "node"
    });
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

    const width = this.state.width;

    const columnArrange = this.getColumnsByIntensity(intensity);

    const backgroundStyle = Object.assign(
      { position: "relative" },
      backgroundSetting.getBackgroundStyle(backgroundInfo)
    );

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
              <ChangeBackgroundButton
                backgroundInfo={backgroundInfo}
                parentkey={this.props.selfkey}
              />
              <AdjustGalleryStyleButton {...this.props} />
              <div
                style={{
                  width: `${galleryWidth}%`,
                  margin: "auto",
                  padding: "25px 0"
                }}
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
                    {/* <div> */}
                    <EditableImageArea
                      src={childPhotoInfo.src}
                      imageContainerStyle={{}}
                      imageStyle={{
                        width: childPhotoInfo.width,
                        height: childPhotoInfo.height
                      }}
                      noMeasure={true}
                      {...childPhotoInfo.props}
                    />
                    {/* </div> */}
                  </div>
                ))}

                <div
                  name="buzhidaoganshadediv"
                  style={{ display: "table", clear: "both" }}
                />
                <AddGalleryElementButton {...this.props} />
              </div>
            </div>
          );
        }}
      </Measure>
    );
  }
}

EditablePhotoGallery.childContextTypes = {
  store: PropTypes.object
};

EditablePhotoGallery.contextTypes = {
  store: PropTypes.object
};

import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import actionTypes from "constants/action-types";

export default class AddGalleryElementButton extends React.Component {
  constructor(props, context) {
    super(props);
  }

  addGalleryElement = () => {
    const defaultChild = {
      native: false,
      nodeName: "ImageArea",
      props: {
        alt: "initial",
        src:
          "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/bcde62d234912ae4371e20ec8cabcc02",
        galleryStyle: { type: "verticalGallery", width: 1, height: 1 }
      }
    };

    this.context.store.dispatch({
      type: actionTypes.ADD_FLATTENED_NODE,
      payload: { targetKey: this.props.selfkey, nodeData: defaultChild },
    });

    // 默认图片
    // http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/bcde62d234912ae4371e20ec8cabcc02
  };

  render() {
    return (
      <div className={"addElementButtonContanier"}>
        <Button onClick={this.addGalleryElement} className={"addElementButton"}>
          增加元素
        </Button>
      </div>
    );
  }
}

AddGalleryElementButton.contextTypes = {
  store: PropTypes.object
};

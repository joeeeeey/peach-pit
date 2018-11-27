import React, { Component } from "react";
import PreviewRoot from "../../../components/preview/root";
import PreviewVerticalLayout from "../../../components/preview/verticalLayout";
import PreviewVerticalGrid from "../../../components/preview/verticalGrid";
import PreviewTextArea from "../../../components/preview/textArea";
import PreviewImageArea from "../../../components/preview/imageArea";

class ResponsiveIntro extends Component {
  render() {
    return React.createElement(
      PreviewRoot,
      { style: {} },
      React.createElement(
        PreviewVerticalLayout,
        {
          backgroundInfo: {
            background: "white",
            backgroundType: "pureColor",
            imageInfo: {},
            fillType: null,
            enableParallex: null
          },
          id: "VerticalLayout_22d3a3e3480e5f87286c175a75839e47",
          flex: [4, 8],
          fullWithChilren: false
        },
        React.createElement(
          PreviewVerticalGrid,
          {},
          React.createElement(PreviewTextArea, {
            deltaDeltaValue: [
              {
                insert: "响应式设计",
                attributes: { font: "serif", size: "large" }
              },
              { insert: "\n", attributes: { header: 2 } },
              { insert: "\n" },
              {
                insert: "无需任何编程或设计基础 ",
                attributes: { font: "serif", script: "super" }
              },
              { insert: "\n", attributes: { header: 1 } },
              {
                insert: "所有任务都可在屏幕上一并搞定",
                attributes: { font: "serif", script: "super" }
              },
              { insert: "\n", attributes: { header: 1 } },
              {
                insert: "一次搭建，多端方便",
                attributes: { color: "#1a1a1a", font: "serif", script: "super" }
              },
              { insert: "\n", attributes: { header: 1 } }
            ],
            readOnly: false
          })
        ),
        React.createElement(
          PreviewVerticalGrid,
          {},
          React.createElement(PreviewImageArea, {
            alt: "initial",
            src:
              "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/user/1/site/48/69f9f579bdeeb4ff7bbe6000de7006aa.jpg"
          })
        )
      )
    );
  }
}

export default ResponsiveIntro;

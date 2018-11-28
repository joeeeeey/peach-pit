import React from "react";
import PropTypes from "prop-types";
import nodeOperation from "../../utils/nodeOperation";
import BlockService from "../../services/blockService";

// Preview components in other views
import PreviewRoot from "../../components/preview/root";
import PreviewTextArea from "../../components/preview/textArea";
import PreviewLetfRightGrid from "../../components/preview/letfRightGrid";
import PreviewCard from "../../components/preview/card";
import PreviewCardMedia from "../../components/preview/cardMedia";
import PreviewVerticalGrid from "../../components/preview/verticalGrid";
import PreviewVerticalLayout from "../../components/preview/verticalLayout";
import PreviewImageArea from "../../components/preview/imageArea";
import PreviewNavBar from "../../components/preview/navBar";
import PreviewPhotoGallery from "../../components/preview/photoGallery";
import PreviewImageDescription from "../../components/preview/imageDescription";

const blockService = new BlockService();

class Preview extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = { nodeData: null };
  }

  getSourceFromUrl = () => {
    try {
      const urlParams = new URL(window.location.href);
      const source = urlParams.searchParams.get("source");
      if (source.toString() !== "null") {
        return { source: source, id: urlParams.searchParams.get("id") };
      } else {
        return { source: null };
      }
    } catch (error) {
      alert("出现异常");
      return { source: null };
    }
  };

  getRoleNameFromStore = store => {
    const userState = store.getState().user;
    const adminState = store.getState().administrator;
    if (userState && userState.isLogin) {
      return "user";
    } else if (adminState && adminState.isLogin) {
      return "admin";
    } else {
      return "unknown";
    }
  };

  // 最适合取到数据的地方
  componentDidMount = () => {
    // 根据`当前用户角色` 和 `资源` 初始化预览页信息
    const source = this.getSourceFromUrl();
    let role = { role: this.getRoleNameFromStore(this.context.store) };

    const previewInfo = Object.assign({}, source, role);
    // console.log(previewInfo)
    if (previewInfo.source) {
      blockService
        .getNodeDataInPreviewInfo(previewInfo)
        .then(response => {
          const { data } = response;
          if (data.code === 0) {
            this.initialNodeData(data.data);
          } else {
            console.error(data.msg);
          }
        })
        .catch(function(error) {
          console.error(error.msg);
        });
    } else {
      alert("source cannot be null");
    }
  };

  initialNodeData(block) {
    let ftData = nodeOperation.flattenDomTree(this.wrapRoot(block));
    this.setState({ nodeData: ftData });
  }

  wrapRoot = (block = null) => {
    return nodeOperation.wrapRoot(block);
  };

  toF = code => {
    const func = new Function("React", "Components", `return ${code}`);
    // TODO ADD ALL components here
    const App = func(React, {
      PreviewRoot: PreviewRoot,
      PreviewTextArea: PreviewTextArea,
      PreviewLetfRightGrid: PreviewLetfRightGrid,
      PreviewCard: PreviewCard,
      PreviewCardMedia: PreviewCardMedia,
      PreviewVerticalGrid: PreviewVerticalGrid,
      PreviewVerticalLayout: PreviewVerticalLayout,
      PreviewImageArea: PreviewImageArea,
      PreviewNavBar: PreviewNavBar,
      PreviewPhotoGallery: PreviewPhotoGallery,
      PreviewImageDescription: PreviewImageDescription
    });
    return App;
  };

  render = () => {
    return (
      <div>
        {this.toF(
          nodeOperation.flattenedData2Code(
            JSON.parse(JSON.stringify(this.state.nodeData)),
            "preview"
          )
        )}
      </div>
    );
  };
}

Preview.contextTypes = {
  store: PropTypes.object
};

export default Preview;

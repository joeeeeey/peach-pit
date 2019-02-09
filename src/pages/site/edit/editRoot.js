import React from "react";
import PropTypes from "prop-types";
import nodeOperation from "utils/nodeOperation";
import AnyEdit from "pages/site/edit/anyEdit";

class EditRoot extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { nodeData: null };
  }

  getEditCollection = (heightenDomTree, parentkey = "root") => {
    if (heightenDomTree) {
      const { children, ...other } = heightenDomTree;
      other.props.parentkey = parentkey;
      return (
        <AnyEdit {...other.props} {...other} >
          {children && children.map(child => this.getEditCollection(child, other.props.selfkey))}
        </AnyEdit>
      );
    }
    return null;
  };

  // TODO 1
  //   递归生成单元 edit 组件
  //   将 ...node.key 整个传入
  //   在单元 edit 组件中监听 ...node.key 的变化

  // TODO 2
  // Redux 中新增一个对象为 topChildrenNodes
  // [ {}, {}, ]  用于存储顶层节点，在
  // editRoot 中遍历该对象传给 topLevelEdit,
  // topLevelEdit 将props转化为 react code.
  // TODO

  // 放弃方案一
  
  // 先增加 react-redux 便于调试


  render = () => {
    const { flattenedNode } = this.props;
    const editCollection = this.getEditCollection(nodeOperation.heightenDomTree(flattenedNode));

    return <div> {editCollection}</div>;
  };

  getChildContext() {
    return { store: this.context.store };
  }
}

EditRoot.contextTypes = {
  store: PropTypes.object
};

EditRoot.propTypes = {
  flattenedNode: PropTypes.object
};

EditRoot.childContextTypes = {
  store: PropTypes.object
};

export default EditRoot;

/**
 * @file Each component connects to self data in the node tree.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { widgets, stringifyProps } from "utils/nodeWrapper";

const mapStateToProps = (state, ownProps) => ({
  node: state.node[ownProps.selfkey],
  relation: state.node._relation[ownProps.selfkey] || null,
});

class NodeWrapper extends React.Component {
  constructor(props){
    super(props);
    this.state = JSON.parse(JSON.stringify(props));
  }

  getChildren = () => {
    if (this.state.relation) {
      return this.state.relation.map((selfkey) =>
        <NodeWrapperWithRedux selfkey={selfkey} key={selfkey}/>
      )
    }
    return null
  }


  shouldComponentUpdate(nextProps) {
    const stateStr = stringifyProps(this.state);
    const nextPropsStr = stringifyProps(nextProps);
    if (stateStr === nextPropsStr) {
      return false;
    }

    this.setState(JSON.parse(nextPropsStr));

    return true;
  }

  render = () => {
    const { node } = this.state;
    let tagName = '';
    if (node.native) {
      tagName = node.nodeName;
    } else {
      tagName = widgets[`Editable${node.nodeName}`];
    }

    const children = this.getChildren();

    return (
      children ? React.createElement(
        tagName,
        node.props,
        children,
      ) : React.createElement(
        tagName,
        node.props,
      ))
  };

  getChildContext() {
    return { store: this.context.store };
  }
}

NodeWrapper.contextTypes = {
  store: PropTypes.object
};

NodeWrapper.propTypes = {
  flattenedNode: PropTypes.object
};

NodeWrapper.childContextTypes = {
  store: PropTypes.object
};

const NodeWrapperWithRedux = connect(mapStateToProps)(NodeWrapper);
export default NodeWrapperWithRedux;
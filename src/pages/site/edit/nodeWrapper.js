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

class EditRoot extends React.Component {
  constructor(props){
    super(props);
    this.state = JSON.parse(JSON.stringify(props));
  }

  getChildren = () => {
    if (this.state.relation) {
      return this.state.relation.map((selfkey) =>
        <EditRootWithRedux selfkey={selfkey} key={selfkey}/>
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

EditRoot.contextTypes = {
  store: PropTypes.object
};

EditRoot.propTypes = {
  flattenedNode: PropTypes.object
};

EditRoot.childContextTypes = {
  store: PropTypes.object
};

const EditRootWithRedux = connect(mapStateToProps)(EditRoot);
export default EditRootWithRedux;
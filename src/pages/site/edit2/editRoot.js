import React from "react";
import PropTypes from "prop-types";
import EditableTextArea from "components/edit/textArea";
import EditableVerticalLayout from "components/edit/verticalLayout";
import EditableVerticalGrid from "components/edit/verticalGrid";
import EditableImageArea from "components/edit/imageArea";
import EditableNavBar from "components/edit/navBar";
import EditablePhotoGallery from "components/edit/photoGallery";
import EditableImageDescription from "components/edit/imageDescription";
import { connect } from 'react-redux';

const widgets = {
  EditableTextArea: EditableTextArea,
  EditableVerticalGrid: EditableVerticalGrid,
  EditableVerticalLayout: EditableVerticalLayout,
  EditableImageArea: EditableImageArea,
  EditableNavBar: EditableNavBar,
  EditablePhotoGallery: EditablePhotoGallery,
  EditableImageDescription: EditableImageDescription
};

const mapStateToProps = (state, ownProps) => ({
  node: state.node[ownProps.selfkey],
  relation: state.node._relation[ownProps.selfkey] || null,
});

class EditRoot extends React.Component {
  getChildren = () => {
    if (this.props.relation) {
      return this.props.relation.map((x, index) =>
        <EditRootWithRedux selfkey={x} key={index}/>
      )
    }
    return null
  }

  render = () => {
    const { node } = this.props;

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
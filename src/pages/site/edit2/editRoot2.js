import React from "react";
import PropTypes from "prop-types";
// import nodeOperation from "utils/nodeOperation";
import EditableTextArea from "components/edit/textArea";
import EditableVerticalLayout from "components/edit/verticalLayout";
import EditableVerticalGrid from "components/edit/verticalGrid";
import EditableImageArea from "components/edit/imageArea";
import EditableNavBar from "components/edit/navBar";
import EditablePhotoGallery from "components/edit/photoGallery";
import EditableImageDescription from "components/edit/imageDescription";
import { connect } from 'react-redux';
import EditRoot from "pages/site/edit2/editRoot";

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

class EditRoot2 extends React.Component {
  getChildren = () => {
    if (this.props.relation) {
      return this.props.relation.map(x =>
        <EditRoot selfkey={x} />
      )
    }
    return null
  }

  render = () => {
    const { node } = this.props;

    console.log('getChildren: ', this.props);
    let tagName = '';
    // console.log('node is: ',   this.props.relation && this.props.relation.map(x =>
    //   <EditRoot2 selfkey={x} />
    // ));
    if (node.native) {
      tagName = node.nodeName;
    } else {
      tagName = widgets[`Editable${node.nodeName}`];
    }

    return (React.createElement(
      tagName,
      node.props,
      this.getChildren(),
    ))
  };

  getChildContext() {
    return { store: this.context.store };
  }
}

EditRoot2.contextTypes = {
  store: PropTypes.object
};

EditRoot2.propTypes = {
  flattenedNode: PropTypes.object
};

EditRoot2.childContextTypes = {
  store: PropTypes.object
};

export default connect(mapStateToProps)(EditRoot2);

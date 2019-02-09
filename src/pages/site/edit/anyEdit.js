import React from "react";
import PropTypes from "prop-types";
import EditableRoot from "components/edit/root";
import EditableTextArea from "components/edit/textArea";
import EditableVerticalLayout from "components/edit/verticalLayout";
import EditableVerticalGrid from "components/edit/verticalGrid";
import EditableImageArea from "components/edit/imageArea";
import EditableNavBar from "components/edit/navBar";
import EditablePhotoGallery from "components/edit/photoGallery";
import EditableImageDescription from "components/edit/imageDescription";

/*
 * Put all editable components here
 */
const widgets = {
  EditableRoot: EditableRoot,
  EditableTextArea: EditableTextArea,
  EditableVerticalGrid: EditableVerticalGrid,
  EditableVerticalLayout: EditableVerticalLayout,
  EditableImageArea: EditableImageArea,
  EditableNavBar: EditableNavBar,
  EditablePhotoGallery: EditablePhotoGallery,
  EditableImageDescription: EditableImageDescription
};
// const func = (function (React, Components) {
//   return function App() {
//     return (
//       <div>
//         {
//           React.createElement(
//             Components.AppBar,
//             null
//           )
//         }
//         {
//           React.createElement(
//             "h1",
//             null,
//             "Hello, world!")
//         }
//       </div>
//     )
//   }
// })
const toF = code => {
  const func = new Function("React", "Components", `return ${code}`);
  const App = func(React, widgets);

  return App;
};

class AnyEdit extends React.PureComponent {
  getCode = () => {
    let tagName;
    if (this.props.native) {
      tagName = this.props.nodeName;
    } else {
      tagName = `${"Editable" + this.props.nodeName}`;
    }
    
    console.log('this.props: ', this.props);
    // console.log('tagName: ', tagName);
    // console.log('widgets[tagName]: ', widgets[tagName]);

    return React.createElement(
      widgets[tagName] || tagName,
      this.props.props,
      this.props.children,
    );
  };

  render = () => {
    const jsxCode = this.getCode();
    console.log('jsxCode: ', jsxCode);
    // console.log("this.props: ", this.props);
    // console.log('getCode: ', toF(this.getCode()));
    // const { children } = this.props;
    return <div> {jsxCode} </div>;
  };

  getChildContext() {
    return { store: this.context.store };
  }
}

// AnyEdit.propTypes = {
//   flattenedNode: PropTypes.object
// }

AnyEdit.contextTypes = {
  store: PropTypes.object
};

AnyEdit.childContextTypes = {
  store: PropTypes.object
};

export default AnyEdit;

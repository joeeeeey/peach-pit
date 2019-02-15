/**
 * @file Common methods of nodeWrapper
 */

import EditableTextArea from "components/edit/textArea";
import EditableVerticalLayout from "components/edit/verticalLayout";
import EditableVerticalGrid from "components/edit/verticalGrid";
import EditableImageArea from "components/edit/imageArea";
import EditableNavBar from "components/edit/navBar";
import EditablePhotoGallery from "components/edit/photoGallery";
import EditableImageDescription from "components/edit/imageDescription";

export const widgets = {
  EditableTextArea: EditableTextArea,
  EditableVerticalGrid: EditableVerticalGrid,
  EditableVerticalLayout: EditableVerticalLayout,
  EditableImageArea: EditableImageArea,
  EditableNavBar: EditableNavBar,
  EditablePhotoGallery: EditablePhotoGallery,
  EditableImageDescription: EditableImageDescription
};

export const stringifyProps = (props) => {
  const { dispatch, ...other } = props;
  return JSON.stringify(other);
}
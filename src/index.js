import React from "react";
import ReactDOM from "react-dom";
import Index from "pages/index";

// Import all css files here.
import "antd/dist/antd.css";
import "css/homePage.css";
import "css/editPage.css";
import "css/imageUploader.css";
import "css/quill.css";
import "react-quill/dist/quill.snow.css"; // ES6
import "css/registerFrom.css";
import "css/verticalLayout.css";
import "css/addElementButton.css";

ReactDOM.render(<Index />, document.querySelector("#root"));

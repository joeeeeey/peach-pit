// import React, { Component } from 'react';

// import MuButton from 'material-ui/Button';
// import { Popover } from 'antd';
// import ReactQuill from 'react-quill'; // ES6
// import 'react-quill/dist/quill.snow.css'; // ES6

// import '../css/quill.css'
// import ResponsiveCardGrid from '../components/common/grids/responsiveCardGrid'
// import Grid from 'material-ui/Grid';

// function randomStr() {
//   return `${(Math.random() + Math.random()).toString()}`
// }

// const id = `Quill${randomStr().replace(/\./i, '')}`

// const content = (
//   <div>
//     <p>Content</p>
//     <p>Content</p>
//   </div>
// );


// class CustomToolbar extends Component {
//   onMouseEnter = () => {
//     this.props.hoverToolbar(true)
//   }

//   onMouseLeave = () => {
//     this.props.hoverToolbar(false)
//   }

//   render() {
//     return (
//       <div id={`${id}`} onMouseEnter={this.onMouseEnter}
//         onMouseLeave={this.onMouseLeave}>
//         <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
//           {/* <option value="1"></option>
//           <option value="2"></option> */}
//           {/* <option selected></option> */}
//         </select>
//         <select className="ql-font"></select>
//         <button className="ql-bold" />
//         <button className="ql-italic" />
//         <button className="ql-underline" />
//         <button className="ql-image" />
//         <select className="ql-align"></select>

//         <select className="ql-color"></select>

//         <button className="ql-list" value="ordered"></button>
//         <button className="ql-list" value="bullet"></button>

//         <button className="ql-script" value="sub"></button>
//         <button className="ql-script" value="super"></button>
//         <button className="ql-indent" value="-1"></button>
//         <button className="ql-indent" value="+1"></button>

//         <select className="ql-size" >
//         </select>

//         <button className="ql-link" />
//       </div>
//     )
//   }
// }

// class Editor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorHtml: [
//         { insert: 'Gandalf', attributes: { bold: true } },
//         { insert: ' the ' },
//         { insert: 'Grey', attributes: { color: '#cccccc' } }
//       ],
//       hoverEditor: false, // 控制样式
//       hidden: false,
//       foucsEditor: false,
//       showToolbar: false,
//       hoverToolbar: false
//     };

//     this.quillRef = null;      // Quill instance
//     this.reactQuillRef = null; // ReactQuill component

//     this.deltaDefaultValue = this.props.deltaDefaultValue
//     this.readOnly = this.props.readOnly || false

//     this.formats = props.fromats ||  ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "color", "align", "script", "direction", "clean"]
//     this.modules = props.modules || {
//       toolbar: {
//         container: `#${id}`,
//       },
//       'history': {          
//         'delay': 3000,
//         'userOnly': true
//       },
//       clipboard: {
//         matchVisual: false,
//       }
//     }
//   }

//   componentDidMount() {
//     this.attachQuillRefs()
//   }

//   componentDidUpdate() {
//     this.attachQuillRefs()
//   }

//   attachQuillRefs = () => {
//     if (typeof this.reactQuillRef.getEditor !== 'function') return;
//     this.quillRef = this.reactQuillRef.getEditor();
//   }

//   handleChange = (html) => {
//     if (this.quillRef) {
//       // TODO 此处将 this.quillRef.editor.delta 报错
//       console.log(JSON.stringify(this.quillRef.editor.delta.ops))
//     }
//   }

//   // 1. 光标在编辑区: 显示 toolbar
//   // 2. 光标不在编辑区, 鼠标停留在 toolbar 上, 显示 toolbar
//   handleFocus = () => {
//     this.setState({ foucsEditor: true, showToolbar: true });
//   }

//   handleBlur = () => {
//     if (this.state.hoverToolbar) {
//       this.setState({ foucsEditor: false });
//     } else {
//       this.setState({ foucsEditor: false, showToolbar: false });
//     }
//   }

//   hoverToolbarHandler = (value) => {
//     if (this.state.foucsEditor) {
//       this.setState({ hoverToolbar: value });
//     } else {
//       this.setState({ hoverToolbar: value, showToolbar: false });
//     }
//   }

//   // 悬浮样式
//   onMouseOver = () => {
//     this.setState({ hoverEditor: true });
//   }

//   onMouseOut = () => {
//     this.setState({ hoverEditor: false });
//   }

//   hovorStyle = () => {
//     if (this.state.hoverEditor) {
//       return { border: '0.005rem solid #6d6d6d' }
//     } else {
//       return {}
//     }
//   }

//   render() {
//     const overlayStyle = { position: 'absolute', bottom: 5, left: 0, zIndex: 1300 }

//     return (
//       <div>
//         <div style={{ position: 'relative' }}>
//           <div hidden={!this.state.showToolbar} style={overlayStyle}>
//             <CustomToolbar hoverToolbar={this.hoverToolbarHandler} />
//           </div>
//         </div>

//         <div
//           onMouseOver={this.onMouseOver}
//           onMouseOut={this.onMouseOut}
//           style={this.hovorStyle()}>
//           <ReactQuill
//             onChange={this.handleChange}
//             modules={this.modules}
//             formats={this.formats}
//             theme={'snow'} // pass false to use minimal theme
//             placeholder={"Write something"}
//             onFocus={this.handleFocus}
//             onBlur={this.handleBlur}
//             ref={(el) => { this.reactQuillRef = el }}
//             defaultValue={this.deltaDefaultValue}
//             readOnly={this.readOnly}
//           // style={this.props.styles}
//           />
//         </div>
//       </div>

//     );
//   }
// }

// export default Editor;

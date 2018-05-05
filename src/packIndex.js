// 该文件会被拷贝到打包文件中的 src/index.js
// 应该只引入预览组件御草的 cssimport React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/index';

import './css/homePage.css'
import './css/verticalLayout.css'
import './css/quill.css'
import 'react-quill/dist/quill.snow.css'; // ES6


ReactDOM.render(<Index />,document.querySelector('#root'));

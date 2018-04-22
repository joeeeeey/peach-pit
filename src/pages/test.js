// http://v0.api.upyun.com/blog-src
// curl -X GET \
// http://v0.api.upyun.com/<bucket>/<path> \
// -H "Authorization: UPYUN <Operator>:<Signature>" \
// -H "Date: <Wed, 29 Oct 2014 11:26:58 GMT>"\
// -H "Content-MD5: <Content-MD5>"\
// # 其他可选参数...  

import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios'
import Button from 'material-ui/Button';
import UploaderEntrance from '../components/editTools/image/uploaderEntrance'
import UploaderArea from '../components/editTools/image/uploaderArea'
import UpyunService from '../services/upyunService'


import '../css/imageUploader.css'


const upyunService = new UpyunService()

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


export default class Avatar extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = { imageUrl: null, UploaderIsHover: false }

    this.imgUploadUrl = "http://v0.api.upyun.com/blog-src/taohe/development"
  }

  // beforeUpload = (file) => {
  //   const isJPG = file.type === 'image/jpeg';
  //   if (!isJPG) {
  //     message.error('You can only upload JPG file!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  //   }
  //   return isJPG && isLt2M;
  // }


  render() {
    return (
      <div>
        {/* <UploaderEntrance />
        <UploaderArea /> */}

      </div>
    );
  }
}

Avatar.contextTypes = {
  store: PropTypes.object
};
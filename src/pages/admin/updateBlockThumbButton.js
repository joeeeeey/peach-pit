// 可传入 props
// source, id


import React, { Component } from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios'
import Cookies from 'js-cookie';
import Button from 'material-ui/Button';
import UpyunService from '../../services/upyunService'
import TemplateService from '../../services/templateService';
import LayoutService from '../../services/layoutService'

const upyunService = new UpyunService()
const templateService = new TemplateService()
const layoutService = new LayoutService()

export default class UpdateBlockThumbButton extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = { imageUrl: null }
  }

  fileInput = (e) => {
    if (e.target.files[0]) {
      this.buildFileReader(e.target.files[0])
    } else {
      return
    }
  }

  getFilePath = (file) => {
    return upyunService.getBasicImgToken(
      {
        source: this.props.source,
        fileName: file.name,
      }
    )
  }

  buildFileReader = (file) => {
    // upyunService
    this.getFilePath(file)
      .then(response => {
        const { data } = response
        if (data.code === 0) {
          this.policy = data.data.policy
          this.token = data.data.token
          this.saveKey = data.data.saveKey
          this.imgUrl = data.data.imgUrl
          this.imgUploadUrl = data.data.imgUploadUrl
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend = (e) => {
            let image = new Image();
            image.src = e.target.result;
            image.onload = () => {
              this.imageInfo = { width: image.width, height: image.height }
            };

            let imgData = e.target.result.split(',')[1]
            imgData = window.atob(imgData)
            let ia = new Uint8Array(imgData.length)
            for (var i = 0; i < imgData.length; i++) {
              ia[i] = imgData.charCodeAt(i)
            }
            const blob = new Blob([ia], { type: 'image/png' })
            this.img = blob
            this.uploadImg()
          }
        } else {
          console.warn(`获取要保存的远端图片路径失败: ${data.msg}`)
        }
      })
      .catch(function (error) {
        console.warn(`获取要保存的远端图片路径失败: ${error}`)
      });
  }

  updateBlock = () => {
    const { source, id } = this.props
    let parmas = { id: id, thumbnail_url: this.imgUrl }
    let service = null
    if (source === 'template') {
      service = templateService
    } else if (source === 'layout') {
      service = layoutService
    }
    service.update(parmas)
      .then((res) => {
        if (res.data.code === 0) {
          message.success(`更新成功`, 1.2)
        } else {
          message.error(`更新失败`, 1.2)
        }
      })


  }

  uploadImg = () => {
    let fd = new FormData()
    fd.append('file', this.img)
    fd.append('policy', this.policy)
    fd.append('signature', this.token)
    axios.post(this.imgUploadUrl, fd)
      .then((res) => {
        if (res.data.code === 200) {
          // alert(JSON.stringify(res.data))
          this.updateBlock()
          // this.props.uploadSuccess()
          // this.updateNodeTree()
        } else {
          message.error(`上传失败`, 1.2)
        }
      })
  }

  UploaderButtonStyle = () => {
    if (this.state.UploaderIsHover) {
      return { backgroundColor: 'rgb(230, 225, 225)' }
    } else {
      return { backgroundColor: 'rgb(241, 238, 238)' }
    }
  }

  render() {
    return (
      <div style={{ "position": "absolute", "display": "inline" }}>
        <div className="upload-btn-wrapper">
          <Button style={this.UploaderButtonStyle()} color={'secondary'}>上传图片</Button>
          <input onChange={this.fileInput} type="file" id="file-input" name="image" accept="image/*" />
        </div>
      </div>
    );
  }
}

UpdateBlockThumbButton.contextTypes = {
  store: PropTypes.object
};
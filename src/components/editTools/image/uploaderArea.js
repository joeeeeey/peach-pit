// 可传入 props
// updateNodeInfo => {targetKey: 'xx', nestedKey: 'xx,xx'}


import React from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios'
import UpyunService from '../../../services/upyunService'
import { Spin } from 'antd';



const upyunService = new UpyunService()

const containerStyle = {
  textAlign: 'center',
  "border": "4px dashed #e2e4e7",
  "bottom": "40px", "left": "30px",
  "right": "30px", "top": "0px",
  "width": "auto", "height": "auto",
  minHeight: 180,
}
export default class UploaderArea extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = { imageUrl: null, UploaderIsHover: false, loading: false }

    // this.imgUploadUrl = "http://v0.api.upyun.com/blog-src/taohe/development"
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



  fileInput = (e) => {
    // 该方法应是在选择图片确认后调用的
    // 但在已经选择过一次图片后点取消 input 仍然会调用此方法导致 file 为空
    // TODO 弄清其中本质
    if (e.target.files[0]) {
      this.buildFileReader(e.target.files[0])
    } else {
      return
    }
  }

  getFilePath = (file) => {
    const { role, source, id } = this.context.store.getState().editInfo
    // TODO 区分完善 admin 和 user 保存图片的路径，可将此逻辑移到后端处理

    return upyunService.getImgToken(
      {
        filePath: `/${role}/${source}/${file.name}`,
        role: role,
        // TODO roleId 在 state 中取不到直接在 cookie 中取?
        roleId: this.context.store.getState()[role].profile.id,
        source: source || 'layout',
        sourceId: id || 'tmp',
        fileName: file.name,
        page: 'editPage',
      }
    )
  }

  buildFileReader = (file) => {
    // TODO 增加 loading 
    this.setState({ loading: true })
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
          this.fileSize = file.size
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend = (e) => {
            // e.target.result 取到 base64 字符串用来本地预览
            // 此处直接上传成功后用 CDN url 预览
            // this.imgPreview = e.target.result

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
            // this.displayPreview = true
            // console.log(this.img)
            this.uploadImg()
          }
        } else {
          this.setState({ loading: false })
          console.warn(`获取要保存的远端图片路径失败: ${data.msg}`)
        }
      })
      .catch(function (error) {
        this.setState({ loading: false })
        console.warn(`获取要保存的远端图片路径失败: ${error}`)
      });
  }

  uploadImg = () => {
    let fd = new FormData()
    fd.append('file', this.img)
    fd.append('policy', this.policy)
    fd.append('signature', this.token)
    axios.post(this.imgUploadUrl, fd)
      .then((res) => {
        this.setState({ loading: false })
        if (res.data.code === 200) {
          message.success(`上传成功`, 2)
          this.props.uploadSuccess(this.imgUrl, this.fileSize)

          // this.updateNodeTree()
        } else {
          message.error(`上传失败`, 1.2)
        }
      })
  }

  handlerUploaderHover = () => {
    this.setState({
      UploaderIsHover: true
    })
  }

  handlerUploaderMouseLeave = () => {
    this.setState({
      UploaderIsHover: false
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
      <Spin tip="正在努力上传中，请稍等.." spinning={this.state.loading}>
        <div style={containerStyle} >
          <div className="upload-btn-wrapper" onMouseLeave={this.handlerUploaderMouseLeave} onMouseOver={this.handlerUploaderHover}>
            <button style={this.UploaderButtonStyle()} className="btn">上传图片</button>
            <input onChange={this.fileInput} type="file" id="file-input" name="image" accept="image/*" />
          </div>
        </div>
      </Spin>

    );
  }
}

UploaderArea.contextTypes = {
  store: PropTypes.object
};
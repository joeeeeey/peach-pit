import BaseService from './baseService'

class UpyunService extends BaseService {
  getImgToken = (params) => {
    return this.post('/api/get_img_token', params)
  }
  
  getBasicImgToken = (params) => {
    return this.post('/api/admin/get_basic_img_token', params)
  }  

  showUploadedFiles = (params) => {
    return this.post('/api/show_uploaded_files', params)
  }
}

export default UpyunService;
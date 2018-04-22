import BaseService from './baseService'

class UpyunService extends BaseService {
  getImgToken = (params) => {
    return this.post('/api/get_img_token', params)
  }
}

export default UpyunService;
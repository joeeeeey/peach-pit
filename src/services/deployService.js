// 部署网站的服务
import BaseService from './baseService'

class DeployService extends BaseService {
  getContainerPreviewFileRelativePath = () => {
    return this.get('/api/site/get_container_preview_file_relative_path')
  }

  deploy = (params) => {
    return this.post('/api/deploy_site', params)
  }
}

export default DeployService;
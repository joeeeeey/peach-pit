import BaseService from './baseService'

class TemplateService extends BaseService {
  addTemplate = (params) => {
    return this.post('/api/admin/add_template', params)
  }
}

export default TemplateService;
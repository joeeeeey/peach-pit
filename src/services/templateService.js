import BaseService from './baseService'

class TemplateService extends BaseService {
  addTemplate = (params) => {
    return this.post('/api/admin/add_template', params)
  }

  update = (params) => {
    return this.post('/api/admin/update_template', params)
  }

  updateTemplate = (params) => {
    return this.post('/api/admin/update_template', params)
  }

  getAllTemplates = (params) => {
    return this.get('/api/admin/get_all_templates', params)
  }

  getTemplateById = (params) => {
    return this.get('/api/get_template_by_id', params)
  }

  // 参数太多，使用了 post
  getActiveTemplates = (params) => {
    return this.post('/api/get_all_templates', params)
  }
  // 参数太多，使用了 post
  getGroupedTemplate = (params) => {
    return this.post('/api/get_grouped_template', params)
  }
}

export default TemplateService;
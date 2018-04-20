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

  getActiveTemplates = (params) => {
    return this.get('/api/get_all_templates', params)
  }    
}

export default TemplateService;
import BaseService from './baseService'

class LayoutService extends BaseService {
  addLayout = (params) => {
    return this.post('/api/admin/add_layout', params)
  }

  updateLayout = (params) => {
    return this.post('/api/admin/update_layout', params)
  }

  getAllLayouts = (params) => {
    return this.get('/api/admin/get_all_layouts', params)
  }  

  getLayoutById = (params) => {
    return this.get('/api/get_layout_by_id', params)
  }

  getActiveLayouts = (params) => {
    return this.get('/api/get_active_layouts', params)
  } 
  
}

export default LayoutService;
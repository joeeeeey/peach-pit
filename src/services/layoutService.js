import BaseService from './baseService'

class LayoutService extends BaseService {
  addLayout = (params) => {
    return this.post('/api/admin/add_layout', params)
  }

  update = (params) => {
    return this.post('/api/admin/update_layout', params)
  }

  updateLayout = (params) => {
    return this.post('/api/admin/update_layout', params)
  }

  getAllLayouts = (params, editInfo) => {
    // TODO admin 能获取的应是 active 为 true 并且开放给 admin 的
    // User 能获取的应是 active 为 true 并且除了标记开放给 admin 的
    if (editInfo.role === 'user') {
      return this.get('/api/get_all_layouts', params)
    } else if (editInfo.role === 'administrator') {
      return this.get('/api/admin/get_all_layouts', params)
    }
  }

  getLayoutById = (params) => {
    return this.get('/api/get_layout_by_id', params)
  }

  getActiveLayouts = (params) => {
    return this.get('/api/get_active_layouts', params)
  }

}

export default LayoutService;
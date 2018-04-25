import BaseService from './baseService'

class SiteService extends BaseService {
  addSiteByTemplate = (params) => {
    return this.post('/api/add_site_by_template', params)
  }

  getSiteById = (params) => {
    return this.get('/api/get_site_by_id', params)
  }

  update = (params) => {
    return this.post('/api/update_site', params)
  }

  getUserSitesInfo = () => {
    return this.get('/api/get_user_sites_info')
  }

  deleteSite = (params) => {
    return this.post('/api/delete_site', params)
  }
}

export default SiteService;
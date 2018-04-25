import BaseService from './baseService'

class SiteService extends BaseService {
  addSiteByTemplate = (params) => {
    return this.post('/api/add_site_by_template', params)
  }

  getSiteById = (params) => {
    return this.get('/api/get_site_by_id', params)
  }

}

export default SiteService;
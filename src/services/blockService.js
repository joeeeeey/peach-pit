// import BaseService from './baseService'
import LayoutService from './layoutService'
import TemplatService from './templateService'
import SiteService from './siteService'

const layoutService = new LayoutService()
const templatService = new TemplatService()
const siteService = new SiteService()

class BlockService {
  getData = (editInfo) => {
    const { source, id } = editInfo
    console.log(`block service ${JSON.stringify(editInfo)}`)
    switch (source) {
      case 'template':
        return templatService.getTemplateById({ id: id })
      case 'layout':
        return layoutService.getLayoutById({ id: id })
      case 'site':
        return siteService.getSiteById({ id: id })
      default:
        break;
    }
  }
  // {source: "template", id: "2", role: "admin"}
  // {source: "site", id: "2", role: "user"}
  getNodeDataInEditInfo = (editInfo) => {
    return this.getData(editInfo)
  }

  getNodeDataInPreviewInfo = (editInfo) => {
    return this.getData(editInfo)
  }

}

export default BlockService;
// import BaseService from './baseService'
import LayoutService from './layoutService'
import TemplatService from './templateService'

const layoutService = new LayoutService()
const templatService = new TemplatService()

class BlockService {
  getData = (editInfo) => {
    const { source, id } = editInfo
    switch (source) {
      case 'template':
        return templatService.getTemplateById({ id: id })
      case 'layout':
        return layoutService.getLayoutById({ id: id })
      case 'site':
        break;
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
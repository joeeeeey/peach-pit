import axios from 'axios'

class BaseService {
  get = (url, params={}) => {
    return axios.get(url, {
      params: params
    })
  }

  post = (url, params={}) => {
    return axios.post(url, {
      params: params
    })
  }
}

export default BaseService;
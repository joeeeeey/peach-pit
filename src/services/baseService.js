import axios from 'axios'

class BaseService {
  get = (url, params={}, timeout = 50000) => {
    this.instance = this.instance || axios.create();

    this.instance.defaults.timeout = timeout;

    return this.instance.get(url, {
      params: params,
      timeout: timeout
    })
  }

  post = (url, params={}, timeout = 50000) => {
    this.instance = this.instance || axios.create();

    this.instance.defaults.timeout = timeout;

    return this.instance.post(url, {
      params: params,
      timeout: timeout
    })
  }
}

export default BaseService;
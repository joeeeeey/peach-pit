import axios from 'axios'

class BaseService {
  get = (url, params={}) => {
    axios.get(url, {
      params: params
    })
    .then(function (response) {
      console.log(response);
      return response
    })
    .catch(function (error) {
      console.log(error);
      return {code:0, msg: error.msg}
    });
  }

  post = (url, params={}) => {
    return axios.post(url, {
      params: params
    })
  }
}

export default BaseService;
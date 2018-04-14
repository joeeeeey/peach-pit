import BaseService from './baseService'

class UserService extends BaseService {
  register = (params) => {
    return this.post('/api/user/register', params)
  }
}


export default UserService;


// deploy = () => {
//   axios.get('/api/user', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
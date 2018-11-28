import BaseService from "./baseService";

class UserService extends BaseService {
  register = params => {
    return this.post("/api/user/register", params);
  };

  login = params => {
    return this.post("/api/user/login", params);
  };
}

export default UserService;

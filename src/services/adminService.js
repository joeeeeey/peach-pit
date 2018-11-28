import BaseService from "./baseService";

class AdminService extends BaseService {
  login = params => {
    return this.post("/api/admin/login", params);
  };
}

export default AdminService;

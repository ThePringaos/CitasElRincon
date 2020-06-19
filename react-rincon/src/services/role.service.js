import http from "../http-common";

class RoleDataService {

  getAll() {
    return http.get("/role/list");
  }

  get(id) {
    return http.get(`/role/${id}`);
  }

  create(data) {
    return http.post("/role/", data);
  }

  update(data) {
    return http.put(`/role/`, data);
  }

  delete(id) {
    return http.delete(`/role/${id}`);
  }
}

export default new RoleDataService();
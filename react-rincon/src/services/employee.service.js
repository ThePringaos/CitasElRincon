import http from "../http-common";

class EmployeeDataService {

  getAll() {
    return http.get("/list");
  }

  get(id) {
    return http.get(`/${id}`);
  }

  create(data) {
    return http.post("/", data);
  }

  update(id, data) {
    return http.put(`/${id}`, data);
  }

  delete(id) {
    return http.delete(`/${id}`);
  }
}

export default new EmployeeDataService();
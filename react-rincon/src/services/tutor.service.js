import http from "../http-common";

class TutorDataService {

  getAll() {
    return http.get("/tutor/list");
  }

  get(id) {
    return http.get(`/tutor/${id}`);
  }

  create(data) {
    return http.post("/tutor/", data);
  }

  update(id, data) {
    return http.put(`/tutor/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutor/${id}`);
  }
}

export default new TutorDataService();
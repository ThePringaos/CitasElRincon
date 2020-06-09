import http from "../http-common";

class ImageDataService {

  getAll() {
    return http.get("/image/list");
  }

  get(id) {
    return http.get(`/image/${id}`);
  }

  create(data) {
    return http.post("/image/", data);
  }

  update(id, data) {
    return http.put(`/image/${id}`, data);
  }

  delete(id) {
    return http.delete(`/image/${id}`);
  }
}

export default new ImageDataService();
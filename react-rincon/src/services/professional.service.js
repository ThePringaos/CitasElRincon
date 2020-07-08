import http from "../http-common";

class ProfessionalDataService {
  getAll() {
    return http.get("/professional/list");
  }

  get(id) {
    return http.get(`/professional/${id}`);
  }

  getWithEmail(correo){
    return http.post('/professional-email', correo);
  }

  create(data) {
    console.log('DATA');
    console.log(data);
    return http.post("/professional/", data, {
      onUploadProgress: progressEvent => {
        console.log("Subida de foto: "+Math.round(progressEvent.loaded*100/progressEvent.total)+"%");
      }
    });
  }

  update(data) {
    return http.put(`/professional/`, data);
  }

  delete(id) {
    return http.delete(`/professional/${id}`);
  }
}

export default new ProfessionalDataService();
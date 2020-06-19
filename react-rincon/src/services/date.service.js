import http from "../http-common";

class DateDataService {
  getAll() {
    return http.get("/date/list");
  }

  get(id) {
    return http.get(`/date/${id}`);
  }

  getConfirmedDatesWithProfessionalId(id){
    return http.post(`/date/get-date-by-professional-id`,id);
  }

  update(data) {
    return http.put(`/date/`, data);
  }

  delete(id) {
    return http.delete(`/date/${id}`);
  }
}

export default new DateDataService();
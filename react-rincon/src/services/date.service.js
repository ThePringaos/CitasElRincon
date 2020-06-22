import http from "../http-common";

class DateDataService {
  getAll() {
    return http.get("/date/list");
  }

  //This is with Date ID
  get(id) {
    return http.get(`/date/${id}`);
  }

  //This is with Professional ID and Day
  getDates(data){
    return http.post(`/date/get-date`,data);
  }

  update(data) {
    return http.put(`/date/`, data);
  }

  delete(id) {
    return http.delete(`/date/${id}`);
  }
}

export default new DateDataService();
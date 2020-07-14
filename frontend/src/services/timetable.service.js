import http from '../http-common';

class TimetableDataService {
  getAll () {
    return http.get('/timetable/list');
  }

  get (id) {
    return http.get(`/timetable/${id}`);
  }

  create (data) {
    return http.post('/timetable/', data);
  }

  update (data) {
    return http.put('/timetable/', data);
  }

  delete (id) {
    return http.delete(`/timetable/${id}`);
  }
}

export default new TimetableDataService();

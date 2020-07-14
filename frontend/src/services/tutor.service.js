import http from '../http-common';

class TutorDataService {
  getAll () {
    return http.get('/tutor/list');
  }

  get (id) {
    return http.get(`/tutor/${id}`);
  }

  create (data) {
    return http.post('/tutor/', data);
  }

  update (data) {
    return http.put('/tutor/', data);
  }

  delete (id) {
    return http.delete(`/tutor/${id}`);
  }
}

export default new TutorDataService();

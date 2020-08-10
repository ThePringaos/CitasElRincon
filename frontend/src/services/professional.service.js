/*
 *  Copyright (C) 2020  Unknown
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import http from '../http-common';

class ProfessionalDataService {
  getAll () {
    return http.get('/professional/list');
  }

  get (id) {
    return http.get(`/professional/${id}`);
  }

  getWithEmail (email) {
    return http.post('/professional-email', email);
  }

  getWithDepartmentId (id) {
    return http.get(`/professional-department/${id}`);
  }

  create (data) {
    return http.post('/professional/', data, {
      onUploadProgress: progressEvent => {
        console.log('Subida de foto: ' + Math.round(progressEvent.loaded * 100 / progressEvent.total) + '%');
      }
    });
  }

  update (data) {
    return http.put('/professional/', data);
  }

  delete (id) {
    return http.delete(`/professional/${id}`);
  }
}

export default new ProfessionalDataService();

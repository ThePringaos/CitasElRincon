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

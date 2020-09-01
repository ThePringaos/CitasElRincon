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

class DateDataService {
  // CREATE
  add (data) {
    return http.post('/date', data);
  }

  getAll () {
    return http.get('/date/list');
  }

  // This is with Date ID
  get (id) {
    return http.get(`/date/${id}`);
  }

  // This is with Professional ID and Day
  getDates (data) {
    return http.post('/date/get-date', data);
  }

  update (data) {
    return http.put('/date/', data);
  }

  delete (id) {
    return http.delete(`/date/${id}`);
  }
}

export default new DateDataService();

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

import ProfessionalService from '../services/professional.service';
import Swal from 'sweetalert2';
class SigninController {
  constructor () {

  }

  responseGoogle (response) {
    return new Promise((resolve, reject) => {
      sessionStorage.userName = response.profileObj.name;
      sessionStorage.userEmail = response.profileObj.email;
      sessionStorage.userUrl = response.profileObj.imageUrl;
      resolve(true);
    });
  }

  async loadUserId (response) {
    const {email} = response.profileObj;
    await ProfessionalService.getWithEmail({email: email})
      .then(res => {
        if (res.data.success) {
          const { id } = res.data.data[0];
          sessionStorage.userId = id;
        } else {
          console.error('Error loading Id');
        }
      })
      .catch(err => {
        console.error('ERROR server' + err);
      });
  }

  showLogInError () {
    if (!sessionStorage.getItem('userEmail')) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error con el inicio de sesión!',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }
}

export default new SigninController();

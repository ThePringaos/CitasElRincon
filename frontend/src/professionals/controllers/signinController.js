/*
 *  Copyright (C) 2020 ThePringaos
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

import ProfessionalService from '../../services/professional.service';
import Swal from 'sweetalert2';
class SigninController {
  responseGoogle (response) {
    return new Promise((resolve, reject) => {
      sessionStorage.userName = response.profileObj.name;
      sessionStorage.userEmail = response.profileObj.email;
      sessionStorage.userUrl = response.profileObj.imageUrl;
      resolve(true);
      console.log('Google info loaded succesfully');
    });
  }

  async loadUserId (response) {
    const { email } = response.profileObj;
    await ProfessionalService.getWithEmail({ email: email })
      .then(res => {
        if (res.data.success) {
          const { id, name } = res.data.data[0];
          sessionStorage.userId = id;
          sessionStorage.userName = name;
          console.log('Professional exists');
        } else {
          console.error('Error loading Id');
          console.log("Professional doesn't exists");
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

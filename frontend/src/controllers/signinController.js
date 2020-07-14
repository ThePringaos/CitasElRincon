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
    await ProfessionalService.getWithEmail({ email: response.profileObj.email })
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

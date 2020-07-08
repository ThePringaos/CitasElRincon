import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import authController from '../controllers/authController';
import Nav from '../components/nav';
import ProfessionalService from '../services/professional.service';

class signinComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: null
    };
  }

  responseGoogle (response) {
    sessionStorage.userName = response.profileObj.name;
    sessionStorage.userEmail = response.profileObj.email;
    sessionStorage.userUrl = response.profileObj.imageUrl;
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div><Nav />
        <div class='container p-4'>
          <div class='row'>
            <div class='col-md-4 mx-auto'>
              <div class='card text-center'>
                <div class='card-header'>
                  <h1>Iniciar Sesión</h1>
                </div>
                <div class='card-body'>
                  {
                    <GoogleLogin
                      clientId='820637070016-genrk31ge28bjg97du1q9bkvsa0p6bdq.apps.googleusercontent.com'
                      buttonText='Iniciar sesion'
                      onSuccess={async (res) => {
                        this.responseGoogle(res);
                        await this.loadUserId(res);
                        authController.login(() => {
                          this.setState({ redirect: '/crear-perfil' });
                        }
                        );
                      }}
                      onFailure={() => console.error('error crack')}
                      cookiePolicy='single_host_origin'
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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

    if (sessionStorage.getItem('userId') == null) {
      this.setState({ redirect: '/crear-perfil' });
    }
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

export default signinComponent;

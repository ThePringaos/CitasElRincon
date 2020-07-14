import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import AuthController from '../controllers/authController';
import SigninController from '../controllers/signinController';
import Nav from '../components/nav';

class signinComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: null
    };
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
                      onSuccess={(res) => {
                        SigninController.responseGoogle(res).then(async (successMessage) => {
                          await SigninController.loadUserId(res);
                          AuthController.login(() => {
                            console.log('Sesion iniciada correctamente');
                            this.setState({ redirect: '/crear-perfil' });
                          }
                          );
                        }).catch((err) => console.error('ERROR WITH SIGN IN'));
                      }}
                      onFailure={() => console.error('error with login')}
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
}

export default signinComponent;

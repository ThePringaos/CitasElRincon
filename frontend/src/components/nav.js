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

import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { GoogleLogout } from 'react-google-login';
import authController from '../controllers/authController';
import { Redirect } from 'react-router-dom';

import ProfessionalService from '../services/professional.service';

class navComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: null,
      email: sessionStorage.getItem('userEmail')
    };
  }

  componentDidMount () {
    // Professional info
    this.queryProfessional();
  }

  async queryProfessional () {
    if (this.state.email == null) return;

    await ProfessionalService.getWithEmail({ email: this.state.email })
      .then(res => {
        if (res.data.success) {
          const { email } = res.data.data[0];
          if (email == this.state.email) {
            sessionStorage.isUserRegistered = true;
          }
        } else {
          sessionStorage.isUserRegistered = false;
        }
      })
      .catch(err => {
        console.error('ERROR server' + err);
      });
  }

  render () {
    if (this.state.redirect != null) {
      const aux = this.state.redirect;
      this.setState({ redirect: null });
      return <Redirect to={aux} />;
    }

    return (
      <nav class='navbar navbar-expand-lg navbar-light' style={{ 'background-color': '#4d88ff' }}>
        <img
          src={require('../images/rincon-icon.png')}
          width='30' height='30' class='d-inline-block align-top rounded-circle z-depth-1-half img-fluid img-thumbnail '
        />
        <a class='navbar-brand mx-2' href='#'>IES EL RINCON</a>
        <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarToggleExternalContent' aria-controls='navbarToggleExternalContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span class='navbar-toggler-icon' />
        </button>
        {this.controlUserSignedIn()}
      </nav>
    );
  }

  controlUserSignedIn () {
    if (authController.isAuthenticated() == 'true' && sessionStorage.getItem('isUserRegistered') == 'true') {
      return (
        <div class='collapse navbar-collapse' id='navbarToggleExternalContent'>
          <ul class='navbar-nav navbar-collapse'>
            <li class='nav-item'>
              <a class='nav-link' href='/definir-horario'>Horario</a>
            </li>
            <li class='nav-item'>
              <a class='nav-link' href='/'>Citas</a>
            </li>
            <li class='nav-item'>
              <a class='nav-link' href='/editar-perfil'>Editar Perfil <span class='sr-only'>(current)</span></a>
            </li>
            <li class='nav-item mr-auto' />
            <a class='nav-link disabled' href='#' tabindex='-1' aria-disabled='true'>{sessionStorage.getItem('userName')}</a>
            <li class='nav-item'>
              <GoogleLogout
                clientId='820637070016-genrk31ge28bjg97du1q9bkvsa0p6bdq.apps.googleusercontent.com'
                render={renderProps => (
                  <a role='button' class='nav-link' onClick={renderProps.onClick}>Salir</a>
                )}
                buttonText='Salir'
                onLogoutSuccess={() => {
                  sessionStorage.isUserRegistered = false;
                  sessionStorage.userEmail = null;
                  sessionStorage.userId = null;
                  sessionStorage.userName = null;
                  sessionStorage.userUrl = null;
                  authController.logout(() => this.setState({ redirect: '/signin' }));
                }}
              />
            </li>
          </ul>
        </div>
      );
    } else {
    }
  }
}

export default navComponent;

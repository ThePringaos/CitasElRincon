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

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import AuthController from '../controllers/authController';
import SigninController from '../controllers/signinController';
import Nav from '../components/nav';

import img from '../../images/fachada-rincon.jpg';

import styled from 'styled-components';

const ContainerSignin = styled.div`
    position: absolute;
    top: 30%;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 100;
`;

const ContainerHome = styled.div`
    height: 100vh;
    width:100%;
    background-image: url(${img});
    background-repeat: no-repeat;
    background-size: cover;
    filter: saturate(135%) contrast(75%) invert(23%);
    -webkit-filter: saturate(135%) contrast(75%) invert(23%);
    z-index: 1;
`;

const ContainerCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: rgba(255,255,255,.7); 
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
`;

const Button = styled.button`
    color: #007bff;
    background-color: transparent;
    background-image: none;
    border-color: #007bff;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,
    background-color .15s ease-in-out,
    border-color .15s ease-in-out,
    box-shadow .15s ease-in-out;
`;

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
        <ContainerHome />
        <ContainerSignin>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-8 col-sm-8 col-md-5 mx-auto'>
                <img className='mb-4' src={require('../../images/rincon-icon.png')} alt='icon' width='72' height='72' style={{ borderRadius: '.2rem' }} />

                <ContainerCard>
                  <div className='card-header'>
                    <h1 className='h3 py-3 my-0 font-weight-normal'>Iniciar sesión</h1>
                  </div>
                  <div className='card-body d-flex justify-content-center'>
                    {
                      <GoogleLogin
                        render={handleRenderProps => (

                          <Button onClick={handleRenderProps.onClick} disabled={handleRenderProps.disabled}>
                            <img className='mr-2' src={require('../../images/iconGoogle.png')} alt='iconGoogle' />
                            <span className='my-auto'>Acceder con Google</span>
                          </Button>
                        )}
                        clientId='820637070016-genrk31ge28bjg97du1q9bkvsa0p6bdq.apps.googleusercontent.com'
                        // clientId='516377320931-dt0rjb2jipavh3q00ou316leltrf4de4.apps.googleusercontent.com'
                        buttonText='Google'
                        onSuccess={(res) => {
                          SigninController.responseGoogle(res).then(async (successMessage) => {
                            await SigninController.loadUserId(res);
                            AuthController.login(() => {
                              this.setState({ redirect: '/crear-perfil' });
                            }
                            );
                          }).catch((err) => console.error('ERROR WITH SIGN IN', err));
                        }}
                        onFailure={() => console.error('error with login')}
                        cookiePolicy='single_host_origin'
                      />
                    }
                  </div>
                </ContainerCard>
              </div>
            </div>
          </div>
        </ContainerSignin>
      </div>
    );
  }
}

export default signinComponent;

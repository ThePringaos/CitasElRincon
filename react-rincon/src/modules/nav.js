import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import { GoogleLogout } from 'react-google-login';
import authController from '../controllers/authController';
import { Redirect } from "react-router-dom";

class navComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    };
  }

  render() {
    console.log("REDIRECT "+JSON.stringify(this.state.redirect));
    if (this.state.redirect!=null) {
      let aux = this.state.redirect;
      this.setState({redirect:null});
      console.log("BARRA NAV, REDIRECTED");
      return <Redirect to={aux} />
    }

    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">IES EL RINCON</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/definir-horario">Horario</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/">Citas</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/editar-perfil">Editar Perfil <span class="sr-only">(current)</span></a>
            </li>
            {this.controlSignOut()}
          </ul>
        </div>
      </nav>
    );
  }

  controlSignOut() {
    if (authController.isAuthenticated()=="true") {
      console.log("AUTH IS TRUE");
      return (
        <ul class="navbar-nav">
          <li class="nav-item active">
            <GoogleLogout
              clientId="820637070016-genrk31ge28bjg97du1q9bkvsa0p6bdq.apps.googleusercontent.com"
              render={renderProps => (
                <a role="button" class="nav-link" onClick={renderProps.onClick}>Salir</a>
              )}
              buttonText="Salir"
              onLogoutSuccess={() => {
                authController.logout(() =>
                  this.setState({ redirect: "/signin" })
                );
              
              }}
            ></GoogleLogout>
          </li>
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">{sessionStorage.getItem("userName")}</a>
        </ul>
      );
    }else{
      console.log("AUTH IS FALSE");
    }
  }
}

export default navComponent;



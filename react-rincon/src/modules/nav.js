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
    if (this.state.redirect) {
      console.log("BARRA NAV, REDIRECTED");
      return <Redirect to={this.state.redirect} />
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
              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/list">Ver Empleados </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/add">Añadir</a>
            </li>
            {this.controlSignOut()}
          </ul>
        </div>
      </nav>
    );
  }

  controlSignOut() {
    if (authController.isAuthenticated()=="true") {
      return (
        <ul class="navbar-nav">
          <li class="nav-item active">
            <GoogleLogout
              clientId="820637070016-genrk31ge28bjg97du1q9bkvsa0p6bdq.apps.googleusercontent.com"
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
    }
  }
}

export default navComponent;



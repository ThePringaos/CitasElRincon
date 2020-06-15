import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";


import Nav from './modules/nav';
import Profile from './modules/profile';
import Sesion from './modules/signin';
import Add from './modules/add';
import {ProtectedRoute} from './modules/protected.route';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Nav />
            <Switch>
              <ProtectedRoute exact path="/crear-perfil" component={Profile}></ProtectedRoute>
              <ProtectedRoute exact path="/add" component={Add}></ProtectedRoute>
              <Route exact path="/signin" component={Sesion}></Route>
              <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;

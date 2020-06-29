import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";


import Nav from './modules/nav';
import CreateProfile from './modules/createProfile';
import EditProfile from './modules/editProfile';
import Signin from './modules/signin';
import CreateTimeTable from './modules/createTimetable';
import ShowDates from './modules/showDates';
import {ProtectedRoute} from './modules/protected.route';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Switch>
              <ProtectedRoute exact path="/crear-perfil" component={CreateProfile}></ProtectedRoute>
              <ProtectedRoute exact path="/editar-perfil" component={EditProfile}></ProtectedRoute>
              <ProtectedRoute exact path="/definir-horario" component={CreateTimeTable}></ProtectedRoute>
              <ProtectedRoute exact path="/" component={ShowDates}></ProtectedRoute>

              <Route exact path="/signin" component={Signin}></Route>
              <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }

  

}

export default App;

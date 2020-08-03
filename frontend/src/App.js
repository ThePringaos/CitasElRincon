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
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

// PROFESSIONALS
import CreateProfile from './professionals/modules/createProfile';
import EditProfile from './professionals/modules/editProfile';
import Signin from './professionals/modules/signin';
import CreateTimeTable from './professionals/modules/createTimetable';
import ShowDates from './professionals/modules/showDates';
import { ProtectedRoute } from './professionals/modules/protected.route';

// USERS
import Home from './users/modules/home';
import TeachersForm from './users/modules/teachersForm';
import SecretaryForm from './users/modules/secretaryForm';
import DefineDate from './users/modules/defineDate';
import ValidateEmail from './users/modules/validateEmail';

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>
            {/* PROFESSIONALS */}
            <ProtectedRoute exact path='/crear-perfil' component={CreateProfile} />
            <ProtectedRoute exact path='/editar-perfil' component={EditProfile} />
            <ProtectedRoute exact path='/definir-horario' component={CreateTimeTable} />
            <ProtectedRoute exact path='/' component={ShowDates} />
            {/* USERS */}
            <Route exact path='/home' component={Home} />
            <Route exact path='/profesorado-form' component={TeachersForm} />
            {/* <Route exact path='/secretaria-form' component={SecretaryForm} />
            <Route exact path='/definir-cita' component={DefineDate} />
            <Route exact path='/validar-correo' component={ValidateEmail} /> */}

            <Route exact path='/signin' component={Signin} />
            <Route path='*' component={() => '404 NOT FOUND'} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

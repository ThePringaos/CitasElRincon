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
import { Redirect } from 'react-router-dom';
import Nav from '../components/nav';

class HomeComponent extends React.Component {
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
              <img class='mb-4' src={require('../../images/rincon-icon.png')} alt='icon' width='72' height='72' />
              <div class='card text-center'>
                <div class='card-header'>
                  <h1 class='h3 py-3 my-0 font-weight-normal'>Iniciar sesión</h1>
                </div>
                <div class='card-body d-flex justify-content-center'>
                  <button type='button' class='btn btn-primary'>Primary</button>
                  <button type='button' class='btn btn-primary'>Primary</button>
                  <button type='button' class='btn btn-primary'>Primary</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;

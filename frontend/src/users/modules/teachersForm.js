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

const ProfileComponent = () => {
  let state = {
    redirect: null,
    allowCreation: false,
    departments: [],
    roles: [],
    tutors: [],
    name: sessionStorage.getItem('userName'),
    departmentId: null,
    roleId: null,
    email: sessionStorage.getItem('userEmail'),
    tutorId: null,
    comment: '',
    image: {}
  };
  return (
    <div className='m-2'>
      <h1 className='h3'>Lista de profesores</h1>
      <div className='container p-4'>
        <div className='row'>
          <div className='col-lg-10 mx-auto'>
            <div className='card'>
              <div className='card-body'>
                <div class='form-group'>
                  <div class='form-row'>
                    <div class='col-lg-6 col-sm-12'>
                      <label>DEPARTAMENTO</label>
                    </div>
                    <div class='col-lg-6 col-sm-12'>
                      <select
                        class='form-control'
                        onChange={(value) => this.setState({ departmentId: value.target.value })}
                      >
                        <option selected disabled>Departamento</option>
                        <option>Prueba</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class='form-group'>
                  <div class='form-row'>
                    <div class='col-lg-6 col-sm-12'>
                      <label>PROFESORADO</label>
                    </div>
                    <div className='col-lg-6 col-sm-12 border p-2 my-auto'>
                      <div class='custom-control custom-radio row'>
                        <input type='radio' class='custom-control-input col-6' id='1' name='defaultExampleRadios' />
                        <label class='custom-control-label col-6' for='1'>Default unchecked</label>
                      </div>
                      <div class='custom-control custom-radio row'>
                        <input type='radio' class='custom-control-input col-6' id='2' name='defaultExampleRadios' />
                        <label class='custom-control-label col-6' for='2'>Default checked</label>
                      </div>
                      <div class='custom-control custom-radio row'>
                        <input type='radio' class='custom-control-input col-6' id='3' name='defaultExampleRadios' />
                        <label class='custom-control-label col-6' for='3'>Default unchecked</label>
                      </div>
                      <div class='custom-control custom-radio row'>
                        <input type='radio' class='custom-control-input col-6' id='4' name='defaultExampleRadios' />
                        <label class='custom-control-label col-6' for='4'>Default checked</label>
                      </div>
                    </div>
                  </div>
                </div>
                <button class='btn btn-primary btn-lg mx-auto' type='submit'>
                  Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;

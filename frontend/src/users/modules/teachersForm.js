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
import Nav from '../components/nav';

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
    <div>
      <div className='container p-4'>
        <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js' />
        <div className='row'>
          <div className='col-lg-9'>
            <div className='card'>
              <div className='card-body'>
                <div class='form-row'>
                  <div class='col-lg-6'>
                    <div class='form-group'>
                      <label>DEPARTAMENTO</label>
                    </div>
                  </div>
                </div>
                <div class='form-row'>
                  <div class='col-lg-6'>
                    <div class='form-group'>
                      <select
                        class='form-control'
                        onChange={(value) => this.setState({ departmentId: value.target.value })}
                      >
                        <option selected disabled>Departamento</option>
                        <option>Prueba</option>
                      </select>
                    </div>
                  </div>

                  <div class='form-row'>
                    <div class='col-lg-12'>
                      <div class='form-group'>
                        <div class='custom-control custom-radio'>
                          <input type='radio' class='custom-control-input' id='1' name='defaultExampleRadios' />
                          <label class='custom-control-label' for='1'>Default unchecked</label>
                        </div>
                        <div class='custom-control custom-radio'>
                          <input type='radio' class='custom-control-input' id='2' name='defaultExampleRadios' />
                          <label class='custom-control-label' for='2'>Default checked</label>
                        </div>
                        <div class='custom-control custom-radio'>
                          <input type='radio' class='custom-control-input' id='3' name='defaultExampleRadios' />
                          <label class='custom-control-label' for='3'>Default unchecked</label>
                        </div>
                        <div class='custom-control custom-radio'>
                          <input type='radio' class='custom-control-input' id='4' name='defaultExampleRadios' />
                          <label class='custom-control-label' for='4'>Default checked</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;

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

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { useForm } from '../../hooks/useForm';

import BtnSubmit from './components/buttons/forms/BtnSubmit';

import ProfessionalService from '../../services/professional.service';
import DepartmentService from '../../services/department.service';

const TeachersForm = () => {
  // const state = {
  //   // redirect: null,
  //   departments: [],
  //   professionals: [],
  //   departmentId: null,
  //   professionalId: null
  // };

  // const departments = async () => await DepartmentService.getAll();

  // console.log(typeof (await departments()).data.data);

  // const { data: eschestupido } = await departments();

  // console.log('data', eschestupido);

  // const [...data] = eschestupido.data;

  // console.log(typeof data);

  // data.map(d => console.log(d.id));

  // console.log('data2 ', data);

  const [formValues, handleInputChange] = useForm({
    department: '',
    teacher: ''
  });

  const { department, teacher } = formValues;

  const handleSubmit = (e) => {
    console.log('ESTOY DENTRO DEL SUBMIT');
    e.preventDefault();
    console.log(department, teacher);
  };

  return (
    <div className='m-2'>
      <h1 className='h3'>Lista de profesores</h1>
      <div className='container p-4'>
        <div className='row'>
          <div className='col-lg-10 mx-auto'>
            <div className='card'>
              <div className='card-body'>
                <form onSubmit={handleSubmit}>
                  <div class='form-group'>
                    <div class='form-row'>
                      <div class='col-lg-6 col-sm-12'>
                        <label>DEPARTAMENTO</label>
                      </div>
                      <div class='col-lg-6 col-sm-12 p-0'>
                        <select
                          class='form-control'
                          name='department'
                          onChange={handleInputChange}
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
                        <div class='form-row'>
                          <div className='col-2' />
                          <div className='col-2'>
                            <input type='radio' id='1' name='teacher' value='1' />
                          </div>
                          <div className='col-6'>
                            <label className='my-0 d-block' for='1'>Default unchecked</label>
                          </div>
                          <div className='col-2' />
                        </div>
                        <div class='form-row'>
                          <div className='col-2' />
                          <div className='col-2'>
                            <input type='radio' id='2' name='teacher' value='2' />
                          </div>
                          <div className='col-6'>
                            <label className='my-0 d-block' for='2'>Default unchecked</label>
                          </div>
                          <div className='col-2' />
                        </div>
                        <div class='form-row'>
                          <div className='col-2' />
                          <div className='col-2'>
                            <input type='radio' id='3' name='teacher' value='3' />
                          </div>
                          <div className='col-6'>
                            <label className='my-0 d-block' for='3'>Default unchecked</label>
                          </div>
                          <div className='col-2' />
                        </div>
                        <div class='form-row'>
                          <div className='col-2' />
                          <div className='col-2'>
                            <input type='radio' id='4' name='teacher' value='4' />
                          </div>
                          <div className='col-6'>
                            <label className='my-0 d-block' for='4'>Default unchecked</label>
                          </div>
                          <div className='col-2' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <BtnSubmit content='Elegir' />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersForm;

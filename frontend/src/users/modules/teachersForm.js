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
  const [formValues, handleInputChange] = useForm({
    department: {},
    teacher: {}
  });

  const { department, teacher } = formValues;

  const [departmentValue, setDepartmentValue] = useState([]);
  const [teacherValue, setTeacherValue] = useState([]);

  const { id: idDepartment } = departmentValue;

  useEffect(() => {
    // Se le llama al cargar la página
    if (departmentValue.length === 0) getDepartmentsFromDB();
  }, [idDepartment]);

  useEffect(() => {
    // Se le llama al cargar la página
    if (department === null) {
      console.log('vacio');
    } else if (department !== 0) {
      console.log('primero');
      getTeachersFromDB(parseInt(department));
    } else {
      console.log('segundoo');
      getAllTeachers();
    }
  }, [teacherValue]);

  const getDepartmentsFromDB = () => {
    new Promise((resolve, reject) => {
      resolve(DepartmentService.getAll());
    }).then((res) => {
      if (res.data.data != null) {
        // llamar inflador
        setDepartmentValue(res.data.data);
      }
    });
  };

  // Se le llama al hacer onClick en algún departamento
  const getTeachersFromDB = (ChosenDepartmentId) => {
    new Promise((resolve, reject) => {
      resolve(ProfessionalService.getWithDepartmentId(ChosenDepartmentId));
    }).then((res) => {
      if (res.data.data != null) {
        if (res.data.data.length > 0) setTeacherValue(res.data.data);
      }
    });
  };

  const getAllTeachers = () => {
    new Promise((resolve, reject) => {
      resolve(ProfessionalService.getAll());
    }).then((res) => {
      if (res.data != null) {
        if (res.data.data != null) {
          const teachers = res.data.data;
          const filteredTeachers = teachers.filter((teacher) => teacher.department !== 1);
          setTeacherValue(filteredTeachers);
        }
      }
    });
  };

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
                        <select class='form-control' name='department' onChange={handleInputChange}>
                          <option selected>Todos</option>
                          {departmentValue.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                          ))}
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
                        {teacherValue.map(t => (
                          <div class='form-row'>
                            <div className='col-2' />
                            <div className='col-2'>
                              <input key={t.id} type='radio' id={t.id} name='teacher' value={t.id} onChange={handleInputChange} />
                            </div>
                            <div className='col-6'>
                              <label className='my-0 d-block' for={t.id}>{t.name}</label>
                            </div>
                            <div className='col-2' />
                          </div>
                        ))}
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

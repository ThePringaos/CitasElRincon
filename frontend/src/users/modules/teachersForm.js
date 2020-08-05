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

  const [departmentValues, setDepartmentValues] = useState([]);
  const [teacherValues, setTeacherValues] = useState([]);

  // const { id: idDepartment } = departmentValues;

  useEffect(() => {
    // Se le llama al cargar la página
    if (departmentValues.length === 0) getDepartmentsFromDB();

    if (Object.keys(department).length === 0) {
      getAllTeachers();
    } else if (department.length > 0) {
      console.log('primero', department);
      getTeachersFromDB(parseInt(department));
    }
  }, [department]);

  /* useEffect(() => {
    // Se le llama al cargar la página
    console.log('valores actuales teacher', teacherValues);
  }, [teacherValues]); */

  const getDepartmentsFromDB = () => {
    new Promise((resolve, reject) => {
      resolve(DepartmentService.getAll());
    }).then((res) => {
      if (res.data.data != null) setDepartmentValues(...departmentValues, res.data.data);
    });
  };

  // Se le llama al hacer onClick en algún departamento
  const getTeachersFromDB = (ChosenDepartmentId) => {
    new Promise((resolve, reject) => {
      resolve(ProfessionalService.getWithDepartmentId(ChosenDepartmentId));
    }).then((res) => {
      if (res.data.data != null) {
        console.log('valores consulta', res.data.data);
        if (res.data.data.length > 0) setTeacherValues(res.data.data);
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
          setTeacherValues(filteredTeachers);
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
    <div className='m-2' style={{ position: 'absolute', top: '15%', left: 0, right: 0, bottom: 0, margin: 'auto' }}>
      <h1 className='h3'>Lista de profesores</h1>
      <div className='container p-4'>
        <div className='row'>
          <div className='col-lg-10 mx-auto'>
            <div className='card'>
              <div className='card-body'>
                <form onSubmit={handleSubmit}>
                  <div className='form-row'>
                    <div className='form-group col d-flex align-items-center'>
                      <div className='col-sm-4 col-lg-6'>
                        <label className='m-0'>DEPARTAMENTO</label>
                      </div>
                      <div className='col-sm-8 col-lg-6 p-0'>
                        <select className='form-control' name='department' onChange={handleInputChange}>
                          <option selected>Todos</option>
                          {departmentValues.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='form-group col d-flex align-items-center'>
                      <div className='col-sm-4 col-lg-6'>
                        <label className='m-0'>PROFESORADO</label>
                      </div>
                      <div className='col-sm-8 col-lg-6 border p-2 my-auto'>
                        {teacherValues.map(t => (
                          <div className='form-row'>
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

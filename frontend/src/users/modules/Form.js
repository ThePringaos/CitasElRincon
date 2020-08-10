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
import styled from 'styled-components';

const ContainerForm = styled.div`
    position: absolute;
    top: 15%;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding: .5rem !important; 
`;

const teachersForm = () => {
    const [formValues, handleInputChange] = useForm({
        department: '0',
        teacher: ''
    });

    const { department, teacher } = formValues;
    const [departmentValues, setDepartmentValues] = useState([]);
    const [teacherValues, setTeacherValues] = useState([]);

    useEffect(() => {
        getDepartmentsFromDB();
        // Se le llama al cargar la página
        const valueDepartment = parseInt(department);
        if (valueDepartment === 0) {  
            getAllTeachers();
        } else if (valueDepartment > 0) {
            getTeachersFromDB(valueDepartment);
        }
    }, [department]);

    // Devuelve todos los departamentos para pintarlos en el select
    const getDepartmentsFromDB = () => {
        new Promise((resolve, reject) => {
            resolve(DepartmentService.getAll());
        }).then((res) => {
            if (res.data.data != null) setDepartmentValues(res.data.data);
        }).catch(err => console.error('Falló la consulta getDepartmentsFromDB ', err));
    };

    // Devuelve todos los profesores que contengan el mismo departmentId que el id de department
    const getTeachersFromDB = (ChosenDepartmentId) => {
        new Promise((resolve, reject) => {
            resolve(ProfessionalService.getWithDepartmentId(ChosenDepartmentId));
        }).then((res) => {
            if (res.data != null) {
                if (res.data.data != null) {
                    if (res.data.data.length > 0) setTeacherValues(res.data.data);
                }
            }
        }).catch(err => console.log('Falló la consulta getTeachersFromDB', err));
    };

    // Devuelve todos los profesores para pintarlos en los radio button
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
        }).catch(err => console.log('Falló la consulta getAllTeachers', err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const valueTeacher = parseInt(teacher);

        // Si no ha elegido ningún profesor retorno sin nada y salgo
        if (teacher.value === undefined) return;
    };

    return (
        <ContainerForm>
            <h1 className='h3'>Lista de profesores</h1>
            <div className='container p-4'>
                <div className='row'>
                    <div className='col-lg-10 mx-auto px-0'>
                        <div className='card'>
                            <div className='card-body'>
                                <form onSubmit={handleSubmit}>
                                    <div className='form-row'>
                                        <div className='form-group col d-lg-flex align-items-center'>
                                            <div className='col-sm-12 col-lg-6'>
                                                <label className='m-0'>DEPARTAMENTO</label>
                                            </div>
                                            <div className='col-sm-12 col-lg-6 p-0'>
                                                <select 
                                                    defaultValue={'0'}
                                                    className='form-control' 
                                                    name='department' 
                                                    onChange={handleInputChange}
                                                >
                                                    <option value='0'>Todos</option>
                                                    {departmentValues.map(d => (
                                                        <option 
                                                            key={d.id} 
                                                            value={d.id}
                                                        >
                                                            {d.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group col d-lg-flex'>
                                            <div className='col-sm-12 col-lg-6'>
                                                <label>PROFESORADO</label>
                                            </div>
                                            <div className='col-sm-12 col-lg-6 border p-2 my-auto'>
                                                {teacherValues.map(t => (
                                                    <div 
                                                        className='form-check p-0 d-flex' 
                                                        key={t.id}
                                                    >
                                                        <div className='col-4'>
                                                            <input 
                                                                type='radio' 
                                                                id={t.id} 
                                                                name='teacher' 
                                                                value={t.id} 
                                                                onChange={handleInputChange} 
                                                            />
                                                        </div>
                                                        <div className='col-8 text-left overflow-auto'>
                                                            <label 
                                                                className='form-check-label' 
                                                                htmlFor={t.id}
                                                            >
                                                                {t.name}
                                                            </label>
                                                        </div>
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
        </ContainerForm>
    );
};

export default teachersForm;
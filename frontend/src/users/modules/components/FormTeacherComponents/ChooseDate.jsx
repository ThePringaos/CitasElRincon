import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Form, Col } from 'react-bootstrap';
import BtnGoBack from '../buttons/forms/BtnGoBack';
import BtnGoOn from '../buttons/forms/BtnGoOn';

import DateService from '../../../../services/date.service';
import TimetableDataService from '../../../../services/timetable.service';
import ProfessionalDataService from '../../../../services/professional.service';


const ChooseDate = ({ values, handleInputChange, nextStep, prevStep }) => {
    const { date, time, dateTypeId, teacher } = values;

    const [timeTable, setTimeTable] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState({});
    const {id, monday, tuesday, wednesday, thursday, friday} = timeTable;


    const [availableDays, setAvailableDays] = useState([]);

    /*useEffect(() => {
        const valores = obtenerDias(horario);

        (availableDays.length === 0 ) && setAvailableDays(valores);

        console.log('availableDays', availableDays);
    }, [availableDays]);*/

    
    const { timeTable: horario } = selectedProfessional;

    let k = 0;

    const obtenerDias = (horario) => {
        let dias = [];
        if(horario != null) {
            if(horario.monday != null) {
                dias.push('Lunes');
            }
            if(horario.tuesday != null) {
                dias.push('Martes');
            }
            if(horario.wednesday != null) {
                dias.push('Miércoles');
            }
            if(horario.thursday != null) {
                dias.push('Jueves');
            }
            if(horario.friday != null) {
                dias.push('Viernes');
            }
        }

        return dias;
    }
    

    const [isUndefined, setIsUndefined] = useState('disabled');
    

    useEffect(() => {
        (date && time && dateTypeId) ? setIsUndefined('') : setIsUndefined('disabled');
    }, [date, time, dateTypeId]);

    useEffect(() => {
        (timeTable.length === 0) && getAllTimetable();
    }, [timeTable]);

    useEffect(() => {

        (Object.keys(selectedProfessional).length === 0) && getTeacherById();
 
    }, [selectedProfessional]);


    // Devuelve todas las Citas para pintar las los días y las horas en los selects
    const getAllTimetable = () => {
        new Promise((resolve, reject) => {
            resolve(TimetableDataService.getAll());
        }).then((res) => {
            (res.data.data !== null) ? setTimeTable(res.data.data) : console.log('No hay Citas');
        }).catch(err => console.log('Falló la consulta getAllTimetable', err));
    };

    const getTeacherById = () => {
        new Promise((resolve, reject) => {
            resolve(ProfessionalDataService.get(teacher));     
        }).then((res) => {
            let teacher = res.data;
            
            if(teacher != null) {
                console.log(teacher);
                if (teacher.data !== null) {
                    console.log(teacher.data);
                    setSelectedProfessional(teacher.data) 
                } else {
                    setSelectedProfessional({}); 
                }
            }
            /*(teacher !== null) && (teacher.data !== null) 
                                    ? setSelectedProfessional(res.data.data) 
                                    : console.log('No hay Citas');*/
        }).catch(err => console.log('Falló la consulta getAllTimetable', err));

    }

    return (
        <>
            <Form.Row>
                <Form.Group className='col d-lg-flex align-items-center'>
                    <Col sm={12} lg={6}>
                        <Form.Label
                            htmlFor='date'
                            className='m-0'
                        >
                            Día
                        </Form.Label>
                    </Col>
                    <Col sm={12} lg={6} className='p-0'>
                    <Form.Control
                            as='select'
                            className='form-control'
                            value={date}
                            name='date'
                            id='date'
                            onChange={handleInputChange}
                        >
                            {  
                                availableDays.map(d => (
                                    
                                    <option
                                        key={k++}
                                        value={k}
                                    >
                                        {d}
                                    </option>
                                ))
                            }
                            
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group className='col d-lg-flex align-items-center'>
                    <Col sm={12} lg={6}>
                        <Form.Label
                            htmlFor='time'
                            className='m-0'
                        >
                            Hora
                        </Form.Label>
                    </Col>
                    <Col sm={12} lg={6} className='p-0'>
                        <Form.Control
                            as='select'
                            className='form-control'
                            value={time}
                            name='time'
                            id='time'
                            onChange={handleInputChange}
                        >
                            {
                                /*timeTable.map(t =>{
                                    console.log(t);
                                })*/
                                /*date
                                ? timeTable.map(t => (
                                    
                                    <option
                                        key={t.id}
                                        value={t.monday}
                                    >
                                        {t.monday}
                                    </option>
                                ))
                                : <option value={''}>Elgige antes el día</option>*/
                            }
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group className='col d-lg-flex align-items-center'>
                    <Col sm={12} lg={6}>
                        <Form.Label
                            htmlFor='dateTypeId'
                            className='m-0'
                        >
                            Atención
                        </Form.Label>
                    </Col>
                    <Col sm={12} lg={6} className='p-0'>
                    <Form.Control
                            as='select'
                            className='form-control'
                            value={dateTypeId}
                            name='dateTypeId'
                            id='dateTypeId'
                            onChange={handleInputChange}
                        >
                            <option value='0'>Todos</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Col className='d-flex justify-content-center mt-2'>
                    <BtnGoBack
                        content='volver'
                        prevStep={prevStep}
                    />

                    <BtnGoOn
                        content='siguiente'
                        nextStep={nextStep}
                        isUndefined={isUndefined}
                    />
                </Col>
            </Form.Row>
        </>
    )
}


export default ChooseDate;
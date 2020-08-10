import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Form, Col } from 'react-bootstrap';
import BtnGoBack from '../buttons/forms/BtnGoBack';
import BtnGoOn from '../buttons/forms/BtnGoOn';
import DatePicker from 'react-datepicker';


const ChooseDate = ({ values, handleInputChange, nextStep, prevStep }) => {
    const { date, time, dateTypeId, teacher } = values;

    const [isUndefined, setIsUndefined] = useState('disabled');

    useEffect(() => {
        (date && time && dateTypeId) ? setIsUndefined('') : setIsUndefined('disabled');
    }, [date, time, dateTypeId]);

    return (
        <>
            <Form.Row>
                <Form.Group className='col d-lg-flex align-items-center'>
                    <Col sm={12} lg={6}>
                        <Form.Label
                            htmlFor='date'
                            className='m-0'
                        >
                            Fecha
                        </Form.Label>
                    </Col>
                    <Col sm={12} lg={6} className='p-0'>
                        <Form.Control
                            type='date'
                            name='date'
                            onChange={handleInputChange}
                            value={date}
                        />
                    </Col>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group className='col d-lg-flex align-items-center'>
                    <Col sm={12} lg={6}>
                        <Form.Label
                            htmlFor='date'
                            className='m-0'
                        >
                            Hora
                        </Form.Label>
                    </Col>
                    <Col sm={12} lg={6} className='p-0'>
                        <Form.Control
                            type='time'
                            name='time'
                            onChange={handleInputChange}
                            value={time}
                        />
                    </Col>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group className='col d-lg-flex align-items-center'>
                    <Col sm={12} lg={6}>
                        <Form.Label
                            htmlFor='date'
                            className='m-0'
                        >
                            Atención
                        </Form.Label>
                    </Col>
                    <Col sm={12} lg={6} className='p-0'>
                        <Form.Control
                            placeholder='DateTypeId'
                            name='dateTypeId'
                            onChange={handleInputChange}
                            value={dateTypeId}
                        />
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
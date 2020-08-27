import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Form, Col } from 'react-bootstrap';
import BtnGoBack from '../buttons/forms/BtnGoBack';
import BtnGoOn from '../buttons/forms/BtnGoOn';
import validator from 'email-validator';

const ConfirmEmail = ({ values, handleInputChange, nextStep, prevStep }) => {
  const { email, confirmEmail } = values;
  const [isUndefined, setIsUndefined] = useState('disabled');

  useEffect(() => {
    if (validator.validate(email.trim())) {
      ((email.trim() && confirmEmail.trim()) && (email.trim() === confirmEmail.trim()))
        ? setIsUndefined('')
        : setIsUndefined('disabled');
    }
  }, [email, confirmEmail]);

  return (
    <>
      <Form.Row>
        <Form.Group className='col d-lg-flex align-items-center'>
          <Col sm={12} lg={6}>
            <Form.Label htmlFor='email' className='m-0'> Email </Form.Label>
          </Col>
          <Col sm={12} lg={6} className='p-0'>
            <Form.Control
              type='email'
              placeholder='email@gmail.com'
              name='email'
              onChange={handleInputChange}
              value={email}
            />
          </Col>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group className='col d-lg-flex align-items-center'>
          <Col sm={12} lg={6}>
            <Form.Label htmlFor='date' className='m-0'> Confirmar Email </Form.Label>
          </Col>
          <Col sm={12} lg={6} className='p-0'>
            <Form.Control
              type='email'
              placeholder='email@gmail.com'
              name='confirmEmail'
              onChange={handleInputChange}
              value={confirmEmail}
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
  );
};

export default ConfirmEmail;

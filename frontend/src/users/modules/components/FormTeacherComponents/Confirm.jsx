import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Form, Col } from 'react-bootstrap';
import BtnGoBack from '../buttons/forms/BtnGoBack';
import BtnSubmit from '../buttons/forms/BtnSubmit';
import DateService from '../../../../services/date.service';
import SendEmailService from '../../../../services/sendEmail.service';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';

const Confirm = ({ prevStep, values }) => {
  const [confirmHasAlreadyBeenPressed, setConfirmHasAlreadyBeenPressed] = useState(false);
  const [redirect, setRedirect] = useState(null);

  const saveDateOnDB = async () => {
    if (confirmHasAlreadyBeenPressed === false) {
      const { department, teacher, email, confirmEmail, date, time, dateTypeId } = values;
      if (department && teacher && email && confirmEmail && date && time && dateTypeId) {
        const myDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        const regexTime = /(2[0-3]|[01]?[0-9]):([0-5]?[0-9])/m;
        const myTime = (regexTime.exec(time))[0];

        const res = await DateService.add({
          professionalId: teacher,
          email,
          date: myDate,
          time: myTime,
          dateTypeId,
          dateStateId: 2 // This means reserved date
        });

        if (res.data.success === true) {
          let result = null;

          SendEmailService.sendEmail({
            email,
            date: myDate,
            time: myTime,
            id: res.data.id
          }).then(async (res) => {
            result = res;
            if (result) {
              if (result.data.success) {
                setConfirmHasAlreadyBeenPressed(true);
                await Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: '¡Cita reservada, confírmela desde su correo!',
                  showConfirmButton: true
                }).then(() => {
                  setRedirect(<Redirect to='/home' />);
                });
              }
            }
          }).catch((err) => { console.error('SENDING EMAIL ERROR', err); });
        } else {
          console.error('ERROR ADDING DATE TO DB');
        }
      }
    }
  };

  return (
    <>
      {redirect}
      <Form.Row>
        <Col className='d-flex justify-content-center mt-2'>
          <BtnGoBack
            content='Volver'
            prevStep={prevStep}
            className='mx-1'
          />
          <BtnSubmit
            content='Confirmar solicitud'
            onClick={saveDateOnDB}
          />
        </Col>
      </Form.Row>
    </>
  );
};

export default Confirm;

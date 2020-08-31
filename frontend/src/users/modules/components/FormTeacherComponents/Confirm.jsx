import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Form, Col } from 'react-bootstrap';
import BtnGoBack from '../buttons/forms/BtnGoBack';
import BtnSubmit from '../buttons/forms/BtnSubmit';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import ConfirmController from '../../../controllers/ConfirmController';

const Confirm = ({ prevStep, values }) => {
  const [confirmHasAlreadyBeenPressed, setConfirmHasAlreadyBeenPressed] = useState(false);
  const [redirect, setRedirect] = useState(null);

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
            onClick={async () => {
              const result = await ConfirmController.saveDateOnDB(confirmHasAlreadyBeenPressed, values);
              if (result != null) {
                if (result.data != null) {
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
              }
            }}
          />
        </Col>
      </Form.Row>
    </>
  );
};

export default Confirm;

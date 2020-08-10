import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Form, Col } from 'react-bootstrap';
import BtnGoBack from '../buttons/forms/BtnGoBack';
import BtnSubmit from '../buttons/forms/BtnSubmit';

const Confirm = ({ prevStep }) => {



    return (
        <>
            <Form.Row>
                <Col className='d-flex justify-content-center mt-2'>
                    <BtnGoBack 
                        content='Volver'
                        prevStep={prevStep}
                        className='mx-1'
                    />
                    <BtnSubmit 
                        content='Comfirmar solicitud'
                    />
                </Col>
            </Form.Row>   
        </>
    )
}

export default Confirm;
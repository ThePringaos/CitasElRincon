import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const BtnGoBack = ({ content, prevStep }) => {

    const goBack = e => {
        e.preventDefault();
        prevStep();
    };

    return (
        <Button
            onClick={goBack}
            variant='primary'
            className='mx-1'
        >
            <FontAwesomeIcon icon={faAngleLeft} className='mr-2 pt-1 fa-lg' />
            {content}
        </Button>
    )
};

export default BtnGoBack;
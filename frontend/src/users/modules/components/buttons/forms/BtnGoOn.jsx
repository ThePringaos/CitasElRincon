import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export const BtnGoOn = ({ nextStep, isUndefined }) => {
  const goOn = e => {
    e.preventDefault();
    !isUndefined && nextStep();
  };

  return (
    <Button
      onClick={goOn}
      variant='primary'
      className={`mx-1 ${isUndefined}`}
    >
      Siguiente
      <FontAwesomeIcon icon={faAngleRight} className='ml-2 pt-1 fa-lg' />
    </Button>
  );
};

export default BtnGoOn;

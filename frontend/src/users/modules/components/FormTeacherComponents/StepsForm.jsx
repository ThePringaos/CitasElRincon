import React from 'react';
import ChooseProfessional from './ChooseProfessional';
import ChooseDate from './ChooseDate';
import ConfirmEmail from './ConfirmEmail';
import Confirm from './Confirm';

const StepsForm = ({ step, handleInputChange, values, nextStep, prevStep }) => {
  switch (step) {
    case 1:
      return (

        <ChooseProfessional
          nextStep={nextStep}
          handleInputChange={handleInputChange}
          values={values}
        />

      );
    case 2:
      return (

        <ChooseDate
          nextStep={nextStep}
          prevStep={prevStep}
          handleInputChange={handleInputChange}
          values={values}
        />

      );
    case 3:
      return (

        <ConfirmEmail
          nextStep={nextStep}
          prevStep={prevStep}
          handleInputChange={handleInputChange}
          values={values}
        />

      );
    case 4:
      return (

        <Confirm
          prevStep={prevStep}
          values={values}
        />

      );
    default:
      (console.log('This is a multi-step form built with React.'));
  }
};

export default StepsForm;

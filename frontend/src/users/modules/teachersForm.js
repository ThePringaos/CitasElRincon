import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import ContainerForm from './components/FormTeacherComponents/ContainerForm';


const TeachersForm = () => {

    const [formFields, handleInputChange] = useForm({
        department: '0',
        teacher: '',
        date: '',
        time: '',
        dateTypeId: '',
        email: '',
        confirmEmail: '',
    });

    const [step, setStep] = useState(1);

    const { department, teacher, date, time, dateTypeId, email, confirmEmail } = formFields;
    const values = { department, teacher, date, time, dateTypeId, email, confirmEmail };

    // Proceed to next step
    const nextStep = () => {
        setStep(step + 1);
    }

    // Go back to prev step
    const prevStep = () => {
        setStep(step - 1);
    }

    return (
        <ContainerForm 
            step={step}
            handleInputChange={handleInputChange}
            values={values}
            nextStep={nextStep}
            prevStep={prevStep}
        />
    )
}


export default TeachersForm;
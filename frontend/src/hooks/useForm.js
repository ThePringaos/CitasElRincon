import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = (e, name) => {
    /**  El datepicker nos pasa el parámetro 'name' por el
     * handleInpuntChange porque al definir el DatePicker no se nos
     * permite establecerlo como atributo.
     * El datepicker pasa al handleInputChange 'e' el valor de la fecha.
     * */
    if (name === 'date') {
      setValues({
        ...values,
        date: e
      });
    } else {
      const { target } = e;
      if (name != null) {
        target.name = name;
      }
      setValues({
        ...values,
        [target.name]: target.value
      });
    }
  };

  /* Version original del hook
  const handleInputChange = ({ target }) => {
    console.log('handleInput', target);

    setValues({
      ...values,
      [target.name]: target.value
    });
  }; */

  return [values, handleInputChange, reset];
};

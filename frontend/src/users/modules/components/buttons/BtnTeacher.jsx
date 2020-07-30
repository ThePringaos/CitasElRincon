import React from 'react';

const BtnProfesorado = ({contenido}) => {

    const handlerRedirect = () => {
        console.log('click');
    }

    return (  
        <button 
            type='button' 
            className='btn btn-primary mb-4'
            onClick={handlerRedirect}
        >{contenido}</button>
    );
}
 
export default BtnProfesorado;

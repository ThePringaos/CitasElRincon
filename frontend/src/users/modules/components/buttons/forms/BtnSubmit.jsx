import React from 'react';

const BtnSubmit = ({ content }) => {
  return (
    <button
      type='submit'
      className='btn btn-primary btn-lg mx-auto'
    >{content}
    </button>
  );
};

export default BtnSubmit;

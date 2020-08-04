import React from 'react';
import { Link } from 'react-router-dom';

const BtnLink = ({ content, destiny, style }) => {
  const myStyle = style === undefined ? '' : style;
  return (
    <Link
      type='button'
      className={`btn btn-primary ${myStyle}`}
      to={destiny}
    >{content}
    </Link>
  );
};

export default BtnLink;

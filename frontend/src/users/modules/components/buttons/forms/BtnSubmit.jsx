import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const BtnSubmit = ({ content }) => { 

    return (
        <Button
            type='submit'
            variant='outline-secondary'
        >
            {content}
            <FontAwesomeIcon icon={faPaperPlane} className='ml-2 pt-0 fa-lg' />
        </Button>
    );
};

export default BtnSubmit;

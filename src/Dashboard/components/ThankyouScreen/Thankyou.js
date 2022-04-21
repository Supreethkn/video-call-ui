import React from 'react';
import { useHistory } from 'react-router-dom';

import './Thankyou.css';

const ThankyouMessage = () => {
  const history = useHistory();

  const goback = () => {
    history.push('/dashboard');
  };

  return (
    <div className='message'>
        <p>Thanks For Calling...</p>
        <div>
      <button className='btn btn-light' onClick={() => history.push('/dashboard')}>Go Back</button>
    </div>
    </div>
   
  );
};

export default ThankyouMessage;

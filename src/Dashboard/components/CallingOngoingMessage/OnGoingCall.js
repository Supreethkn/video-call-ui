import React from 'react';

import './OnGoingCall.css';

const OnGoingCall = () => {
  return (
    <div className='connecting-message' style={{color:'black' }}>
        <p style={{position:'absolute', top:'183px',right:'290px'}}>PLEASE WAIT WE ARE CONNECTING....</p>
    </div>
  );
};

export default OnGoingCall;

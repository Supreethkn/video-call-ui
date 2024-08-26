import React, { useState } from 'react';
import callEndImage from '../../../resources/CallEnd.png'; // Adjust the path if needed
import './GroupCallButton.css';
import CallEndedPopup from './CallEndedPopup';

const GroupCallButton = ({ onClickHandler, label }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleEndCall = () => {
    setShowPopup(true); // Show the popup first

    // Add a console log or alert for debugging
    console.log("Popup raised!");
    
    // Delay the actual end call action by 3 seconds
    setTimeout(() => {
      onClickHandler();
    }, 5000);
  };

  return (
    <div>
      <div onClick={handleEndCall} className='group_call_button'>
        <img src={callEndImage} alt='End Call' className='call_image' />
        <div className='call_text'>{label}</div>
      </div>
      {showPopup && <CallEndedPopup sessionId="78405" duration="00:00:10" />}
    </div>
  );
};

export default GroupCallButton;

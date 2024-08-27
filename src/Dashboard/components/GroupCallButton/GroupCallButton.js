import React, { useState } from 'react';
import callEndImage from '../../../resources/CallEnd.png'; // Adjust the path if needed
import './GroupCallButton.css';
import CallEndedPopup from './CallEndedPopup';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';

const GroupCallButton = ({ onClickHandler, label }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [callDetails, setCallDetails] = useState(null);

  const isActiveGroupCall = webRTCGroupCallHandler.checkActiveGroupCall();
  console.log('inside component', isActiveGroupCall);

  const handleEndCall = () => {
    onClickHandler(); 
    setShowPopup(true); // Show the popup first

    fetch(`${process.env.REACT_APP_SERVER}/getCallDetails?roomId=${isActiveGroupCall}`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          console.error('Response status:', res.status);
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Call details:', data);
        setCallDetails(data); // Store the fetched call details
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });

     
    console.log("Popup raised!");
  };

  return (
    <div>
      <div onClick={handleEndCall} className='group_call_button'>
        <img src={callEndImage} alt='End Call' className='call_image' />
        <div className='call_text'>{label}</div>
      </div>
      {showPopup && callDetails && (
        <CallEndedPopup sessionId={callDetails.id} duration={callDetails.callDuration} />
      )}
    </div>
  );
};

export default GroupCallButton;

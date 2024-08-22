import React, { useEffect, useState } from 'react';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';
import beep from '../../../resources/beep-05.mp3';
import store from '../../../store/store';
import { setLocalCameraEnabled, setLocalMicrophoneEnabled } from '../../../store/actions/callActions';
import LocationIcon from '../../../resources/Location.png';
import VideoIcon from '../../../resources/vedioIconBtn.png';
import MicIcon from '../../../resources/micIconBtn.png';
import AnswerIcon from '../../../resources/answercall.png';
import './GroupCallRoomsList.css';

const GroupCallRoomsListItem = ({ room }) => {
  let audio = new Audio(beep);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  useEffect(() => {
    if (store.getState().call.callState === "CALL_AVAILABLE") {
      audio.play();
    }
  }, []);

  const handleListItemPressed = () => {
    handleMicroPhone();
    handleVideoBtn();
    webRTCGroupCallHandler.joinGroupCall(room.socketId, room.roomId, room.hostName.username, room.hostName.userreason);
  };

  const handleMicroPhone = () => {
    const localStream = store.getState().call.localStream;
    localStream.getAudioTracks()[0].enabled = isAudioEnabled;
    store.dispatch(setLocalMicrophoneEnabled(isAudioEnabled));
  }

  const handleVideoBtn = () => {
    const localStream = store.getState().call.localStream;
    localStream.getVideoTracks()[0].enabled = isVideoEnabled;
    store.dispatch(setLocalCameraEnabled(isVideoEnabled));
  }

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    handleMicroPhone();
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    handleVideoBtn();
  };

  return (
    <>
      {!room.isAns && (
        <div className="incoming-call-container">
          <h2 className="incoming-call-title">Incoming Call</h2>
          <div className="call-details">
            <div className="call-info">
              <div className="icon-with-text">
                <div className="location-icon-wrapper">
                  <img src={LocationIcon} alt="Location Icon" className="location-icon" />
                </div>
                <span className="call-info-item">{room.hostName.username} - {room.hostName.userreason}</span>
              </div>
            </div>
            <div className="call-actions">
              <button
                className="action-button decline-button"
                onClick={toggleAudio}
              >
                <img src={MicIcon} alt="Mic Icon" className="button-icon" />
                {isAudioEnabled ? 'Disable Audio' : 'Enable Audio'}
              </button>
              <button
                className="action-button decline-button"
                onClick={toggleVideo}
              >
                <img src={VideoIcon} alt="Video Icon" className="button-icon" />
                {isVideoEnabled ? 'Disable Video' : 'Enable Video'}
              </button>
              <button
                className="action-button answer-button"
                onClick={handleListItemPressed}
                disabled={store.getState().call.callState === "CALL_IN_PROGRESS"}
              >
                <img src={AnswerIcon} alt="Answer Icon" className="button-icon" />
                Answer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupCallRoomsListItem;

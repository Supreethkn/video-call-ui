import React, { useEffect }  from 'react';
import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdVideoLabel, MdCamera } from 'react-icons/md';
import ConversationButton from './ConversationButton';
import { switchForScreenSharingStream, hangUp } from '../../../utils/webRTC/webRTCHandler';
import store from '../../../store/store';

const styles = {
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    // bottom: '10%',
    // left: '45%'
    bottom: '22%',
    left: '42%'
  },
  icon: {
    width: '25px',
    height: '25px',
    fill: '#e6e5e8'
  }
};

const ConversationButtons = (props) => {
  const {
    localStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    setCameraEnabled,
    setMicrophoneEnabled,
    screenSharingActive,
    groupCall
  } = props;

  useEffect(() => {
    console.log("Conversation btns $$$$$");
    console.log(store.getState().call.localMicrophoneEnabled);
    setMicrophoneEnabled(store.getState().call.localMicrophoneEnabled);
    setCameraEnabled(store.getState().call.localCameraEnabled);
  }, []);

  const handleMicButtonPressed = () => {
    console.log("$$$$$$$$$$ micro phone $$$$$$$$$$$");
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    console.log(localStream);
    console.log(localStream.getAudioTracks()[0]);

    console.log(micEnabled);
    setMicrophoneEnabled(!micEnabled);
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  const handleScreenSharingButtonPressed = () => {
    switchForScreenSharingStream();
  };

  const handleHangUpButtonPressed = () => {
    hangUp();
  };

  return (
    <div style={styles.buttonContainer}>
      <ConversationButton onClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnabled ? <MdMic style={styles.icon} /> : <MdMicOff style={styles.icon} />}
      </ConversationButton>
      {!groupCall && <ConversationButton onClickHandler={handleHangUpButtonPressed}>
        <MdCallEnd style={styles.icon} />
      </ConversationButton>}
      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} />}
      </ConversationButton>
      {!groupCall && <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
        {screenSharingActive ? <MdCamera style={styles.icon} /> : <MdVideoLabel style={styles.icon} />}
      </ConversationButton>}
    </div>
  );
};

export default ConversationButtons;

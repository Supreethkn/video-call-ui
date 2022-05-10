import React , { useEffect , useState}  from 'react';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';
import beep from '../../../resources/beep-05.mp3';
import store from '../../../store/store';
import { callStates, setCallStateStartTime, setLocalCameraEnabled, setLocalMicrophoneEnabled } from '../../../store/actions/callActions';


const GroupCallRoomsListItem = ({ room }) => {
  let audio = new Audio(beep);

  // let [checkBox, setCheckBox] = useState(null);
  let checkBox = true;
  let checkBoxVideo = true;

  const handleCheck = () => {
    checkBox = !checkBox;
  }

  const handleCheckVideo = () => {
    checkBoxVideo = !checkBoxVideo;
  }

  useEffect(() => {
    console.log("write logic to audio");
    if(store.getState().call.callState == "CALL_AVAILABLE"){
      audio.play();
    }
  }, []);

  const handleListItemPressed = () => {
    // this is the place where operator joins the call
    handleMicroPhone();
    handleVideoBtn();
    webRTCGroupCallHandler.joinGroupCall(room.socketId, room.roomId, room.hostName.username, room.hostName.userreason);
  };

  const handleMicroPhone = () => {
    console.log("logic to mute before joining");
    console.log(store.getState().call);
    const localStream = store.getState().call.localStream;
    localStream.getAudioTracks()[0].enabled = checkBox;
    store.dispatch(setLocalMicrophoneEnabled(checkBox));
    console.log(checkBox);
    console.log(localStream.getAudioTracks()[0]);
    console.log(store.getState().call);
  }

  const handleVideoBtn = () => {
    const localStream = store.getState().call.localStream;
    localStream.getVideoTracks()[0].enabled = checkBoxVideo;
    store.dispatch(setLocalCameraEnabled(checkBoxVideo));
  }

  return (
    <>
    { !room.isAns && <div className='mx-4 my-2' >
      <div className='bg-light p-2 m-1 rounded '>
        <span className='d-block font_weight_500 color_theme'>Name: {room.hostName.username}</span>
        <span className='d-block font_weight_500 color_theme'>Reason:  {room.hostName.userreason}</span>
        <button className='d-block btn btn-primary bg_color width_100' onClick={handleListItemPressed}
        disabled = {store.getState().call.callState == "CALL_IN_PROGRESS"}
        >Answer</button>
        <span className='input-group-text'>
          <label htmlFor='multiMediaBtn' className='p-2'>Disable Audio </label>
          <input type="checkbox" name='multiMediaBtn' value={checkBox} onChange={handleCheck}/>
        </span>
        <span className='input-group-text'>
          <label htmlFor='multiMediaBtn' className='p-2'>Disable Video </label>
          <input type="checkbox" name='multiMediaBtn' value={checkBoxVideo} onChange={handleCheckVideo}/>
        </span>
      </div>
    </div> } 
    </>
  );
};

export default GroupCallRoomsListItem;

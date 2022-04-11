import * as wss from '../wssConnection/wssConnection';
import store from '../../store/store';
import { setGroupCallActive, setCallState, callStates, setGroupCallIncomingStreams, clearGroupCallData, setCallStateStartTime } from '../../store/actions/callActions';
import { startRecording } from '../videoRecording/recordingUtils';
import { stopRecording } from '../videoRecording/recordingUtils';

import { pushAuditsData } from '../../utils/Service/Service'
import * as Service from '../../utils/Service/Service';


 
let myPeer;
let myPeerId;
let groupCallRoomId;
let groupCallHost = false;

export const connectWithMyPeer = () => {
  console.log("connect with my peer");
  // myPeer = new window.Peer(undefined, {
  //   path: '/peerjs',
  //   host: '/',
  //   port: '5000'
  // });

  myPeer = new window.Peer(undefined, {
    
  });

  

  myPeer.on('open', (id) => {
    console.log('succesfully connected with peer server');
    myPeerId = id;
  });

  myPeer.on('call', call => {
    call.answer(store.getState().call.localStream);
    call.on('stream', incomingStream => {
      const streams = store.getState().call.groupCallStreams;
      const stream = streams.find(stream => stream.id === incomingStream.id);

      if (!stream) {
        addVideoStream(incomingStream);
      }
    });
  });
};

export const createNewGroupCall = () => {
  console.log("new group created from direct login");
  console.log("issue with peer $$$$$$$$");
  console.log(myPeerId);
  groupCallHost = true;
  wss.registerGroupCall({
    username: store.getState().dashboard.username,
    peerId: myPeerId
  });

  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
}
;

export const joinGroupCall = (hostSocketId, roomId, operatorName, operatorReason) => {
  const localStream = store.getState().call.localStream;
  groupCallRoomId = roomId;

  wss.userWantsToJoinGroupCall({
    peerId: myPeerId,
    hostSocketId,
    roomId,
    localStreamId: localStream.id
  });

  //logic to start the call time
  console.log("joins the calls");
  console.log(store.getState());

  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  // object to save perator details in state
  let operatorDetal = {
    start_date: new Date(),
    name: operatorName,
    reason: operatorReason
  }
  store.dispatch(setCallStateStartTime(operatorDetal));

  console.log(store.getState());

  // logic to record the video once accepted
  let videoName = operatorName+'_'+(operatorDetal.start_date).getDate()+'_'+(operatorDetal.start_date).getHours()+'_'+(operatorDetal.start_date).getMinutes()+'_'+(operatorDetal.start_date).getSeconds();
  console.log("video path name $$$$$$$$$$");
  console.log(videoName);
  startRecording(videoName);

  // logic to remove the notification from all others
  wss.groupCallRemoveNotification({
    roomId: roomId
  });
  
};

export const connectToNewUser = (data) => {
  const localStream = store.getState().call.localStream;

  const call = myPeer.call(data.peerId, localStream);

  call.on('stream', (incomingStream) => {
    const streams = store.getState().call.groupCallStreams;
    const stream = streams.find(stream => stream.id === incomingStream.id);

    if (!stream) {
      addVideoStream(incomingStream);
    }
  
  });
};

export const auditfunction = (groupCallRoomId) => {
   // add auditing as all the details are present here
   console.log("Audits are called $$$$$$$$$");
   console.log(store.getState().call.callStateStartTime.start_date);
   let startDetails = new Date(store.getState().call.callStateStartTime.start_date);
   let videoName = store.getState().call.callStateStartTime.name+'_'+(startDetails).getDate()+'_'+(startDetails).getHours()+'_'+(startDetails).getMinutes()+'_'+(startDetails).getSeconds();
   console.log(new Date(store.getState().call.callStateStartTime.start_date));
   console.log(store.getState());
   const auditObj = {
     callStartTime: store.getState().call.callStateStartTime.start_date,
     operatorName: store.getState().dashboard.username.username,
     callEndTime:  new Date(),
     reason: store.getState().call.callStateStartTime.reason,
     callOrigin: store.getState().call.callStateStartTime.name,
     recording: videoName,
     roomId:groupCallRoomId
   };
  console.log(auditObj);
  Service.pushAuditsData(auditObj);
  // remove the call details
  store.dispatch(setCallStateStartTime(null));
}

//changing this logic to all time host
export const leaveGroupCall = () => {
  // who ever leave the call audit shoud be triggered
  auditfunction(groupCallRoomId);
    // logic to stop recording
  stopRecording();
  if (groupCallHost) {
  console.log("groupCallHost");
    wss.groupCallClosedByHost({
      peerId: myPeerId
    });
  } else {
  console.log("groupCallHost USER");
  console.log(myPeerId);
  console.log(store.getState().call.localStream.id);
  console.log(groupCallRoomId);
    wss.userLeftGroupCall({
      streamId: store.getState().call.localStream.id,
      roomId: groupCallRoomId,
      peerId: myPeerId
    });
  }
  // write logic to re-route
  console.log("logic wrtc $$$$$$$$$$ send details");
  console.log(groupCallRoomId);
  console.log(store.getState().call.localStream.id);
  console.log(store.getState().dashboard);
  // console.log(store.getState().dashboard.groupCallRooms[0].socketId);
  wss.machineReRoute({
    roomId: groupCallRoomId,
    operatorId: store.getState().call.localStream.id,
    machineId: store.getState().dashboard.groupCallRooms[0].socketId,
    machineName: store.getState().dashboard.groupCallRooms[0].hostName.username,
    reason: store.getState().dashboard.groupCallRooms[0].hostName.userreason,
  });
  clearGroupData();
  
};

export const clearGroupData = () => {
  console.log("clearGroupData");
  groupCallRoomId = null;
  groupCallHost = null;
  store.dispatch(clearGroupCallData());
  myPeer.destroy();
  connectWithMyPeer();

  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;
};


export const removeInactiveStream = (data) => {
    console.log('removeInactiveStream user left');
    console.log(data);
  const groupCallStreams = store.getState().call.groupCallStreams.filter(
    stream => stream.id !== data.streamId
  );
  store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

const addVideoStream = (incomingStream) => {
  const groupCallStreams = [
    ...store.getState().call.groupCallStreams,
    incomingStream
  ];

  store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

// if group call is active return roomId if not return false
export const checkActiveGroupCall = () => {
  console.log("check active group call");
  console.log(store.getState().call);
  if (store.getState().call.groupCallActive) {
    return groupCallRoomId;
  } else {
    return false;
  }
}
;

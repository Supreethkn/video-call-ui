import socketClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/dashboardActions';
import * as webRTCHandler from '../webRTC/webRTCHandler';
import * as webRTCGroupCallHandler from '../webRTC/webRTCGroupCallHandler';
import * as common from '../../utils/Service/Common';
import * as Service from '../../utils/Service/Service';
import { userreasonmc } from '../../store/actions/dashboardActions';
// import {startRecording} from '../videoRecording/recordingUtils';
// import { stopRecording } from '../videoRecording/recordingUtils';

import { startRecording1} from '../videoRecording/recordingUtils';
import { stopRecording1 } from '../videoRecording/recordingUtils';

// const SERVER = 'https://web-rtc-backend-test.herokuapp.com';
const SERVER = process.env.REACT_APP_SERVER;
// const Client_SERVER = 'https://web-rtc-frontend-test.herokuapp.com';
const Client_SERVER = process.env.REACT_APP_CLIENT;

const broadcastEventTypes = {
    ACTIVE_USERS: 'ACTIVE_USERS',
    GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
    Remove_CALL_ANS: 'Remove_CALL_ANS',
    Re_Route_Machine: 'Re_Route_Machine'
};

let socket;

export const connectWithWebSocket = () => {
    socket = socketClient(SERVER);

socket.on('connection', () => {
    // common.removeUserSession();
    console.log('succesfully connected with wss server');
    console.log(socket.id);
});

socket.on('broadcast', (data) => {
    handleBroadcastEvents(data);
});

// listeners related with direct call
socket.on('pre-offer', (data) => {
    webRTCHandler.handlePreOffer(data);
});

socket.on('pre-offer-answer', (data) => {
    webRTCHandler.handlePreOfferAnswer(data);
});

socket.on('webRTC-offer', (data) => {
    webRTCHandler.handleOffer(data);
});

socket.on('webRTC-answer', (data) => {
    webRTCHandler.handleAnswer(data);
});

socket.on('webRTC-candidate', (data) => {
    webRTCHandler.handleCandidate(data);
});

socket.on('user-hanged-up', () => {
    webRTCHandler.handleUserHangedUp();
});

socket.on('user-clean-up', (data) => {
    const id = socket.id;
    console.log('current socket id',id);
    console.log('usercleanup',data);
    if(data.id == id){
        // alert('main')
        stopRecording1();
        setTimeout(()=>{
            let path = '/thankyou';
            window.location.href = path;
        },5000)          
    }
    // else if(data.id != id)
    // {
    //     alert('else')
    //     setTimeout(()=>{
    //         let path = '/thankyou';
    //         window.location.href = path;
    //     },5000)  
    // }
});

// listeners related with group calls

socket.on('group-call-join-request', (data) => {
    webRTCGroupCallHandler.connectToNewUser(data);
});

socket.on('start-video', (data) => {
    console.log('start video', data);
    console.log('user side socked id', socket.id);
    const id = socket.id;
    let type = localStorage.getItem('usertype');
    console.log('iiiddd', id);
    const userData = {
        // kiosk: '1',
        socketid: id,
        // status: 'true',
        usertype: type
    }
    console.log(userData);
    Service.fetchPostData('saveuserdata', userData).then(res => {
        console.log('res',res);
      });
    // webRTCGroupCallHandler.connectToNewUser(data);
        let start_date = new Date();

        let username = 'user';
        // let videoName = username + '_' + (start_date).getDate() + '_' + (start_date).getHours() + '_' + (start_date).getMinutes() + '_' + (start_date).getSeconds();
        let videoName = username + '_' + (start_date).getDate() + '_' + (start_date).getHours() + '_' + (start_date).getMinutes()+ '_' + (start_date).getSeconds();
        console.log('videoname', videoName);
        localStorage.setItem('videoname',videoName);
        startRecording1(videoName);
});

socket.on('group-call-user-left', (data) => {
    console.log('back from server user left');
    console.log(data);
    webRTCGroupCallHandler.removeInactiveStream(data);

    // the below function is clear the user on leave group

    webRTCGroupCallHandler.clearGroupData();
});

socket.on('machine-call-user-left', (data) => {
    let activeUser = store.getState().call.groupCallStreams;
    for(let key in activeUser){
      if(activeUser[key].id == data.streamId) {
        webRTCGroupCallHandler.leaveGroupCall();
      }
    }
  });
  
  socket.on('machine-call-user-end', (data) => {
    console.log('data',data);
    let startTime = store.getState().call.callStateStartTime === undefined ? false : true ;
    console.log('ssss',startTime);
    var operatorId ;
    var peers = data.peerId;
    console.log('peers', peers);
    for(var key in peers) {
      if(peers[key].roomId === data.roomId && peers[key].usertype === "OPERATOR" && startTime) {
        operatorId = peers[key].socketId
        console.log('key',peers[key].roomId);
        console.log('room',data.roomId);
      }
    }
    console.log('op',operatorId);
    console.log('soc',socket);
    console.log('soc',socket.id);
    
    if(operatorId === socket.id) {
      webRTCGroupCallHandler.leaveGroupCallEnd();
    }
  });
};  

export const registerNewUser = (username, usertype) => {
    socket.emit('register-new-user', {
        username: username,
        usertype: usertype,
        socketId: socket.id
    });
};

// emitting events to server related with direct call

export const sendPreOffer = (data) => {
    socket.emit('pre-offer', data);
};

export const sendPreOfferAnswer = (data) => {
    socket.emit('pre-offer-answer', data);
};

export const sendWebRTCOffer = (data) => {
    socket.emit('webRTC-offer', data);
};

export const sendWebRTCAnswer = (data) => {
    socket.emit('webRTC-answer', data);
};

export const sendWebRTCCandidate = (data) => {
    socket.emit('webRTC-candidate', data);
};

export const sendUserHangedUp = (data) => {
    socket.emit('user-hanged-up', data);
};

// emitting events related with group calls

export const registerGroupCall = (data) => {
    console.log('register',data);
    socket.emit('group-call-register', data);
};

export const userWantsToJoinGroupCall = (data) => {
    console.log('want to join');
    socket.emit('group-call-join-request', data);

};

export const  startVideoCall = (data) => {
    console.log('user calls', data);
    socket.emit('start-video', data);

};

export const userLeftGroupCall = (data) => {
    console.log("user to server emit");
    console.log(data);
    socket.emit('group-call-user-left', data);
};

export const machineLeftGroupCall = (data) => {
    console.log(" ^^^^^ machine to server emit &&&&&&");
    console.log(data);
    socket.emit('machine-call-user-left', data);
  };

export const machineReRoute = (data) => {
    console.log("wss re-route");
    console.log(data);
    socket.emit('machine-re-route', data);
};

export const groupCallClosedByHost = (data) => {
    console.log("host to server emit");
    console.log(data);
    socket.emit('group-call-closed-by-host', data);
};

export const groupCallRemoveNotification = (data) => {
    console.log("wss function to remove notification host to server emit");
    console.log(data);
    socket.emit('group-call-remove-notification', data);
};

const handleBroadcastEvents = (data) => {
    switch (data.event) {
        case broadcastEventTypes.ACTIVE_USERS:
            const activeUsers = data.activeUsers.filter(activeUser => activeUser.socketId !== socket.id);
            store.dispatch(dashboardActions.setActiveUsers(activeUsers));
            break;
        case broadcastEventTypes.GROUP_CALL_ROOMS:
            const groupCallRooms = data.groupCallRooms.filter(room => room.socketId !== socket.id);
            const activeGroupCallRoomId = webRTCGroupCallHandler.checkActiveGroupCall();
            if (activeGroupCallRoomId) {
                const room = groupCallRooms.find(room => room.roomId === activeGroupCallRoomId);
                if (!room) {
                    webRTCGroupCallHandler.clearGroupData();
                }
            }
            store.dispatch(dashboardActions.setGroupCalls(groupCallRooms));
            break;
        case broadcastEventTypes.Remove_CALL_ANS:
            store.dispatch(dashboardActions.setGroupCalls(data.groupCallRooms));
            break;
        case broadcastEventTypes.Re_Route_Machine:
            if (socket.id === data.data.machineId) {
                console.log("main logic to re-route equals ===========>");
                common.removeUserSession();
                let userReason;
                for (const key in userreasonmc) {
                    if (data.data.reason == userreasonmc[key]) {
                        userReason = key;
                    }
                }
                // let path = Client_SERVER + '/main/' + data.data.machineName + '/' + userReason;
                // window.location.href = path;
                stopRecording1();
                setTimeout(() =>{
                    let path = '/thankyou';
                    window.location.href = path;
                },2000);
            }
            break;
        default:
            break;
    }
};
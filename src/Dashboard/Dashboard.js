import React, { useEffect } from 'react';
import logo from '../resources/logo.png';
import ActiveUsersList from './components/ActiveUsersList/ActiveUsersList';
import * as webRTCHandler from '../utils/webRTC/webRTCHandler';
import * as webRTCGroupHandler from '../utils/webRTC/webRTCGroupCallHandler';
import DirectCall from './components/DirectCall/DirectCall';
import { connect } from 'react-redux';
import DashboardInformation from './components/DashboardInformation/DashboardInformation';
import { callStates } from '../store/actions/callActions';
import GroupCallRoomsList from './components/GroupCallRoomsList/GroupCallRoomsList';
import GroupCall from './components/GroupCall/GroupCall';
import NavbarLocal from '../Navbar/Navbar';
import NavbarMachine from '../Navbar/NavbarMachine';
import AnswerInfo from './components/GroupCallRoomsList/AnswerInfo';
import OnGoingCall from './components/CallingOngoingMessage/OnGoingCall';
import store from '../store/store';
import {  setCallState } from '../store/actions/callActions';
import * as webRTCGroupCallHandler from '../utils/webRTC/webRTCGroupCallHandler';
// import * as wssConnection from '../utils/wssConnection/wssConnection';
import Thankyou from './components/ThankyouScreen/Thankyou';
import { useHistory } from 'react-router-dom';
import $ from 'jquery'

import './Dashboard.css';

const Dashboard = ({ username, callState, groupCallStreams }) => {

  
  const history = useHistory();

  useEffect(() => {
    console.log("Dashboard $$$$$");
    console.log(username);
    webRTCHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer();
  }, []);
  
  const renderConnectionMessage = () => {
    if(username.usertype == "OPERATOR"){
      return
    }
    else if (groupCallStreams.length === 0) {
      return <OnGoingCall />;
    }
  }

  window.onunload = function () {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}

// const groupCall = () => {
//   // console.log('dashboard--------', val);
//   if(store.getState().call.callState == 'CALL_IN_PROGRESS' || store.getState().call.callState == 'CALL_AVAILABLE'){
    
//     return<GroupCall username={username} /> 
    
//   }
//   else if(store.getState().call.callState == 'CALL_DISCONNECT'){
//     console.log('checked');
//     return 

//   }
  
// }




  return (
    // old start
    // <div className='dashboard_container background_main_color'>
    //   <div className='dashboard_left_section'>
    //     <div className='dashboard_content_container'>
    //       <DirectCall />
    //       <GroupCall />
    //       {callState !== callStates.CALL_IN_PROGRESS && username.usertype === "OPERATOR" && <DashboardInformation username={username.username} />}
    //     </div>
    //     <div className='dashboard_rooms_container background_secondary_color'>
    //       <GroupCallRoomsList />
    //     </div>
    //   </div>
    //   <div className='dashboard_right_section background_secondary_color'>
    //     <div className='dashboard_active_users_list'>
    //       {/* {username.usertype === "OPERATOR" && <ActiveUsersList />} */}
    //     </div>
    //     <div className='dashboard_logo_container'>
    //       <img className='dashboard_logo_image' src={logo} />
    //     </div>
    //   </div>
    // </div>
    // old end
  // <div>
  // {username.usertype == 'OPERATOR' && <NavbarLocal /> }
  //   <div className='bg_color_theme'>
  //     <div className='col-12 row height_90'>
  //       {/* // Call Pending */}
  //       <div className='col-4 pt-1 px-0 scroll_group_list'>
  //         {/* <span>Active</span> */}
  //         {/* <GroupCallRoomsList /> */}
  //         {username.usertype === "OPERATOR" && <GroupCallRoomsList />}
  //       </div>
  //       {/* // video section */}
  //       <div className='col-6'>
  //         {/* <span>Video</span> */}
  //         {renderConnectionMessage()}
  //         <DirectCall />
  //         <GroupCall username={username} />
  //       </div>
  //       <div className='col-2 pt-1 px-0'>
  //         {username.usertype === "OPERATOR" && <AnswerInfo />}
          
  //       </div>
  //     </div>
  //   </div>
  //   </div>
  <div>
      {username.usertype == 'OPERATOR' && <NavbarLocal />}
    <div className='bg_color_theme'>
      <div className='row'>
        <div className='col-12' >
      {/* <div><button className='btn btn-primary test' onClick={leaveRoom}>close</button></div> */}

          {renderConnectionMessage()}
          <DirectCall/>
          <GroupCall username={username} />
          {/* {groupCall() } */}
          
        </div>
      </div>
      <div className='scroll_group_list'>
        {/* <span>Active</span> */}
        {/* <GroupCallRoomsList /> */}
        {username.usertype === "OPERATOR" && <GroupCallRoomsList />}
      </div>
      <div className='operator'>
        {username.usertype === "OPERATOR" && <AnswerInfo />}
      </div>
    </div>
    </div>
  );
};

const mapStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard
});

export default connect(mapStateToProps)(Dashboard);

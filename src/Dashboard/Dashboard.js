// import React, { useEffect } from 'react';
// import logo from '../resources/logo.png';
// import ActiveUsersList from './components/ActiveUsersList/ActiveUsersList';
// import * as webRTCHandler from '../utils/webRTC/webRTCHandler';
// import * as webRTCGroupHandler from '../utils/webRTC/webRTCGroupCallHandler';
// import DirectCall from './components/DirectCall/DirectCall';
// import { connect } from 'react-redux';
// import DashboardInformation from './components/DashboardInformation/DashboardInformation';
// import { callStates } from '../store/actions/callActions';
// import GroupCallRoomsList from './components/GroupCallRoomsList/GroupCallRoomsList';
// import GroupCall from './components/GroupCall/GroupCall';
// import NavbarLocal from '../Navbar/Navbar';
// import NavbarMachine from '../Navbar/NavbarMachine';
// import AnswerInfo from './components/GroupCallRoomsList/AnswerInfo';
// import OnGoingCall from './components/CallingOngoingMessage/OnGoingCall';
// import store from '../store/store';
// import {  setCallState } from '../store/actions/callActions';
// import * as webRTCGroupCallHandler from '../utils/webRTC/webRTCGroupCallHandler';
// // import * as wssConnection from '../utils/wssConnection/wssConnection';
// import Thankyou from './components/ThankyouScreen/Thankyou';
// import { useHistory } from 'react-router-dom';
// import $ from 'jquery'

// import './Dashboard.css';

// const Dashboard = ({ username, callState, groupCallStreams }) => {

  
//   const history = useHistory();

//   useEffect(() => {
//     console.log("Dashboard $$$$$");
//     console.log(username);
//     console.log('usertype',username.usertype);
//     localStorage.setItem('usertype',username.usertype )
//     webRTCHandler.getLocalStream();
//     webRTCGroupHandler.connectWithMyPeer();
//   }, []);
  
//   const renderConnectionMessage = () => {
//     if(username.usertype == "OPERATOR"){
//       return
//     }
//     else if (groupCallStreams.length === 0) {
//       return <OnGoingCall />;
//     }
//   }

//   window.onunload = function () {
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem('user');
// }

// // const groupCall = () => {
// //   // console.log('dashboard--------', val);
// //   if(store.getState().call.callState == 'CALL_IN_PROGRESS' || store.getState().call.callState == 'CALL_AVAILABLE'){
    
// //     return<GroupCall username={username} /> 
    
// //   }
// //   else if(store.getState().call.callState == 'CALL_DISCONNECT'){
// //     console.log('checked');
// //     return 

// //   }
  
// // }




//   return (
//     // old start
//     // <div className='dashboard_container background_main_color'>
//     //   <div className='dashboard_left_section'>
//     //     <div className='dashboard_content_container'>
//     //       <DirectCall />
//     //       <GroupCall />
//     //       {callState !== callStates.CALL_IN_PROGRESS && username.usertype === "OPERATOR" && <DashboardInformation username={username.username} />}
//     //     </div>
//     //     <div className='dashboard_rooms_container background_secondary_color'>
//     //       <GroupCallRoomsList />
//     //     </div>
//     //   </div>
//     //   <div className='dashboard_right_section background_secondary_color'>
//     //     <div className='dashboard_active_users_list'>
//     //       {/* {username.usertype === "OPERATOR" && <ActiveUsersList />} */}
//     //     </div>
//     //     <div className='dashboard_logo_container'>
//     //       <img className='dashboard_logo_image' src={logo} />
//     //     </div>
//     //   </div>
//     // </div>
//     // old end
//   // <div>
//   // {username.usertype == 'OPERATOR' && <NavbarLocal /> }
//   //   <div className='bg_color_theme'>
//   //     <div className='col-12 row height_90'>
//   //       {/* // Call Pending */}
//   //       <div className='col-4 pt-1 px-0 scroll_group_list'>
//   //         {/* <span>Active</span> */}
//   //         {/* <GroupCallRoomsList /> */}
//   //         {username.usertype === "OPERATOR" && <GroupCallRoomsList />}
//   //       </div>
//   //       {/* // video section */}
//   //       <div className='col-6'>
//   //         {/* <span>Video</span> */}
//   //         {renderConnectionMessage()}
//   //         <DirectCall />
//   //         <GroupCall username={username} />
//   //       </div>
//   //       <div className='col-2 pt-1 px-0'>
//   //         {username.usertype === "OPERATOR" && <AnswerInfo />}
          
//   //       </div>
//   //     </div>
//   //   </div>
//   //   </div>

  
//   <div>
//       {username.usertype == 'OPERATOR' && <NavbarLocal />}
//     <div className='bg_color_theme'>
//       <div className='row'>
//         <div className='col-12' >
//       {/* <div><button className='btn btn-primary test' onClick={leaveRoom}>close</button></div> */}

//           {renderConnectionMessage()}
//           <DirectCall/>
//           <GroupCall username={username} />
//           {/* {groupCall() } */}
          
//         </div>
//       </div>
//       <div className='scroll_group_list'>
//         {/* <span>Active</span> */}
//         {/* <GroupCallRoomsList /> */}
//         {username.usertype === "OPERATOR" && <GroupCallRoomsList />}
//       </div>
//       <div className='operator'>
//         {username.usertype === "OPERATOR" && <AnswerInfo />}
//       </div>
//     </div>
//     </div>

    
//   );
// };

// const mapStateToProps = ({ call, dashboard }) => ({
//   ...call,
//   ...dashboard
// });

// export default connect(mapStateToProps)(Dashboard);


/////////////////////////////// new dashbord design //////////////////////////////////////
import React, { useEffect } from 'react';
import { BsPeopleFill, BsClockHistory, BsPhoneFill, BsClipboardCheck } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
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
import { setCallState } from '../store/actions/callActions';
import * as webRTCGroupCallHandler from '../utils/webRTC/webRTCGroupCallHandler';
import Thankyou from './components/ThankyouScreen/Thankyou';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import LogoImage from '../resources/GMR_delhi_combine_logo.png'; // Update the path
import './Dashboard.css';

const Dashboard = ({ username, callState, groupCallStreams }) => {
  const history = useHistory();

  useEffect(() => {
    console.log("Dashboard $$$$$");
    console.log(username);
    console.log('usertype', username.usertype);
    localStorage.setItem('usertype', username.usertype);
    webRTCHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer();
  }, []);

  const renderConnectionMessage = () => {
    if (username.usertype == "OPERATOR") {
      return;
    } else if (groupCallStreams.length === 0) {
      return <OnGoingCall />;
    }
  };

  window.onunload = function () {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  };

  return (
    <div>
      <div className="row">
        {/* Navbar Section */}
        <div className="col-md-2">
          {username.usertype === 'OPERATOR' && <NavbarLocal />}
        </div>
        
        {/* Main Content Section */}
        <div className="col-md-10">
        <div className="top-image-container">
              <img src={LogoImage} alt="GMR Delhi Logo" className="logo-image" />
            </div>
          <div className='bg_color_theme'>
            <div className='row'>
              <div className='col-12'>
                {renderConnectionMessage()}
                <DirectCall />
                <GroupCall username={username} />
              </div>
            </div>
            <div className='scroll_group_list'>
              {username.usertype === "OPERATOR" && <GroupCallRoomsList />}
            </div>
            <div className='operator'>
              {username.usertype === "OPERATOR" && <AnswerInfo />}
            </div>
          </div>

          {/* New Dashboard Layout */}
          <div className="dashboard-container">
            {/* Activity Header */}
            <div className="dashboard-header">
              <h2 className="activity-title">Activity</h2>
              <button className="today-button">Today</button>
            </div>

            <div className="dashboard-content row">
              {/* Left Section */}
              <div className="dashboard-left col-md-8">
                {/* Agents Section */}
                <h3 className="section-title">Agents</h3>
                <div className="row agents-status">
                  <div className="col-3">
                    <div className="agent-card available-agents">
                      <BsPeopleFill size={24} className="icon" />
                      <span className="agent-label">Available Agents</span>
                      <span className="agent-count">10</span>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="agent-card on-break">
                      <BsClockHistory size={24} className="icon" />
                      <span className="agent-label">On Break</span>
                      <span className="agent-count">01</span>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="agent-card busy-in-call">
                      <FaPhoneAlt size={24} className="icon" />
                      <span className="agent-label">Busy In-Call</span>
                      <span className="agent-count">03</span>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="agent-card after-call-work">
                      <BsClipboardCheck size={24} className="icon" />
                      <span className="agent-label">After Call Work</span>
                      <span className="agent-count">00</span>
                    </div>
                  </div>
                </div>

                {/* Calls Section */}
                <h3 className="section-title">Calls</h3>
                <div className="row calls-status">
                  <div className="col-3">
                    <div className="calls-card">
                      <span className="calls-label">Calls Waiting</span>
                      <span className="calls-count">0</span>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="calls-card">
                      <span className="calls-label">Calls Received</span>
                      <span className="calls-count">234</span>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="calls-card">
                      <span className="calls-label">Abandoned Calls</span>
                      <span className="calls-count">1</span>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="calls-card">
                      <span className="calls-label">Dropped Calls</span>
                      <span className="calls-count">5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="dashboard-right col-md-4">
                <div className="top-queries mb-4">
                  <h3 className="section-title">Top Queries</h3>
                  <ul>
                    <li>Location-Dining <span className="float-right">150</span></li>
                    <li>Flight Info <span className="float-right">75</span></li>
                    <li>Location - Amenities <span className="float-right">25</span></li>
                  </ul>
                </div>

                <div className="top-kiosk mb-4">
                  <h3 className="section-title">Top Kiosk</h3>
                  <ul>
                    <li>T3-B67 <span className="float-right">89</span></li>
                    <li>T2-C23 <span className="float-right">55</span></li>
                    <li>T3-B78 <span className="float-right">35</span></li>
                  </ul>
                </div>

                <div className="longest-call-duration">
                  <h3 className="section-title">Longest Call Duration</h3>
                  <ul>
                    <li>Session-18903 <span className="float-right">01:00:40</span></li>
                    <li>Session-17834 <span className="float-right">00:34:03</span></li>
                    <li>Session-17834 <span className="float-right">00:21:45</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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

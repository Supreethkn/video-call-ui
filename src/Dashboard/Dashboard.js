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
import React, { useEffect, useState } from 'react';
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
import { useHistory } from 'react-router-dom';
import LogoImage from '../resources/GMR_delhi_combine_logo.png'; // Update the path
import afterCall from '../resources/afterCall.png'; // Update the path
import busyInCall from '../resources/busyInCall.png'; // Update the path
import onBreak from '../resources/onBreak.png'; // Update the path
import availableAgent from '../resources/availableAgent.png'; // Update the path
import './Dashboard.css';

const Dashboard = ({ username, callState, groupCallStreams }) => {
  const history = useHistory();
  const [topKiosks, setTopKiosks] = useState([]);
  const [longestDurations, setLongestDurations] = useState([]);
  const [topQueries, setTopQueries] = useState([]);


  useEffect(() => {
    console.log("Dashboard loaded with user:", username);
    localStorage.setItem('usertype', username.usertype);
    webRTCHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer();
  }, [username]);

  const renderConnectionMessage = () => {
    if (username.usertype !== "OPERATOR" && groupCallStreams.length === 0) {
      return <OnGoingCall />;
    }
  };

  window.onunload = function () {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  };
  const isActiveGroupCall = webRTCGroupCallHandler.checkActiveGroupCall();
  console.log('webRTCGroupCallHandler.checkActiveGroupCall() is active:', isActiveGroupCall);


  useEffect(() => {
    const fetchTopQueries = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/getTopQueries`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched data:', data);

            setTopQueries(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    fetchTopQueries();
}, []);


  useEffect(() => {
    const fetchKiosksAndDurations = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/getTopKiosksAndDurations`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched data:', data);

            setTopKiosks(data.topKiosks);
            setLongestDurations(data.longestDurations);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    fetchKiosksAndDurations();
}, []);

  return (
    <div className="dashboard-container row">

          <div className="bg_color_theme">
            <div className="row">
              <div className="col-12">
                {renderConnectionMessage()}
                <DirectCall />
                <GroupCall username={username} />
              </div>
            </div>
            {/* {isActiveGroupCall && ( */}
          <div className="scroll_group_list">
            {username.usertype === "OPERATOR" && <GroupCallRoomsList />}
          </div>
        {/* )} */}
            <div className="operator">
              {username.usertype === "OPERATOR" && <AnswerInfo />}
            </div>
          </div>

   {/*                                               dash board starts from here   above code is for vedio call                                   */}
      <div className="row">
        {/* Navbar Section */}
        <div className="col-md-2">
          {username.usertype === 'OPERATOR' && <NavbarLocal />}
        </div>
        {/* Main Content Section */}
        <div className="col-md-10" style={{padding:' 0px 30px'}}>
          <div className="top-image-container-dashboard">
            <img src={LogoImage} alt="GMR Delhi Logo" className="logo-image"  />
          </div>
          {/* New Dashboard Layout */}
          <div className="dashboard-content row">
            {/* Left Section */}
            <div className="dashboard-left col-md-7">
              {/* Agents Section */}
              <h2 className="activityTitle" style={{marginBottom:'20px', color:'#29417D'}}>Activity</h2>
              <h3 className="section-title">Agents</h3>
              <div className="row agents-status">
                <div className="col-3" style={{height:'125px'}}>
                  <div className="agent-card available-agents">
                    {/* <BsPeopleFill size={24} className="icon" /> */}
                    <img src={availableAgent} size={24} className="icon"/>
                    <span className="agent-label">Available Agents</span>
                    <span className="agent-count">10</span>
                  </div>
                </div>
                <div className="col-3" style={{height:'125px'}}>
                  <div className="agent-card on-break">
                    {/* <BsClockHistory size={24} className="icon" /> */}
                    <img src={onBreak} size={24} className="icon"/>
                    <span className="agent-label">On Break</span>
                    <span className="agent-count">01</span>
                  </div>
                </div>
                <div className="col-3" style={{height:'125px'}}>
                  <div className="agent-card busy-in-call">
                    {/* <FaPhoneAlt size={24} className="icon" /> */}
                    <img src={busyInCall} size={24} className="icon"/>
                    <span className="agent-label">Busy In-Call</span>
                    <span className="agent-count">03</span>
                  </div>
                </div>
                <div className="col-3" style={{height:'125px'}}>
                  <div className="agent-card after-call-work">
                    {/* <BsClipboardCheck size={24} className="icon" /> */}
                    <img src={afterCall} size={24} className="icon"/>
                    <span className="agent-label">After Call Work</span>
                    <span className="agent-count">00</span>
                  </div>
                </div>
              </div>

              {/* Calls Section */}
              <h3 className="section-title"  style={{marginTop:'15px'}} >Calls</h3>
              <div className="row calls-status">
                <div className="col-3" style={{height:'125px'}}>
                  <div className="calls-card">
                    <span className="calls-label">Calls Waiting</span>
                    <span className="calls-count" style={{color:'#07A44B'}}>0</span>
                  </div>
                </div>
                <div className="col-3" style={{height:'125px'}}>
                  <div className="calls-card">
                    <span className="calls-label">Calls Received</span>
                    <span className="calls-count" style={{color:'#29417D'}}>234</span>
                  </div>
                </div>
                <div className="col-3" style={{height:'125px'}}>
                  <div className="calls-card">
                    <span className="calls-label">Abandoned Calls</span>
                    <span className="calls-count" style={{color:'#FF0000'}}>1</span>
                  </div>
                </div>
                <div className="col-3" style={{height:'125px'}}>
                  <div className="calls-card">
                    <span className="calls-label">Dropped Calls</span>
                    <span className="calls-count" style={{color:'#29417D'}}>5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="dashboard-right col-md-4">
            <div className="top-queries mb-4">
            <h3 className="section-title">Top Queries</h3>
            <ul>
                {topQueries.map((query, index) => (
                    <li key={index}>
                        {query.query} <span className="float-right">{query.id}</span>
                    </li>
                ))}
            </ul>
        </div>

            <div className="top-kiosk mb-4">
                <h3 className="section-title">Top Kiosk</h3>
                <ul>
                    {topKiosks.map((kiosk, index) => (
                        <li key={index}>{kiosk.callOrigin} <span className="float-right">{kiosk.id}</span></li>
                    ))}
                </ul>
            </div>

            <div className="longest-call-duration">
                <h3 className="section-title">Longest Call Duration</h3>
                <ul>
                    {longestDurations.map((duration, index) => (
                        <li key={index}>Session-{duration.id} <span className="float-right">{duration.callDuration}</span></li>
                    ))}
                </ul>
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
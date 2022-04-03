import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import './Navbar.css';
import logo from '../resources/STRATACACHE_logo.png';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'





import * as common from '../utils/Service/Common';
// import { checkActiveGroupCall } from '../utils/webRTC/webRTCGroupCallHandler';
import * as webRTCGroupCallHandler from '../utils/webRTC/webRTCGroupCallHandler';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const NavbarLocal = () => {

  const history = useHistory();

  const userName = common.getUser();

  const  handleonLogout = () => {
    if(webRTCGroupCallHandler.checkActiveGroupCall()) {
      toast.warning("Please disconnect the active call");
    } else {
      common.removeUserSession();
      history.push('/login');
      window.location.reload();
    }
  };

  const navigateMenu = (path) => {
    // check if in a call
    if(webRTCGroupCallHandler.checkActiveGroupCall()) {
      toast.warning("Please disconnect the active call");
    } else {
      history.push(path);
    }
  }


  return (
    <>
    <ToastContainer />
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <img className='login-page_logo_image' src={logo} alt='' onClick={() => history.push('/dashboard')} /> */}
        <a className="navbar-brand px-3 font_weight_500" onClick={() => history.push('/dashboard') }>VIRTUAL ASSISTANCE</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse position-absolute right_0" id="navbarText">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item hand_cursor">
                   { common.getToken().split('?')[1] === 'isAdmin=1' && <a className="nav-link" onClick={ e =>  navigateMenu('/operatorlist') }>
                   <span><FontAwesomeIcon icon={faUser} /> Users</span>
                     </a> }
                   {/* { <a className="nav-link" onClick={() => history.push('/operatorlist') }>Admin</a> } */}
                </li>
                <li className="nav-item hand_cursor">
                   { common.getToken().split('?')[1] === 'isAdmin=1' && <a className="nav-link" onClick={ e =>  navigateMenu('/Auditlist') }>
                   <span><FontAwesomeIcon icon={faFile} /> Audits</span>
                     </a> }
                   {/* { <a className="nav-link" onClick={() => history.push('/Auditlist') }>Audits</a> } */}
                </li>
                <li className="nav-item hand_cursor">
                   { common.getToken().split('?')[1] === 'isAdmin=1' && <a className="nav-link" onClick={ e =>  navigateMenu('/Auditlistinit') }>
                   <span><FontAwesomeIcon icon={faHeadphones} /> Call Report</span>
                     </a> }
                </li>
                <li className="nav-item active">
                    <a className="nav-link font_weight_bold" onClick={handleonLogout}>
                    <span><FontAwesomeIcon icon={faPowerOff} /> Logout</span>
                      <span className="sr-only">({userName})</span></a>
                </li>
            </ul>
        </div>
    </nav>
    </>
  );
};

export default NavbarLocal;

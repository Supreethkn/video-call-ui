import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from '../resources/GMR_delhi_combine_logo.png';
import loginUsericon from '../resources/loginuserIcon.png';
import loginPasswordicon from '../resources/loginpasswordIcon.png';
import UsernameInput from './components/UsernameInput';
import SubmitButton from './components/SubmitButton';
import { useHistory } from 'react-router-dom';
import { setUsername, usertypeop } from '../store/actions/dashboardActions';
import { registerNewUser } from '../utils/wssConnection/wssConnection';
import './LoginPage.css';
import * as Service from '../utils/Service/Service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserSession } from '../utils/Service/Common';

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const LoginPage = ({ saveUsername }) => {
  const [username, setUsername, userPwd] = useState('');

  const history = useHistory();

  const submitMessage = (val) => {
    confirmAlert({
      // title: 'Message',
      message: val,
      buttons: [
        {
          label: 'OK',
        }
      ]
    });
  };

  let passwordEnter='';

  const handleSubmitButtonPressedold = () => {
    const userData = {
      username: username,
      usertype: usertypeop,
      userreason: null
    };
    registerNewUser(username, usertypeop);
    saveUsername(userData);
    history.push('/dashboard');
  };

  const handleForgotButtonPressed = () => {
    history.push('/forgot');
  }
  // new code to session storage
  // const [loading, setLoading] = useState(false);
  // const username = useFormInput('');
  // const password = useFormInput('');
  // const [error, setError] = useState(null);


  const handleSubmitButtonPressed = () => {
    const userData = {
      name: username,
      password: passwordEnter,
    };
    Service.fetchLoginPostData('login',userData).then( 
      (res) => {
      if(res.status >= 400) {
        const json =  res.json()
        .then( data => {
          console.log(data);
          // toast.error(data.result);
          // toast.error("Please Fill Details");
      submitMessage("Please Fill Details");

        } );
      } else {
        // const json =  res.json()
        // .then( data => {
        //   console.log(data);
        // } );
       
        // write logic to enable
        const json =  res.json()
        .then( data => {
          console.log("logic for token");
          setUserSession('XYZtokenHardCoded?isAdmin='+data.details[0].isAdmin, username);
          handleSubmitButtonPressedold();
        } );
      }
    });
  };

  const getPassword = (id) => {
    // console.log("change password");
    passwordEnter = id;
    // console.log(passwordEnter);
  };

  

  return (
    // <div className='login-page_container background_main_color'>
    //   <div className='login-page_login_box background_secondary_color'>
    //     <div className='login-page_logo_container'>
    //       <img className='login-page_logo_image' src={logo} alt='VideoTalker' />
    //     </div>
    //     <div className='login-page_title_container'>
    //       <h2>Get on Board</h2>
    //     </div>
    //     <UsernameInput username={username} setUsername={setUsername} />
    //     <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
    //   </div>
    // </div>
    <div className="align">
    <ToastContainer />
    <div className='col-12 row '>
      
      <div className='col-6 login-page_containers'>
        <img className='login-page_logo_image' src={logo} alt='VideoTalker' />
      </div>
      <div className='col-6 bg_color_login '>
      <div className='bg_color_login'>
  <div>
    <div className='input-wrapper'>
    {/* <img src="C:/xampp2/htdocs/video-call-ui/src/resources/loginuserIcon.png" alt="User Icon" className='input-icon' /> */}
    <div className='input-icon'>
    <img  src={loginUsericon} alt='User Icon' style={{ width: '20px', height: '20px' }} />
    </div>
      <input 
        type='email' 
        placeholder='Enter your email address'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='login-input'
      />
    </div>
    <div className='input-wrapper'>
      {/* <img src="..resources/loginpasswordIcon.png" alt="Password Icon" className='input-icon' /> */}
     <div className='input-icon'>
      <img src={loginPasswordicon} alt='Password Icon' style={{ width: '15px', height: '23px' }}  />
      </div>
      <input 
        type='password' 
        placeholder='Enter your password'
        value={userPwd}
        onChange={(e) => getPassword(e.target.value)}
        className='login-input'
      />
      <span className='toggle-password'></span>
    </div>
    <div className='login-btn'>
    <button 
      className='login-button'
      onClick={handleSubmitButtonPressed}
    >
      LOGIN
    </button>
    </div>
    <button 
      className='forgot-password'
      onClick={handleForgotButtonPressed}
      style={{ display: 'none' }}
    >
      Forgot password?
    </button>
  </div>
</div>

        {/* <div className='d-block'>
          <SubmitButton  handleSubmitButtonPressed={handleSubmitButtonPressed} />
        </div> */}
      </div>
    </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: username => dispatch(setUsername(username))
  };
};



export default connect(null, mapActionsToProps)(LoginPage);

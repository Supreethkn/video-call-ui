import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from '../resources/STRATACACHE_logo.png';
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


const LoginPage = ({ saveUsername }) => {
  const [username, setUsername, userPwd] = useState('');

  const history = useHistory();

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
          toast.error(data.result);
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
    <div>
    <ToastContainer />
    <div className='col-12 row '>
      
      <div className='col-8 login-page_container'>
        <img className='login-page_logo_image' src={logo} alt='VideoTalker' />
      </div>
      <div className='col-4 bg_color_theme login-page_container'>
        <div className='row'>
          <UsernameInput 
          username={username} 
          setUsername={setUsername}
          userPwd={userPwd} 
          getPassword = {getPassword}
          handleSubmitButtonPressed={handleSubmitButtonPressed}
          handleForgotButtonPressed={handleForgotButtonPressed}
          />
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

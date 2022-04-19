import React, { useState, useEffect } from 'react';
import NavbarLocal from '../Navbar/Navbar';
import * as Service from '../utils/Service/Service';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faUserCog } from '@fortawesome/free-solid-svg-icons'










import './Operator.css';
import {
  useParams
} from 'react-router-dom';


const OperatorEdit = () => {
   
  let { userid } = useParams();
  let [operators, setOperator] = useState(null);

  let  [userName, setuserName] = useState(null);
  let  [userEmail, setuserEmail] = useState(null);
  let  [userPwd, setuserPwd] = useState(null);
  let  [userAdmin, setuserAdmin] = useState(null);
  
  let  [isUpdate, setisUpdate] = useState(null);
  let [userConfirmPwd, setuserConfirmPwd] = useState(null);


  useEffect(() => {
   loadData();
    
  }, []);

  const  loadData  = () => {
    userName = "";
    setuserName(userName);
    userEmail = "";
    setuserEmail(userEmail);
    userPwd = "";
    setuserPwd(userPwd);
    userAdmin = "";
    setuserAdmin(userAdmin);
  if(userid) {
    // write logic to update
    Service.fetchData('getAllUsers').then(res => {
      setOperator(res);
      operators = res.filter( result => result.userId == userid );
      operators = operators[0];
      console.log(operators);

      userName = operators.userName;
      setuserName(userName);
      userEmail = operators.emailAddress;
      setuserEmail(userEmail);
      // userPwd = operators.password;
      userPwd = '';
      setuserPwd(userPwd);
      userAdmin = operators.isAdmin;
      // userAdmin = '';
      setuserAdmin(userAdmin);
      setisUpdate(true);
    });
  } else {
    setisUpdate(false);

  }
  };

  const history = useHistory();

  const handleSubmitButtonPressed = () => {
    const opratorData = {
      name: userName,
      email: userEmail,
      password: userPwd,
      isAdmin: userAdmin
    }
    console.log("handle calleddddd");
    if(userName == '' || userEmail == '' || userPwd == '' ||  userAdmin == ''){
      toast.warning("Please Fill Details");
    }else{
    console.log('create data',opratorData);
    Service.fetchPostData('createUser',opratorData).then(res => {
      history.push('/operatorlist');
    });
  }
  };

  const handleDelete = () => {
    console.log("delete done ....");
    const opratorData = {
      name: userName,
    }
    console.log("handle calleddddd");
    console.log(opratorData);
    Service.fetchLoginPostData('deleteUser',opratorData).then(res => {
      if(res.status >= 400) {
        const json =  res.json()
        .then( data => {
          console.log(data);
          toast.error(data.result);
        } );
      } else {
        toast.success("deleted successful");
        history.push('/operatorlist');
      }
    });
  }

  const handleUpdate = () => {
    const opratorData = {
      name: userName,
      email: userEmail,
      password: userPwd,
      isAdmin: userAdmin,
      confirmPassword: userConfirmPwd

    }
    console.log("handle calleddddd");
    if (userName == '' || userEmail == '' || userPwd == '') {
      toast.warning("Please Fill Details");
      console.log(opratorData);
    }
    else if (isChecked == true && userPwd != userConfirmPwd) {
      toast.warning("Password and Confirm Password does not match");
    }
    else {
    console.log(opratorData);
    Service.fetchPostData('updateUser',opratorData).then(res => {
      toast.success("Updated successful");
    });
  }
  }
  
  const [isChecked, setIsChecked] = React.useState(false)
  console.log('cccclllicked', isChecked);
  
    return (
      <div>
        <ToastContainer />
        <NavbarLocal /> 
        <div className='m-2 p-3'>
        <div className='frame_table_border'>
        <div className=' bg_color_theme p-2 d-flex'>
              <div className=''>
                <span className='text-light font_weight_500 font_size_large'>Operators Edit</span>
              </div>
          </div>
      <div className='container width_50'>
        <div className='bg-light p-2 m-1 rounded '>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="form-control" ><FontAwesomeIcon icon={faUser} /></span>
            </div>
             {<input type="text" className="form-control" placeholder="Enter User Name" aria-label="Username" aria-describedby="basic-addon1"
             value={userName} 
             onChange={(event) => { setuserName(event.target.value);}}
              /> }
          </div>
        </div>
        <div className='bg-light p-2 m-1 rounded '>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="form-control"><FontAwesomeIcon icon={faEnvelopeOpen} /></span>
            </div>
             { <input type="text" className="form-control" placeholder="Enter User Email" aria-label="User Email" aria-describedby="basic-addon1"
             value={userEmail} 
             onChange={(event) => { setuserEmail(event.target.value);}}
              /> }
          </div>
        </div>
        
        <div className='bg-light p-2 m-1 rounded '>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
            <span className="form-control"><FontAwesomeIcon icon={faUserCog} /></span>
            </div>
             { <input type="text" className="form-control" placeholder="Select User Admin" aria-label="userAdmin" aria-describedby="basic-addon1"
             value={userAdmin} 
             onChange={(event) => { setuserAdmin(event.target.value);}}
              /> }
          </div>
        </div>
        <div className='bg-light p-2 m-1 rounded '>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
            <span className="form-control"><FontAwesomeIcon icon={faKey} /></span>
            </div>
             { <input type="text" className="form-control" placeholder="Enter User Password" aria-label="User Password" aria-describedby="basic-addon1"
             value={userPwd} 
             onChange={(event) => { setuserPwd(event.target.value);}}
              /> }
          </div>
        </div>
        <div>
              {isUpdate && <input type="checkbox" id="mpCheckbox" className='checkbox' onChange={(e) => setIsChecked(e.target.checked)} />}
              {isUpdate && <label className='change-pwd-title'>Change Password</label>}
            </div>
            {isUpdate && <div className='bg-light p-2 m-1 rounded '>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="form-control"><FontAwesomeIcon icon={faKey} /></span>
                </div>
                {<input type="password" className="form-control" placeholder="Confirm Password" aria-label="User Password" aria-describedby="basic-addon1"
                  value={userConfirmPwd} disabled={!isChecked}
                  onChange={(event) => { setuserConfirmPwd(event.target.value); }}
                />}
              </div>
            </div> }
        <div className='bg-light p-2 m-1 rounded '>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
            </div>
            {isUpdate && <button type="button" className="btn btn-danger p-1 m-1 border_radius_btn " onClick={ handleDelete }>
            <span><FontAwesomeIcon icon={faTrash} /> Delete</span>
              </button>}
            {isUpdate && <button type="button" className="btn btn-success p-1 m-1 border_radius_btn" onClick={ handleUpdate }>
            <span><FontAwesomeIcon icon={faSave} /> Update</span>
            </button>}
            {!isUpdate && <button type="button" className="btn btn-primary p-1 m-1 border_radius_btn" onClick={handleSubmitButtonPressed}>
            <span><FontAwesomeIcon icon={faSave} /> Create Operator</span>
              </button>}
            <button type="button" className="btn btn-secondary p-1 m-1 border_radius_btn"  onClick={() => history.push('/operatorlist') }>
            <span><FontAwesomeIcon icon={faWindowClose} /> Cancel</span>
            </button>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  };
  
  export default OperatorEdit;
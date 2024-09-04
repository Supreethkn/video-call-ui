import React, { useState, useEffect } from 'react';
import NavbarLocal from '../Navbar/Navbar';
import * as Service from '../utils/Service/Service';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImage from '../resources/GMR_delhi_combine_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faUserCog } from '@fortawesome/free-solid-svg-icons'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Swal from 'sweetalert2';
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

  let [firstName, setFirstName] = useState(null);
  let [lastName, setLastName] = useState(null);
  let [contactNumber, setContactNumber] = useState(null);
  let [status, setStatus] = useState(null);

  

  useEffect(() => {
   loadData();
    
  }, []);

const loadData = () => {
  // Reset fields
  userName = "";
  setuserName(userName);
  userEmail = "";
  setuserEmail(userEmail);
  userPwd = "";
  setuserPwd(userPwd);
  userAdmin = "";
  setuserAdmin(userAdmin);
  firstName = "";
  setFirstName(firstName);
  lastName = "";
  setLastName(lastName);
  contactNumber = "";
  setContactNumber(contactNumber);
  status = "";
  setStatus(status);

  if (userid) {
    Service.fetchData('getAllUsers').then(res => {
      setOperator(res);
      operators = res.filter(result => result.userId == userid);
      operators = operators[0];
      console.log(operators);

      userName = operators.userName;
      setuserName(userName);
      userEmail = operators.emailAddress;
      setuserEmail(userEmail);
      userPwd = '';
      setuserPwd(userPwd);
      userAdmin = operators.isAdmin;
      setuserAdmin(userAdmin);
      firstName = operators.firstName;
      setFirstName(firstName);
      lastName = operators.lastName;
      setLastName(lastName);
      contactNumber = operators.contactNumber;
      setContactNumber(contactNumber);
      status = operators.status;
      setStatus(status);
      setisUpdate(true);
    });
  } else {
    setisUpdate(false);
  }
};



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

  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const validateContactNumber = (number) => {
    // Regular expression for contact number validation (example: 10 digits)
    const re = /^[0-9]{10}$/;
    return re.test(number);
  };

  const handleSubmitButtonPressed = () => {
    if (!userName || !userEmail || !userPwd || !userAdmin || !firstName || !lastName || !contactNumber || !status) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields.',
      });
      return;
    }
  
    if (!validateEmail(userEmail)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }
  
    if (!validateContactNumber(contactNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Contact Number',
        text: 'Please enter a valid contact number (10 digits).',
      });
      return;
    }
  
    const opratorData = {
      name: userName,
      email: userEmail,
      password: userPwd,
      isAdmin: userAdmin,
      firstName: firstName,
      lastName: lastName,
      contactNumber: contactNumber,
      status: status
    };
  
    Service.fetchPostData('createUser', opratorData).then(res => {
      if (res.status === 409) {
        Swal.fire({
          icon: 'error',
          title: 'User Exists',
          text: 'User Already Exists',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Created Successfully',
          text: 'User has been created successfully.',
        });
        history.push('/operatorlist');
      }
    });
  };


  const handleDelete = () => {
    console.log("delete done ....");
    const operatorData = {
      name: userName,
    }
    console.log("handle calleddddd");
    console.log(operatorData);
    Service.fetchLoginPostData('deleteUser', operatorData).then(res => {
      console.log("res", res);
      if (res.status === 409) {
        // Use SweetAlert2 for error case
        Swal.fire({
          icon: 'error',
          title: 'Deletion Error',
          text: 'Cannot Delete Admin',
        });
      } else if (res.status >= 400) {
        res.json().then(data => {
          console.log(data);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.result,
          });
        });
      } else {
        // Use SweetAlert2 for success case
        Swal.fire({
          icon: 'success',
          title: 'Deleted Successfully',
          text: 'User has been deleted successfully.',
        }).then(() => {
          history.push('/operatorlist');
        });
      }
    });
  }
  
  const handleUpdate = () => {
    if (userName === '' || userEmail === '' || userPwd === '' || userAdmin === '' || firstName === '' || lastName === '' || contactNumber === '' || status === '') {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields.',
      });
      return;
    }
  
    if (isChecked && userPwd !== userConfirmPwd) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Password and Confirm Password do not match.',
      });
      return;
    }
  
    if (!validateEmail(userEmail)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }
  
    if (!validateContactNumber(contactNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Contact Number',
        text: 'Please enter a valid contact number (10 digits).',
      });
      return;
    }
  
    const operatorData = {
      name: userName,
      email: userEmail,
      password: userPwd,
      isAdmin: userAdmin,
      confirmPassword: userConfirmPwd,
      firstName: firstName,
      lastName: lastName,
      contactNumber: contactNumber,
      status: status
    };
  
    Service.fetchPostData('updateUser', operatorData).then(res => {
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        text: 'User details have been updated successfully.',
      });
      history.push('/operatorlist');
    });
  };
  
  
  const [isChecked, setIsChecked] = React.useState(false)
  console.log('cccclllicked', isChecked);
  
    return (
      <div className="row">
        <div className="col-md-2">
        <ToastContainer />
          <NavbarLocal />
        </div>
        <div className="col-md-10">
          <div>
            <div className="top-image-container" style={{ top: '-25px', left: '-65px' }}>
              <img src={LogoImage} alt="GMR Delhi Logo" className="logo-image" />
            </div>
        <div className='m-2 p-3 bg-clr'>
        <div className='frame_table_border'>
        <div className=' bg_color p-2 d-flex'>
              <div className=''>
                <span className='text-light font_weight_500 font_size_large'>Operators Edit</span>
              </div>
          </div>
      <div className='container width_50  mainContainer' style={{overflowY:'scroll' , height:'350px'}}>
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
             { <input type="email" className="form-control" placeholder="Enter User Email" aria-label="User Email" aria-describedby="basic-addon1"
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
             { <input type="password" className="form-control" placeholder="Enter User Password" aria-label="User Password" aria-describedby="basic-addon1"
             value={userPwd} 
             onChange={(event) => { setuserPwd(event.target.value);}}
              /> }
          </div>
        </div>
        <div className='bg-light p-2 m-1 rounded '>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="form-control"><FontAwesomeIcon icon={faUser} /></span>
              </div>
              <input type="text" className="form-control" placeholder="Enter First Name" 
                value={firstName} 
                onChange={(event) => { setFirstName(event.target.value); }} 
              />
            </div>
          </div>

          <div className='bg-light p-2 m-1 rounded '>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="form-control"><FontAwesomeIcon icon={faUser} /></span>
              </div>
              <input type="text" className="form-control" placeholder="Enter Last Name" 
                value={lastName} 
                onChange={(event) => { setLastName(event.target.value); }} 
              />
            </div>
          </div>

          <div className='bg-light p-2 m-1 rounded '>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="form-control"><FontAwesomeIcon icon={faPhone} /></span>
              </div>
              <input type="text" className="form-control" placeholder="Enter Contact Number" 
                value={contactNumber} 
                onChange={(event) => { setContactNumber(event.target.value); }} 
              />
            </div>
          </div>

          <div className='bg-light p-2 m-1 rounded '>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="form-control"><FontAwesomeIcon icon={faUser} /></span>
              </div>
              <select
                className="form-control"
                value={status}
                onChange={(event) => { setStatus(event.target.value); }}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
      </div>
      </div>
    );
  };
  
  export default OperatorEdit;
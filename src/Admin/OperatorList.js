import React, { useEffect, useState } from 'react';
import * as Service from '../utils/Service/Service';
import { useHistory } from 'react-router-dom';


import './Operator.css';
import { TableList } from './component/TableList'

import NavbarLocal from '../Navbar/Navbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'



const OperatorList = () => {
  

  let [operators, setOperator] = useState(null);
  const history = useHistory();

    useEffect(() => {
        // console.log("get Table list from DB $$$$$");
        Service.fetchData('getAllUsers').then(res => {
          console.log(res);
          setOperator(res);
        });
      }, []);
   
    const changeRouteToEdit = (id) => {
      console.log("change route");
      console.log(id);
      history.push('/operatorEdit'+'/'+id);
    };

    const handlecreatePressed = () => {
      console.log("change route");
      history.push('/operatorEdit'+'/');
    };
  
    return (
      <div>
           <NavbarLocal />
         <div className='m-2 p-3'>
           <div className='frame_table_border'>
           <div className=' bg_color_theme p-2 d-flex'>
              <div className=''>
                <span className='text-light font_weight_500 font_size_large'>Operators List</span>
              </div>
              <div className='px-2'>
              <button type="button" className="btn btn-secondary p-1" onClick={handlecreatePressed}>
              <span><FontAwesomeIcon icon={faPlus} /> Add New Operator</span>
              </button>
              </div>
           </div>
          <div className='bg-light p-0 m-0 rounded table_scroll'>
              <table className='table table-striped table-bordered'>
                <thead  className='thead-dark'>
                  <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email Address</th>
                  </tr>
                </thead>
                <tbody>
                  { operators && operators.map(data => <TableList key={data.userId} operator={data} onClickHandler={changeRouteToEdit}/> ) }
                </tbody>
              </table>
          </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default OperatorList;
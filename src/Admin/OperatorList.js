import React, { useEffect, useState } from 'react';
import * as Service from '../utils/Service/Service';
import { useHistory } from 'react-router-dom';
import './Operator.css';
import NavbarLocal from '../Navbar/Navbar';
import { TableList } from './component/TableList';
import LogoImage from '../resources/GMR_delhi_combine_logo.png'; // Update the path
import AddUserImage from '../resources/add_user.png'; // Update the path for add user image
import SearchImage from '../resources/search.png'; // Update the path for search image
import DownloadImage from '../resources/download.png'; // Update the path for download image

const OperatorList = () => {
  const [operators, setOperator] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  useEffect(() => {
    Service.fetchData('getAllUsers').then(res => {
      setOperator(res);
    });
  }, []);

  const changeRouteToEdit = (id) => {
    history.push('/operatorEdit/' + id);
  };

  const handleCreatePressed = () => {
    history.push('/operatorEdit/');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOperators = operators
    .filter(operator =>
      operator.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.userId.toString().includes(searchTerm)
    );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <NavbarLocal />
        </div>
        <div className="col-md-10">
          <div>
            <div className="top-image-container">
              <img src={LogoImage} alt="GMR Delhi Logo" className="logo-image" />
            </div>
            <div className='m-2 p-3'>
              <div className='d-flex justify-content-between align-items-center mb-2'>
                <div className="add-user-container" onClick={handleCreatePressed}>
                  <img src={AddUserImage} alt="Add User" className="add-user-image" />
                  <span className="add-user-text">Add New Operator</span>
                </div>
                <div className="search-container">
                  <input
                    type="text"
                    className="form-control search-bar"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <img src={SearchImage} alt="Search" className="search-icon" />
                </div>
              </div>
              <div className='frame_table_border'>
                <div className='bg-light p-0 m-0 rounded table_scroll'>
                  <table className='table table-striped'>
                    <thead className='table-header'>
                      <tr>
                        <th scope="col">User ID</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOperators.length > 0 ? (
                        filteredOperators.map(data => (
                          <TableList key={data.userId} operator={data} onClickHandler={changeRouteToEdit} />
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className='d-flex justify-content-between align-items-center mt-2'>
                  {filteredOperators.length > 20 && (
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-end">
                        {/* Implement pagination controls here */}
                        <li className="page-item">
                          <a className="page-link" href="#">1</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">2</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">3</a>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              </div>
              <div className='download-container mt-2'>
                <img src={DownloadImage} alt="Download" className="download-image" />
                <span className="download-text">Click to export .xsl</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorList;

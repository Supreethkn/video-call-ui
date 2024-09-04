import React, { useEffect, useState } from 'react';
import * as Service from '../utils/Service/Service';
import { useHistory } from 'react-router-dom';
import './Operator.css';
import NavbarLocal from '../Navbar/Navbar';
import { TableList } from './component/TableList';
import LogoImage from '../resources/GMR_delhi_combine_logo.png';
import AddUserImage from '../resources/add_user.png';
import SearchImage from '../resources/search.png';
import DownloadImage from '../resources/download.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

const OperatorList = () => {
  const [operators, setOperator] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [sortField, setSortField] = useState('userName');
  const [sortOrder, setSortOrder] = useState('asc');
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
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredOperators = operators.filter(operator =>
    operator.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    operator.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    operator.userId.toString().includes(searchTerm)
  );

  const sortedOperators = filteredOperators.sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOperators = sortedOperators.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOperators.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredOperators);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Operators');
    XLSX.writeFile(wb, 'OperatorsData.xlsx');
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <NavbarLocal />
        </div>
        <div className="col-md-10">
          <div>
            <div className="top-image-container" style={{ top: '-25px', left: '-65px' }}>
              <img src={LogoImage} alt="GMR Delhi Logo" className="logo-image" />
            </div>
            <div className='m-2 p-3'>
              <div className='d-flex justify-content-between align-items-center mb-2'>
                <div className="add-user-container" onClick={handleCreatePressed}>
                  <img src={AddUserImage} alt="Add User" className="add-user-image" />
                  <span className="add-user-text">Add a user</span>
                </div>
                {/* <div className="search-container">
                  <input
                    type="text"
                    className="form-control search-bar"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <img src={SearchImage} alt="Search" className="search-icon" />
                </div> */}
              </div>
              <div className='frame_table_border'>
                <div className='bg-light p-0 m-0 rounded table_scroll'>
                  <table className='table table-striped'>
                    <thead className='table-header'>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">
                          <div onClick={() => handleSort('userName')} className="sortable">
                            User Name
                            {sortField === 'userName' && (
                              <FontAwesomeIcon
                                style={{ marginLeft: '10px' }}
                                icon={sortOrder === 'asc' ? faSortUp : faSortDown}
                              />
                            )}
                          </div>
                        </th>
                        <th scope="col">
                          <div onClick={() => handleSort('firstName')} className="sortable">
                            First Name
                            {sortField === 'firstName' && (
                              <FontAwesomeIcon
                                style={{ marginLeft: '10px' }}
                                icon={sortOrder === 'asc' ? faSortUp : faSortDown}
                              />
                            )}
                          </div>
                        </th>
                        <th scope="col">
                          <div onClick={() => handleSort('lastName')} className="sortable">
                            Last Name
                            {sortField === 'lastName' && (
                              <FontAwesomeIcon
                                style={{ marginLeft: '10px' }}
                                icon={sortOrder === 'asc' ? faSortUp : faSortDown}
                              />
                            )}
                          </div>
                        </th>
                        <th scope="col">
                          <div onClick={() => handleSort('emailAddress')} className="sortable">
                            Email Address
                            {sortField === 'emailAddress' && (
                              <FontAwesomeIcon
                                style={{ marginLeft: '10px' }}
                                icon={sortOrder === 'asc' ? faSortUp : faSortDown}
                              />
                            )}
                          </div>
                        </th>
                        <th scope="col">
                          <div onClick={() => handleSort('contactNumber')} className="sortable">
                            Contact Number
                            {sortField === 'contactNumber' && (
                              <FontAwesomeIcon
                                style={{ marginLeft: '10px' }}
                                icon={sortOrder === 'asc' ? faSortUp : faSortDown}
                              />
                            )}
                          </div>
                        </th>
                        <th scope="col">
                          <div onClick={() => handleSort('status')} className="sortable">
                            Account Status
                            {sortField === 'status' && (
                              <FontAwesomeIcon
                                style={{ marginLeft: '10px' }}
                                icon={sortOrder === 'asc' ? faSortUp : faSortDown}
                              />
                            )}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: '12px' }}>
                      {currentOperators.length > 0 ? (
                        currentOperators.map((data, index) => (
                          <TableList
                            key={data.userId}
                            operator={data}
                            index={index + (currentPage - 1) * itemsPerPage}
                            onClickHandler={changeRouteToEdit}
                          />
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className='d-flex justify-content-end mt-2'>
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        {pageNumbers.map(number => (
                          <li
                            key={number}
                            className={`page-item ${number === currentPage ? 'active' : ''}`}
                            onClick={() => setCurrentPage(number)}
                          >
                            <a className="page-link" href="#!">{number}</a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
              <div className='download-container mt-2'>
                <img
                  src={DownloadImage}
                  alt="Download"
                  className="download-image"
                  onClick={exportToExcel}
                  style={{ cursor: 'pointer' }}
                />
                <span className="download-text" onClick={exportToExcel}>Click to export .xsl</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorList;

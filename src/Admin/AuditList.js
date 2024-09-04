import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import DownloadImage from '../resources/download.png';
import * as XLSX from 'xlsx';
import NavbarLocal from '../Navbar/Navbar';
import LogoImage from '../resources/GMR_delhi_combine_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import './Operator.css';


const AuditList = () => {
  const [auditReports, setAuditReports] = useState([]);
  const [sortField, setSortField] = useState('callStartTime');
  const [sortOrder, setSortOrder] = useState('asc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const fetchAuditReports = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/getAuditReports`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setAuditReports(data); // Set auditReports state
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchAuditReports();
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const formatDuration = (duration) => {
    const match = duration.match(/(\d+) Minute[s]? (\d+) Second[s]?/);
    if (!match) return '00:00:00';

    const [, minutes, seconds] = match;
    const hrs = Math.floor(Number(minutes) / 60);
    const mins = Number(minutes) % 60;
    const secs = Number(seconds);

    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const filterByDate = (data) => {
    if (!startDate && !endDate) return data;
    return data.filter(report => {
      const callDate = new Date(report.callDate);
      if (startDate && endDate) {
        return callDate >= new Date(startDate) && callDate <= new Date(endDate);
      }
      if (startDate) return callDate >= new Date(startDate);
      if (endDate) return callDate <= new Date(endDate);
      return true;
    });
  };

  const filteredReports = filterByDate(auditReports);
  
  const sortedReports = filteredReports.sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = sortedReports.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredReports);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Audit Reports');
    XLSX.writeFile(wb, 'AuditReports.xlsx');
  };

  // Handle row click to navigate to selectedCallLog page
  const handleRowClick = (roomId) => {
    history.push(`/selectedCalllog/${roomId}`);
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
              <div className='d-flex justify-content-between align-items-center mb-2' style={{marginLeft:'10px'}}>
                <div style={{padding:'5px', border:'2px solid #fff' , boxShadow:'0px 0px 5px 0px' , borderRadius:'20px' }}>
                  <label>Period:</label>
                  <input style={{border:'1px solid rgb(196 196 196)' , borderRadius:'5px'}} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  <input style={{border:'1px solid rgb(196 196 196)' , borderRadius:'5px'}} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
              <div className='frame_table_border 'style={{fontSize:'11px'}}>
                <div className='bg-light p-0 m-0 rounded table_scroll' style={{height:'250px'}}>
                  <table className='table table-striped'>
                    <thead className='table-header'>
                      <tr >
                        <th scope="col">No</th>
                        <th scope="col" style={{fontSize:'10px'}}>
                          <div onClick={() => handleSort('agent')} className="sortable">
                            Agent
                            {sortField === 'agent' && (
                              <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
                            )}
                          </div>
                        </th>
                        <th scope="col" style={{fontSize:'10px'}}>
                          <div onClick={() => handleSort('callDate')} className="sortable">
                            Call Date
                            {sortField === 'callDate' && (
                              <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
                            )}
                          </div>
                        </th>
                        <th scope="col" style={{fontSize:'10px'}}>
                          <div onClick={() => handleSort('callStartTime')} className="sortable">
                            Call Start Time
                            {sortField === 'callStartTime' && (
                              <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
                            )}
                          </div>
                        </th>
                        <th scope="col" style={{fontSize:'10px'}}>
                          <div onClick={() => handleSort('duration')} className="sortable">
                            Duration
                            {sortField === 'duration' && (
                              <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
                            )}
                          </div>
                        </th>
                        <th scope="col" style={{fontSize:'10px'}}>
                          <div onClick={() => handleSort('query')} className="sortable">
                            Query
                            {sortField === 'query' && (
                              <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
                            )}
                          </div>
                        </th>
                        <th scope="col" style={{fontSize:'10px'}}>
                          <div onClick={() => handleSort('kiosk')} className="sortable">
                            Kiosk
                            {sortField === 'kiosk' && (
                              <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
                            )}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentReports.length > 0 ? (
                        currentReports.map((report, index) => (
                          <tr style={{cursor:'pointer'}} key={index} onClick={() => handleRowClick(report.roomId)}> 
                            <td>{index + 1}</td>
                            <td>{report.agent}</td>
                            <td>{new Date(report.callDate).toLocaleDateString()}</td>
                            <td>{report.callStartTime.replace('T', ' | ')}</td>
                            <td>{formatDuration(report.duration)}</td>
                            <td style={{maxWidth:'90px'}}>{report.query}</td>
                            <td>{report.kiosk}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7">No reports found</td>
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
              {/* <nav>
                <ul className="pagination">
                  {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(number)}>
                        {number}
                      </button>
                    </li>
                  ))}
                </ul> */}
              {/* </nav> */}
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

export default AuditList;

// import React, { useEffect, useState } from 'react';
// import * as Service from '../utils/Service/Service';
// import './Operator.css';
// import { AuditTableList } from './component/AuditTableList'

// import NavbarLocal from '../Navbar/Navbar';
// import Moment from 'moment';
// import GridTable from '@nadavshaar/react-grid-table';
// import { saveAs } from "file-saver";
// import LogoImage from '../resources/GMR_delhi_combine_logo.png'; // Update the path





// const AuditList = () => {
  

//   let [operators, setOperator] = useState(null);


// const columns = [
//     {
//         id: 1, 
//         field: 'operatorName', 
//         label: 'Operator Name',
//         sortable: false
//     }, 
//     {
//         id: 2, 
//         field: 'callOrigin', 
//         label: 'Call Origin',
//         sortable: false
//     },
//     // {
//     //     id: 3, 
//     //     field: 'last_visited', 
//     //     label: 'Last Visited',
//     //     sort: ({a, b, isAscending}) => {
//     //         let aa = a.split('/').reverse().join(),
//     //         bb = b.split('/').reverse().join();
//     //         return aa < bb ? isAscending ? -1 : 1 : (aa > bb ? isAscending ? 1 : -1 : 0);
//     //     }
//     // },
//     {
//         id: 3, 
//         field: 'reason', 
//         label: 'Reason',
//         sortable: false
//         // getValue: ({value, column}) => value.x + value.y
//     },
//     {
//       id: 4, 
//       field: 'callStartTime', 
//       label: 'Call Start Time',
//       sortable: false
//   },
//   {
//       id: 5, 
//       field: 'callEndTime', 
//       label: 'Call End Time',
//       sortable: false
//   },
//   {
//     id: 6, 
//     field: 'callDuration', 
//     label: 'Call Duration',
//     sortable: false
//   },
//   // {
//   //   id: 7, 
//   //   field: 'recording', 
//   //   label: 'Recording Path',
//   //   sortable: false,
//   //   cellRenderer: ({ tableManager, value, data, column, colIndex, rowIndex }) => (
//   //     <a className='hand_cursor link_blue'
//   //         onClick={e => downloadVideo(data)}
//   //     ><span>{data.recording}</span></a>
//   // ),
//   // },
//   {
//     id: 7, 
//     field: 'recording', 
//     label: 'Operator Recording',
//     sortable: false,
//     cellRenderer: ({ tableManager, value, data, column, colIndex, rowIndex }) => (
//       <a className='hand_cursor link_blue'
//           onClick={e => downloadVideo(data)}
//       ><span>{data.operator_recording	}</span></a>
//   ),
//   },
//   {
//     id: 8, 
//     field: 'recording', 
//     label: 'User Recording',
//     sortable: false,
//     cellRenderer: ({ tableManager, value, data, column, colIndex, rowIndex }) => (
//       <a className='hand_cursor link_blue'
//           onClick={e => downloadVideo1(data)}
//       ><span>{data.user_recording	}</span></a>
//   ),
//   },
// ];

//  const downloadVideo = (data) => {
//   // const a = document.createElement("a");
//   // document.body.appendChild(a);
//   // a.style = "display: none;";
//   // a.href = 'https://webrtc1-test.s3.ap-south-1.amazonaws.com/'+data.recording+'.webm';
//   // a.target='_blank'
//   // a.click();
//   var name = {
//     url : data.operator_recording
//   }
//   // var name1 = {
//   //   url : data.user_recording
//   // }
//   fetch(process.env.REACT_APP_SERVER +'/download', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(name)
//     })
//     .then(response => response.blob())
//     .then((res) => {
//       const resp = new Blob([res], {type: "video/mp4"});
//       saveAs(resp, "operatorvideo.mp4");
//   });
//  }

//  const downloadVideo1 = (data) => {
//   console.log('uuuuu',data.user_recording);
//   var name1 = {
//     url : data.user_recording
//   }
//   fetch(process.env.REACT_APP_SERVER +'/download', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(name1)
//     })
//     .then(response => response.blob())
//     .then((res) => {
//       const resp = new Blob([res], {type: "video/mp4"});
//       saveAs(resp, "uservideo.mp4");
//   });
//  }

//     useEffect(() => {
//         Service.fetchData('getAuditReport').then(res => {
//           //change the date time format
//           console.log(res);
//           const format1 = "YYYY-MM-DD HH:mm:ss"
//           for(const key in res ) {
//             if(res[key].callStartTime){
//               const today = res[key].callStartTime;
              
//               res[key].callStartTime = Moment(res[key].callStartTime).format(format1);
//               res[key].callEndTime = Moment(res[key].callEndTime).format(format1)

//               let hr = res[key].callStartTime.slice(10,13);
//               console.log('hr',hr);

//               let min = res[key].callStartTime.slice(14,16)
//               console.log('min',min);


//               let hr1 = res[key].callEndTime.slice(10,13);
//               console.log('hr',hr1);

//               let min1 = res[key].callEndTime.slice(14,16)
//               console.log('min',min);

//               let incrementHour = '5'
//               let incrementMinute = '30'

//               let totalTime = Number(hr) + Number(incrementHour);
//               let totalTime1 = Number(hr1) + Number(incrementHour);
//               console.log('=========',totalTime);
//               console.log('=========',totalTime1);

//               let totalTime2 = Number(min) + Number(incrementMinute);
//               // let totalTime2 = 65
//               let totalTime3 = Number(min1) + Number(incrementMinute);
//               console.log('+++++++++',totalTime2);
//               console.log('+++++++++',totalTime3);

//               if(totalTime2 >= 60){
//                   console.log('get hr',totalTime);
//                   totalTime = totalTime + 1;
//                   totalTime1 = totalTime1 + 1;

//                   console.log('incre hr',totalTime);

//                   console.log('get min',totalTime2);
//                   totalTime2 = totalTime2 -60;
//                   totalTime3 = totalTime3 -60;
//                   console.log('dec min',totalTime3);

//               }
//               res[key].callStartTime = res[key].callStartTime.slice(0,13)+':'+ totalTime2 + res[key].callStartTime.slice(16,19);
//               res[key].callEndTime = res[key].callEndTime.slice(0,13)+':'+ totalTime3 + res[key].callEndTime.slice(16,19);

//               res[key].callStartTime = res[key].callStartTime.slice(0,11) + totalTime +':'+ res[key].callStartTime.slice(14,19);
//               res[key].callEndTime = res[key].callEndTime.slice(0,11) + totalTime1 +':'+ res[key].callEndTime.slice(14,19)
//               console.log('done',res[key].callStartTime);

//             }
//           }
//           setOperator(res);
//         });
//       }, []);
  
//     return (
//       // <div>
//       //      <NavbarLocal />
//       //      <div className='m-2 p-3'>
//       //      <div className='frame_table_border'>
//       //      <div className=' bg_color_theme p-2 d-flex'>
//       //         <div className=''>
//       //           <span className='text-light font_weight_500 font_size_large'>Audit List</span>
//       //         </div>
//       //      </div>
//       //   <div className='bg-light p-0 m-0 rounded table_scroll'>
//       //       <table className='table table-striped table-bordered'>
//       //         <thead  className='thead-dark'>
//       //           <tr>
//       //             <th scope="col">Operator Name</th>
//       //             <th scope="col">Call Origin</th>
//       //             <th scope="col">Reason</th>
//       //             <th scope="col">Call Start Time</th>
//       //             <th scope="col">Call End Time</th>
//       //             <th scope="col">Call Duration</th>
//       //           </tr>
//       //         </thead>
//       //         <tbody>
//       //           { operators && operators.map(data => <AuditTableList key={data.userId} operator={data}/> ) }
//       //         </tbody>
//       //       </table>
//       //   </div>
//       // </div>
//       // </div>
//       // </div>
//       <>
//      <div className="row">
//         <div className="col-md-2">
//           <NavbarLocal />
//         </div>
//         <div className="col-md-10">
//         <div className="top-image-container" style={{top:'-12px', zIndex:'99', top:'-25px', left:'-65px'}}>
//               <img src={LogoImage} alt="GMR Delhi Logo" className="logo-image" />
//             </div>
//           <div className='m-2 p-3'>
//             <div className='frame_table_border'>
//               <div className='bg_color p-2 d-flex'>
//                 <div className=''>
//                   <span className='text-light font_weight_500 font_size_large'>Audit List</span>
//                 </div>
//               </div>
//               {operators && <GridTable columns={columns} rows={operators} />}
//             </div>
//           </div>
//         </div>
//       </div>
//       </>
//     );
//   };
  
//   export default AuditList;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import NavbarLocal from '../Navbar/Navbar';
import LogoImage from '../resources/GMR_delhi_combine_logo.png'; // Update the path



const AuditList = () => {
  const [auditReports, setAuditReports] = useState([]);
  const [sortField, setSortField] = useState('callStartTime');
  const [sortOrder, setSortOrder] = useState('asc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchAuditReports(startDate, endDate);
  }, [startDate, endDate]);

  const fetchAuditReports = async (startDate, endDate) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/getAuditReports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: startDate,
          endDate: endDate
        }),
      });
  
      // Log the response status and headers
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
  
      const data = await response.json();
  
      // Log the fetched data
      console.log("Fetched data:", data);
  
      setAuditReports(data);
    } catch (error) {
      console.error("Error fetching audit reports: ", error);
    }
  };
  

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedReports = auditReports.sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(auditReports);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Audit Reports');
    XLSX.writeFile(wb, 'AuditReports.xlsx');
  };

  return (
    <div className="row">
      <div className="col-md-2">
        <NavbarLocal />
      </div>
      <div className="col-md-10">
        <div className="top-image-container" style={{ top: '-12px', zIndex: '99', top: '-25px', left: '-65px' }}>
          <img src={LogoImage} alt="GMR Delhi Logo" className="logo-image" />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <label>Period:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className='download-container mt-2'>
            <span className="download-text" onClick={exportToExcel}>Click to export .xsl</span>
          </div>
        </div>

        <div className='frame_table_border'>
          <table className='table table-striped'>
            <thead className='table-header'>
              <tr>
                <th scope="col">No</th>
                <th scope="col">
                  <div onClick={() => handleSort('agent')} className="sortable">
                    Agent
                  </div>
                </th>
                <th scope="col">
                  <div onClick={() => handleSort('callStartTime')} className="sortable">
                    Call Start Time
                  </div>
                </th>
                <th scope="col">
                  <div onClick={() => handleSort('duration')} className="sortable">
                    Duration
                  </div>
                </th>
                <th scope="col">
                  <div onClick={() => handleSort('query')} className="sortable">
                    Query
                  </div>
                </th>
                <th scope="col">
                  <div onClick={() => handleSort('kiosk')} className="sortable">
                    Kiosk
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedReports.length > 0 ? (
                sortedReports.map((report, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{report.agent}</td>
                    <td>{report.callStartTime}</td>
                    <td>{report.duration}</td>
                    <td>{report.query}</td>
                    <td>{report.kiosk}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditList;

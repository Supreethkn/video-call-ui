import React, { useEffect, useState } from 'react';
import * as Service from '../utils/Service/Service';
import './Operator.css';
import { AuditTableList } from './component/AuditTableList'

import NavbarLocal from '../Navbar/Navbar';
import Moment from 'moment';
import GridTable from '@nadavshaar/react-grid-table';




const AuditList = () => {
  

  let [operators, setOperator] = useState(null);


const columns = [
    {
        id: 1, 
        field: 'operatorName', 
        label: 'Operator Name',
        sortable: false
    }, 
    {
        id: 2, 
        field: 'callOrigin', 
        label: 'Call Origin',
        sortable: false
    },
    // {
    //     id: 3, 
    //     field: 'last_visited', 
    //     label: 'Last Visited',
    //     sort: ({a, b, isAscending}) => {
    //         let aa = a.split('/').reverse().join(),
    //         bb = b.split('/').reverse().join();
    //         return aa < bb ? isAscending ? -1 : 1 : (aa > bb ? isAscending ? 1 : -1 : 0);
    //     }
    // },
    {
        id: 3, 
        field: 'reason', 
        label: 'Reason',
        sortable: false
        // getValue: ({value, column}) => value.x + value.y
    },
    {
      id: 4, 
      field: 'callStartTime', 
      label: 'Call Start Time',
      sortable: false
  },
  {
      id: 5, 
      field: 'callEndTime', 
      label: 'Call End Time',
      sortable: false
  },
  {
    id: 6, 
    field: 'callDuration', 
    label: 'Call Duration',
    sortable: false
  },
  {
    id: 7, 
    field: 'recording', 
    label: 'Recording Path',
    sortable: false,
    cellRenderer: ({ tableManager, value, data, column, colIndex, rowIndex }) => (
      <a className='hand_cursor link_blue'
          onClick={e => downloadVideo(data)}
      ><span>{data.recording}</span></a>
  ),
  },
];

 const downloadVideo = (data) => {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none;";
  a.href = 'https://webrtc1-test.s3.ap-south-1.amazonaws.com/'+data.recording+'.webm';
  a.target='_blank'
  a.click();
 }

    useEffect(() => {
        Service.fetchData('getAuditReport').then(res => {
          //change the date time format
          console.log(res);
          const format1 = "YYYY-MM-DD HH:mm:ss"
          for(const key in res ) {
            if(res[key].callStartTime){
              const today = res[key].callStartTime;
              res[key].callStartTime = Moment(res[key].callStartTime).format(format1);
              res[key].callEndTime = Moment(res[key].callEndTime).format(format1)
            }
          }
          setOperator(res);
        });
      }, []);
  
    return (
      // <div>
      //      <NavbarLocal />
      //      <div className='m-2 p-3'>
      //      <div className='frame_table_border'>
      //      <div className=' bg_color_theme p-2 d-flex'>
      //         <div className=''>
      //           <span className='text-light font_weight_500 font_size_large'>Audit List</span>
      //         </div>
      //      </div>
      //   <div className='bg-light p-0 m-0 rounded table_scroll'>
      //       <table className='table table-striped table-bordered'>
      //         <thead  className='thead-dark'>
      //           <tr>
      //             <th scope="col">Operator Name</th>
      //             <th scope="col">Call Origin</th>
      //             <th scope="col">Reason</th>
      //             <th scope="col">Call Start Time</th>
      //             <th scope="col">Call End Time</th>
      //             <th scope="col">Call Duration</th>
      //           </tr>
      //         </thead>
      //         <tbody>
      //           { operators && operators.map(data => <AuditTableList key={data.userId} operator={data}/> ) }
      //         </tbody>
      //       </table>
      //   </div>
      // </div>
      // </div>
      // </div>
      <>
      <NavbarLocal />
      <div className='m-2 p-3'>
            <div className='frame_table_border'>
            <div className=' bg_color_theme p-2 d-flex'>
               <div className=''>
                 <span className='text-light font_weight_500 font_size_large'>Audit List</span>
               </div>
            </div>
     {operators && <GridTable columns={columns} rows={operators} />};
     </div>
     </div>
      </>
    );
  };
  
  export default AuditList;
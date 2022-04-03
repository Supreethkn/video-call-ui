import React, { useEffect }  from 'react';

import * as Service from '../../utils/Service/Service';

export const TableList = ({ onClickHandler, operator }) => {

  // let operators;

  // useEffect(() => {
  //   Service.fetchData('getAllUsers').then(res => {
  //     operators = res;
  //     console.log(operators);
  //   });
  // }, []);


  // const { groupCallRooms } = props;
  // console.log("table $$$$$$$$$");
  // console.log(operators);
  return (
    <tr onClick={() => onClickHandler(operator.userId)}>
      <td>{operator.userId}</td>
      <td>{operator.userName}</td>
      <td>{operator.emailAddress}</td>
    </tr>
  );
};


export default TableList;

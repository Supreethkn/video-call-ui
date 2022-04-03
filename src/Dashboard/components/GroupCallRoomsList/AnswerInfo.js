import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import store from '../../../store/store';
import './GroupCallRoomsList.css';

const AnswerInfo = (props) => {
  const { groupCallRooms } = props;

  useEffect(() => {
    console.log("Answered Info $$$$$$$");
    console.log(groupCallRooms);
    console.log(store.getState());
  }, []);

  return (
    <>
    { store.getState() && store.getState().call.callStateStartTime &&
     <div className='mx-4 my-2 ' >
        <div className='bg-light p-2 m-1 rounded answerInfo_placement'>
            <span className='d-block font_weight_500 '>Answered Call Details Below </span>
            <span className='d-block font_weight_500 color_theme'>Name: {store.getState().call.callStateStartTime.name} </span>
            <span className='d-block font_weight_500 color_theme'>Reason: {store.getState().call.callStateStartTime.reason} </span>
        </div>
    </div>}
    </>
  );
};

const mapStoreStateToProps = ({ dashboard }) => (
  {
    ...dashboard
  }
);

export default connect(mapStoreStateToProps)(AnswerInfo);

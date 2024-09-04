import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LogoImage from '../resources/GMR_delhi_combine_logo.png';
import BackButtonImage from '../resources/back_button_image.png';
import 'rc-tree/assets/index.css';
import './Operator.css';
import NavbarLocal from '../Navbar/Navbar';

const fontStyle = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: '27px'
};

const fieldLabelStyle = {
  color: '#29417D',
  marginRight: '15px',
  fontWeight: 'bold',
  fontSize: '18px',
  whiteSpace: 'nowrap',
  minWidth: '150px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontFamily: 'Poppins, sans-serif',
  border: 'none',
  fontSize: '16px',
  backgroundColor: '#F7F7F7',
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  padding: '30px 15px 15px',
};

const titleStyle = {
  fontWeight: '800',
  textTransform: 'uppercase',
  color: '#29417D',
  margin: '0px 0px 0px 0px',
  textDecoration: 'underline',
  textDecorationColor: '#29417D',
  textDecorationThickness: '2px',
};

const idStyle = {
  fontWeight: '800',
  color: 'orange',
  textDecoration: 'underline',
  textDecorationColor: '#FAA519',
  textDecorationThickness: '2px',
};

const pillStyle = {
  display: 'inline-block',
  backgroundColor: '#e0e0e0',
  padding: '5px 10px',
  borderRadius: '20px',
  margin: '5px',
  fontSize: '14px',
  fontWeight: '500',
};

function Field({ fieldName, fieldValue }) {
  return (
    <div style={{ flex: '1 0 50%', padding: '8px', display: 'flex', alignItems: 'center' }}>
      <label style={fieldLabelStyle}>{fieldName}</label>
      {fieldName === 'Notes' ? (
        <textarea
          value={fieldValue}
          style={{ ...inputStyle, height: '150px', resize: 'none' }}
          readOnly
        />
      ) : fieldName === 'Query' ? (
        <div style={inputStyle}>
          {fieldValue.split(',').map((item, index) => (
            <span key={index} style={pillStyle}>{item.trim()}</span>
          ))}
        </div>
      ) : (
        <input
          type="text"
          value={fieldValue}
          style={inputStyle}
          readOnly
        />
      )}
    </div>
  );
}

const CallLog = () => {
  const { sessionId } = useParams();
  const history = useHistory();
  const [fieldsData, setFieldsData] = useState({
    'Session': '',
    'First Name': '',
    'Duration': '',
    'Last Name': '',
    'Date': '',
    'Flight No.': '',
    'Time': '',
    'Query': '',
    'Ended': '',
    'Notes': '',
    'Kiosk': '',
    'Customer Rating': '',
    'Agent': '',
  });

  const [callId, setCallId] = useState('');

  useEffect(() => {
    const fetchCallData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/getSelectedCallData?roomId=${sessionId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);

        const formatDateTime = (dateTime) => {
          return dateTime.replace('T', ' | ').split('.')[0];
        };

        setFieldsData(prevState => ({
          ...prevState,
          'Session': data.id || '',
          'Duration': data.callDuration || '',
          'Date': data.callEndTime ? formatDateTime(data.callEndTime).split(' | ')[0] : '',
          'Time': data.callStartTime ? formatDateTime(data.callStartTime).split(' | ')[1] : '',
          'Ended': data.callEndTime ? formatDateTime(data.callEndTime).split(' | ')[1] : '',
          'Agent': data.operatorName || '',
          'Kiosk': data.callOrigin || '',
        }));

        setCallId(data.id || '');
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchCallData();
  }, [sessionId]);

  useEffect(() => {
    const fetchCallDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/getCallDetailsByRoomId?roomId=${sessionId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched details data:', data);

        setFieldsData(prevState => ({
          ...prevState,
          'First Name': data.firstName || '',
          'Last Name': data.lastName || '',
          'Flight No.': data.flightNo || '',
          'Query': data.query || '',
          'Notes': data.notes || '',
          'Customer Rating': data.customerRating || '',
        }));
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchCallDetails();
  }, [sessionId]);

  return (
    <div className="row">
      <div className="col-md-2">
        <NavbarLocal />
      </div>
      <div className="col-md-10">
        <div style={{ ...containerStyle, display: 'flex', flexWrap: 'wrap' }}>
          <div className="top-image-container" style={{ top: '-53px', left: '-65px' }}>
            <img src={LogoImage} alt="GMR Delhi Logo" className="logo-image" style={{ maxWidth: '25%' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={BackButtonImage}
              alt="Back"
              style={{ cursor: 'pointer', marginRight: '10px', height: '33px' }}
              onClick={() => history.push('/Auditlist')}
            />
            <h2 style={{ ...fontStyle, textAlign: 'center', ...titleStyle }}>
              CALL LOG &gt;
            </h2>
            {callId && (
              <span style={{ ...fontStyle, ...idStyle, marginLeft: '10px' }}>
                {callId}
              </span>
            )}
          </div>
          <div className='calllog-container' style={{ flex: '1 0 100%' , overflowY:'scroll', height:'350px'}}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {Object.keys(fieldsData).map((key) => (
                <Field
                  key={key}
                  fieldName={key}
                  fieldValue={fieldsData[key]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallLog;

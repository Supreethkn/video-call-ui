import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import LogoImage from '../resources/GMR_delhi_combine_logo.png';
import CallLogIcon from '../resources/call-log-icon.png';

const fontStyle = {
  fontFamily: 'Poppins, sans-serif',
};

const fieldLabelStyle = {
  color: '#29417D',
  // width: '150px',
  marginRight: '10px',
  fontWeight: 'bold',
  fontSize: '25px',
  whiteSpace: 'nowrap',
  minWidth: '230px',
};

const inputStyle = {
  width: 'calc(100% - 160px)',
  padding: '10px',
  fontFamily: 'Poppins, sans-serif',
  border: 'none',
  fontSize: '20px',
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  padding: '50px 25px 25px',
};

const buttonStyle = {
  padding: '10px 50px',
  backgroundColor: '#F29E3A',
  color: '#29417D',
  border: 'none',
  borderRadius: '50px',
  fontSize: '25px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

function Field({ fieldName, fieldValue }) {
  return (
    <div style={{ flex: '1 0 50%', padding: '10px', display: 'flex', alignItems: 'center' }}>
      <label style={fieldLabelStyle}>{fieldName}</label>
      {fieldName === 'Notes' ? (
        <textarea
          value={fieldValue}
          readOnly
          style={{ ...inputStyle, height: '250px', resize: 'none' }}
        />
      ) : (
        <input
          type="text"
          value={fieldValue}
          readOnly
          style={inputStyle}
        />
      )}
    </div>
  );
}

const CallLog = () => {
  const { sessionId } = useParams(); // Use useParams to get the id from the URL
  console.log("Call Log ID:", sessionId); // Log the id

  let fieldsData = {
    'Session': '78962',
    'First Name': 'Lorem',
    'Duration': '00:10',
    'Last Name': 'Ipsum',
    'Date': '06/06/2024',
    'Flight No.': 'ABCDE',
    'Time': '10:24 AM',
    'Query': 'Location - Dining, Flight Info, Location - Amenities',
    'Ended': '10:34 AM',
    'Notes': 'The customer called to ask for the location of Starbucks, flight information, and sleeping lounge amenities...',
    'Kiosk': 'A67',
    'Customer Rating': 'Resolved',
    'Agent': 'Maya L.',
  };

  const leftColumnFields = ['Session', 'Duration', 'Date', 'Time', 'Ended', 'Kiosk', 'Customer Rating', 'Agent'];
  const rightColumnFields = ['First Name', 'Last Name', 'Flight No.', 'Query', 'Notes'];

  console.log("heyyyyyyyyyy");
  fetch(process.env.REACT_APP_SERVER + '/testapi', {
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json(); // Parse the JSON response
  }).then((data) => {
    fieldsData.Session = data.roomId;
    console.log('testapi data:', data); // This should log the actual data
  }).catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });

  // fieldsData.Session = res.roomId;

  return (
    <div style={{ ...fontStyle, height: '100vh', padding: '20px', overflow: 'hidden' }}>
      <div className="top-image-container" style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <img src={LogoImage} alt="GMR Delhi Logo" className="logo-image" style={{ maxWidth: '100%' }} />
      </div>

      <div style={{
        ...fontStyle,
        width: 'auto',
        height: '814px',
        backgroundColor: '#E6E7E8',
        margin: '-40px 50px 0px 50px',
        padding: '20px',
        borderRadius: '10px',
      }}>
        <div style={containerStyle}>
          <img src={CallLogIcon} alt="Call Log Icon" />
          <h2 style={{ color: '#F29E3A', marginBottom: '5px' }}>CALL LOG</h2>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ flex: '0 0 40%', padding: '10px' }}>
            {leftColumnFields.map(fieldName => (
              <Field key={fieldName} fieldName={fieldName} fieldValue={fieldsData[fieldName]} />
            ))}
          </div>
          <div style={{ flex: '1', padding: '10px' }}>
            {rightColumnFields.map(fieldName => (
              <Field key={fieldName} fieldName={fieldName} fieldValue={fieldsData[fieldName]} />
            ))}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button style={buttonStyle}>SUBMIT</button>
            </div>
          </div>
        </div>
        <div style={{ ...fontStyle, textAlign: 'left', marginTop: '50px', fontSize: '20px' }}>
          After Call Time <br></br><span style={{ fontWeight: 'bold' }}>00:01:03</span>
        </div>
      </div>
    </div>
  );
};

export default CallLog;

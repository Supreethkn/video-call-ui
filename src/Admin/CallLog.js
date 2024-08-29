import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import LogoImage from '../resources/GMR_delhi_combine_logo.png';
import CallLogIcon from '../resources/call-log-icon.png';

const fontStyle = {
  fontFamily: 'Poppins, sans-serif',
};

const fieldLabelStyle = {
  color: '#29417D',
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

function Field({ fieldName, fieldValue, onChange, isEditable }) {
  return (
    <div style={{ flex: '1 0 50%', padding: '10px', display: 'flex', alignItems: 'center' }}>
      <label style={fieldLabelStyle}>{fieldName}</label>
      {fieldName === 'Notes' ? (
        <textarea
          value={fieldValue}
          onChange={(e) => onChange(fieldName, e.target.value)}
          style={{ ...inputStyle, height: '250px', resize: 'none' }}
          disabled={!isEditable}
        />
      ) : (
        <input
          type="text"
          value={fieldValue}
          onChange={(e) => onChange(fieldName, e.target.value)}
          style={inputStyle}
          disabled={!isEditable}
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

  const handleInputChange = (fieldName, value) => {
    setFieldsData(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    const fetchCallData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/getCallData?roomId=${sessionId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data

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
        }));
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchCallData();
  }, [sessionId]);

  const validateFields = () => {
    const mandatoryFields = ['First Name', 'Last Name', 'Flight No.', 'Query', 'Notes', 'Kiosk', 'Customer Rating'];
    for (const field of mandatoryFields) {
      if (!fieldsData[field]) {
        return `${field} is required`;
      }
    }
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateFields();
    if (validationError) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: validationError,
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit the form?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F29E3A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVER}/updateCallDetails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              roomId: sessionId,
              kiosk: fieldsData['Kiosk'],
              customerRating: fieldsData['Customer Rating'],
              firstName: fieldsData['First Name'],
              lastName: fieldsData['Last Name'],
              flightNo: fieldsData['Flight No.'],
              query: fieldsData['Query'],
              notes: fieldsData['Notes'],
            }),
          });

          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Submitted!',
              text: 'Your call details have been updated.',
            }).then(() => {
              history.push('/dashboard'); // Redirect to dashboard
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Submission Failed',
              text: 'Failed to update call details.',
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error with your submission.',
          });
        }
      }
    });
  };

  const leftColumnFields = ['Session', 'Duration', 'Date', 'Time', 'Ended', 'Kiosk', 'Customer Rating', 'Agent'];
  const rightColumnFields = ['First Name', 'Last Name', 'Flight No.', 'Query', 'Notes'];

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
              <Field
                key={fieldName}
                fieldName={fieldName}
                fieldValue={fieldsData[fieldName]}
                onChange={handleInputChange}
                isEditable={fieldName !== 'Session' && fieldName !== 'Duration' && fieldName !== 'Date' && fieldName !== 'Time' && fieldName !== 'Ended' && fieldName !== 'Agent'}
              />
            ))}
          </div>
          <div style={{ flex: '1', padding: '10px' }}>
            {rightColumnFields.map(fieldName => (
              <Field
                key={fieldName}
                fieldName={fieldName}
                fieldValue={fieldsData[fieldName]}
                onChange={handleInputChange}
                isEditable={true} // Editable fields
              />
            ))}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button style={buttonStyle} onClick={handleSubmit}>SUBMIT</button>
            </div>
          </div>
        </div>
        <div style={{ ...fontStyle, textAlign: 'left', marginTop: '50px', fontSize: '20px' }}>
          After Call Time <br /><span style={{ fontWeight: 'bold' }}>00:01:03</span>
        </div>
      </div>
    </div>
  );
};

export default CallLog;

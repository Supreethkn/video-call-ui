import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import LogoImage from '../resources/GMR_delhi_combine_logo.png';
import CallLogIcon from '../resources/call-log-icon.png';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';  // Import the tree component's styles
import './Operator.css';
import ReactDOM from 'react-dom';


const fontStyle = {
  fontFamily: 'Poppins, sans-serif',
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
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  padding: '30px 15px 15px',
};

const buttonStyle = {
  padding: '8px 30px',
  backgroundColor: '#F29E3A',
  color: '#29417D',
  border: 'none',
  borderRadius: '30px',
  fontSize: '18px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const queryTreeData = [
  {
    title: 'Location',
    key: 'location',
    children: [
      { title: 'Dining', key: 'location-dining' },
      { title: 'Amenities', key: 'location-amenities' },
    ],
  },
  {
    title: 'Flight Info',
    key: 'flight-info',
    children: [
      { title: 'Departure', key: 'flight-info-departure' },
      { title: 'Arrival', key: 'flight-info-arrival' },
    ],
  },
  // Add more main queries and sub-queries here
];

function Field({ fieldName, fieldValue, onChange, isEditable }) {
  return (
    <div style={{ flex: '1 0 50%', padding: '8px', display: 'flex', alignItems: 'center' }}>
      <label style={fieldLabelStyle}>{fieldName}</label>
      {fieldName === 'Notes' ? (
        <textarea
          value={fieldValue}
          onChange={(e) => onChange(fieldName, e.target.value)}
          style={{ ...inputStyle, height: '150px', resize: 'none' }}
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
  const [selectedQueries, setSelectedQueries] = useState([]);

  const handleInputChange = (fieldName, value) => {
    setFieldsData(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const onSelectQuery = (selectedKeys) => {
    setSelectedQueries(selectedKeys);
    setFieldsData(prevState => ({
      ...prevState,
      'Query': selectedKeys.join(', '), // Update the Query field with selected queries
    }));
  };


  const showQueryTreePopup = () => {
    Swal.fire({
      title: 'Select Query',
      html: `<div id="query-tree-container"></div>`,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Select',
      preConfirm: () => {
        return selectedQueries;
      },
      didOpen: () => {
        const treeContainer = Swal.getPopup().querySelector('#query-tree-container');
        if (treeContainer) {
          ReactDOM.render(
            <Tree
              className="rc-tree"
              treeData={queryTreeData}
              selectable
              selectedKeys={selectedQueries}
              onSelect={onSelectQuery}
              multiple
              defaultExpandAll
            />,
            treeContainer
          );
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setFieldsData(prevState => ({
          ...prevState,
          'Query': selectedQueries.join(', '),
        }));
      }
    });
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
          'Kiosk': data.callOrigin || '',
          
        }));
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchCallData();
  }, [sessionId]);

  const validateFields = () => {
    const mandatoryFields = ['First Name', 'Last Name', 'Flight No.', 'Query', 'Notes',  'Customer Rating'];
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
              customerRating: fieldsData['Customer Rating'],
              firstName: fieldsData['First Name'],
              lastName: fieldsData['Last Name'],
              flightNo: fieldsData['Flight No.'],
              query: fieldsData['Query'],  // Pass the selected queries
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

  const leftColumnFields = ['Session', 'Duration', 'Date', 'Time', 'Ended', 'Agent', 'Kiosk', 'Customer Rating'];
  const rightColumnFields = ['First Name', 'Last Name', 'Flight No.', 'Query', 'Notes'];
  
  return (
    <div style={{ ...fontStyle, height: '100vh', padding: '10px', overflow: 'auto' }}>
      <div className="top-image-container" style={{ textAlign: 'center', paddingBottom: '10px', top: '-30px' }}>
        <img src={LogoImage} alt="GMR Delhi Logo" className="logo-image" style={{ maxWidth: '100%', maxHeight: '58px', top: '43%' }} />
      </div>
  
      <div style={{
        ...fontStyle,
        width: 'auto',
        height: 'auto',
        backgroundColor: '#E6E7E8',
        margin: '-85px 20px 0px 20px',
        padding: '10px',
        borderRadius: '10px',
      }}>
        <div style={containerStyle}>
          <img src={CallLogIcon} alt="Call Log Icon" style={{ maxWidth: '50px', marginRight: '10px' }} />
          <h2 style={{ color: '#29417D', fontWeight: 'bold', fontSize: '24px' }}>Call Log</h2>
        </div>
  
        <div style={{ display: 'flex', flexWrap: 'wrap', paddingBottom: '15px' }}>
          <div style={{ flex: '1 0 50%' }}>
            {leftColumnFields.map(field => (
              <Field
                key={field}
                fieldName={field}
                fieldValue={fieldsData[field]}
                onChange={handleInputChange}
                isEditable={field === 'Customer Rating'}  // Keep these fields editable
              />
            ))}
          </div>
  
          <div style={{ flex: '1 0 50%' }}>
            {rightColumnFields.map(field => (
              field === 'Query' ? (
                <div style={{ flex: '1 0 50%', padding: '8px' }}>
          <label style={fieldLabelStyle}>Select Query</label>
          <div
            style={{
              ...inputStyle,
              minHeight: '40px',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '5px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              backgroundColor: '#fff',
            }}
            onClick={showQueryTreePopup}
          >
            {selectedQueries.length === 0 ? (
              <span style={{ color: '#888' }}>Click to select a query</span>
            ) : (
              selectedQueries.map((query) => (
                <div
                  key={query}
                  style={{
                    background: '#F29E3A',
                    color: '#fff',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  {query}
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQueries(selectedQueries.filter((q) => q !== query));
                    }}
                  >
                    &times;
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

              ) : (
                <Field
                  key={field}
                  fieldName={field}
                  fieldValue={fieldsData[field]}
                  onChange={handleInputChange}
                  isEditable={field !== 'Query'} 
                />
              )
            ))}
          </div>
        </div>
  
        <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
          <button onClick={handleSubmit} style={buttonStyle}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default CallLog;

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import LogoImage from '../resources/GMR_delhi_combine_logo.png';
import CallLogIcon from '../resources/call-log-icon.png';
import 'rc-tree/assets/index.css';  // Import the tree component's styles
import './Operator.css';
import QueryTreeModal from './QueryTreeModal';
import flightinformation from '../resources/flight-information.png';
import customercomplaints from '../resources/Customber-Compliants.png';
import checkinassistance from '../resources/check-in-assistance.png';
import baggageservices from '../resources/baggage-services.png';
import location1 from '../resources/location1.png';
import lostandfound from '../resources/lost-and-found.png';
import securityscreening from '../resources/security-screening.png';
import transportservices from '../resources/transport-services.png';
import traveldocumentation from '../resources/travel-documentation.png';
import Accesibilityservices from '../resources/Accesibility-services.png';

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
    title: 'Accesibility services',
    key: 'Accesibility-services',
    iconUrl: Accesibilityservices,
    children: [],
  },
  {
    title: 'Customber Compliants',
    key: 'Customber-Compliants',
    iconUrl: customercomplaints,
    children: [],
  },
  {
    title: 'Location',
    key: 'location',
    iconUrl: location1,
    children: [
      { title: 'amenities', key: 'location-amenities-amenities' },
      { title: 'Dining', key: 'location-amenities-Dining' },
      { title: 'Services', key: 'location-amenities-Services' },
      { title: 'shops', key: 'location-amenities-shops' },
    ],
  },
  {
    title: 'Flight Information',
    key: 'flight-information',
    iconUrl: flightinformation,
    children: [
      { title: 'Delays', key: 'flight-information-delays' },
      { title: 'Cancellations', key: 'flight-information-cancellations' },
      { title: 'Schedule changes', key: 'flight-information-schedule-changes' },
    ],
  },
  {
    title: 'Baggage Services',
    key: 'baggage-services',
    iconUrl: baggageservices,
    children: [
      { title: 'Lost', key: 'baggage-services-lost' },
      { title: 'Delayed', key: 'baggage-services-delayed' },
      { title: 'Damaged', key: 'baggage-services-damaged' },
    ],
  },
  {
    title: 'Security Screening',
    key: 'security-screening',
    iconUrl: securityscreening,
    children: [],
  },
  {
    title: 'Check-In Assistance',
    key: 'check-in-assistance',
    iconUrl: checkinassistance,
    children: [
      { title: 'Lost', key: 'baggage-services-lost' },
      { title: 'Delayed', key: 'baggage-services-delayed' },
      { title: 'Damaged', key: 'baggage-services-damaged' },
    ],
  },
  
  // {
  //   title: 'Customer Complaints',
  //   key: 'customer-complaints',
  //   iconUrl: customercomplaints,
  //   children: [],
  // },
  {
    title: 'Lost and Found',
    key: 'lost-and-found',
    iconUrl: lostandfound,
    children: [
      { title: 'Reporting/Surrender Found Item', key: 'lost-and-found-reporting' },
      { title: 'Looking For Lost item', key: 'lost-and-found-inquiring' },
    ],
  },
  {
    title: 'Transport Services',
    key: 'transport-services',
    iconUrl: transportservices,
    children: [
      { title: 'Information on airport shuttles', key: 'transport-services-shuttles' },
      { title: 'Information on taxis', key: 'transport-services-taxis' },
      { title: 'Information on car rentals', key: 'transport-services-car-rentals' },
    ],
  },
  // {
  //   title: 'Accessibility Services',
  //   key: 'accessibility-services',
  //   children: [
  //     { title: 'Assistance for passengers with special needs', key: 'accessibility-services-special-needs' },
  //     { title: 'Assistance for passengers with disabilities', key: 'accessibility-services-disabilities' },
  //   ],
  // },
  {
    title: 'Travel Documentation',
    key: 'travel-documentation',
    iconUrl: traveldocumentation,
    children: [
      { title: 'Help with visas', key: 'travel-documentation-visas' },
      { title: 'Help with passports', key: 'travel-documentation-passports' },
      { title: 'Help with other travel requirements', key: 'travel-documentation-other' },
    ],
  },
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputChange = (fieldName, value) => {
    setFieldsData(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const onCheckQuery = (key) => {
    setSelectedQueries(prev => {
      const newQueries = prev.includes(key) ? prev.filter(q => q !== key) : [...prev, key];
      setFieldsData(prevState => ({
        ...prevState,
        'Query': newQueries.join(', '),
      }));
      return newQueries;
    });
  };

  const showQueryTreeModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };


  const handleRemoveQuery = (queryToRemove) => {
    setSelectedQueries(selectedQueries.filter(query => query !== queryToRemove));
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
  
        <div style={{ display: 'flex', flexWrap: 'wrap', paddingBottom: '15px' , alignItems:'center' , justifyContent:'center', overflowY:'scroll', maxHeight:'393px' }}>
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
                  <div style={{ flex: '1 0 50%', padding: '8px', display: 'flex', flexDirection: 'row' }}>
                    <label style={fieldLabelStyle}>Query</label>

                    {/* Input-like container to display pills inside */}
                    <div
                      style={{
                        ...inputStyle,
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        padding: '5px',
                        minHeight: '40px',
                        backgroundColor:'#fff',
                        overflowX: 'auto',
                        cursor: 'pointer',
                      }}
                      onClick={showQueryTreeModal} // Show modal on click
                    >
                      {selectedQueries.map((query, index) => (
                        <div
                          key={index}
                          style={{
                            background: '#E6E7E8',
                            color: '#000',
                            padding: '5px 10px',
                            borderRadius: '20px',
                            display: 'flex',
                            margin:'2px',
                            boxShadow:'0px 0px 3px 0px',
                            alignItems: 'center',
                            marginRight: '5px',
                          }}
                        >
                          {query}
                          <button
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#000',
                              marginLeft: '8px',
                              cursor: 'pointer',
                            }}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent modal from opening when removing a query
                              handleRemoveQuery(query);
                            }}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                      {/* Invisible input to ensure the text cursor is still visible */}
                      <input
                        style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent' }}
                        type="text"
                        readOnly
                        placeholder={selectedQueries.length === 0 ? 'Select Query' : ''}
                        onClick={showQueryTreeModal} // Trigger modal on click
                      />
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
        <div style={{ textAlign: 'center', paddingBottom: '20px' , marginTop:'10px' }}>
                  <button onClick={handleSubmit} style={buttonStyle}>
                    Submit
                  </button>
            </div>
        </div>
        <QueryTreeModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        queryTreeData={queryTreeData}
        onCheckQuery={onCheckQuery}
        selectedQueries={selectedQueries}
      />
      </div>
    </div>
  );
  
};

export default CallLog;

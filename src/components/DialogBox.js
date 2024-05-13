

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const DialogBox = () => {
  const [entityType, setEntityType] = useState('');
  const [widgetType, setWidgetType] = useState('');
  const [chartData, setChartData] = useState([]);
  const [popupErrorMessage, setPopupErrorMessage] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [orderNo, setOrderNo] = useState('');
  const [fulfillmentNo, setFulfillmentNo] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [addWidgetClicked, setAddWidgetClicked] = useState(false);

  const generateRandomData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        timestamp: i,
        value: Math.floor(Math.random() * 100) + 1 
      });
    }
    return data;
  };

  const handleCreateWidget = async () => {
    try {
      if (!entityType || !widgetType) {
        setPopupErrorMessage('Please select both entity type and widget type.');
        return;
      }

      if (widgetType === 'count') {
        const response = await axios.get(`http://localhost:9000/widget/count/${entityType}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setOrderNo(response.data.totalCount);
        setFulfillmentNo(response.data.fulfillmentCount);
        setChartData([]);
      } else if (widgetType === 'timestamp') {
        const data = generateRandomData();
        setChartData(data);
      }

      setShowOutput(true);
      setPopupOpen(false);
      setAddWidgetClicked(true);
    } catch (error) {
      setPopupErrorMessage('Failed to fetch data from the server');
      console.error(error);
    }
  };

  const handleBack = () => {
    setShowOutput(false);
    setEntityType('');
    setWidgetType('');
    setChartData([]);
    setPopupErrorMessage('');
    setAddWidgetClicked(false);
  };

  return (
    <div>
      {!addWidgetClicked && (
        <button className="add-widget-button" onClick={() => setPopupOpen(true)} disabled={popupOpen}>
        
        </button>
      )}
      {popupOpen && (
        <div className="popup">
          
          <div className="popup-content">
            <div className="form-field">
              <label>Entity Type:</label>
              <select value={entityType} onChange={(e) => setEntityType(e.target.value)}>
                <option value="">Select</option>
                <option value="Order">Order</option>
                <option value="Fulfillment">Fulfillment</option>
              </select>
            </div>
            <div className="form-field">
              <label>Widget Type:</label>
              <select value={widgetType} onChange={(e) => setWidgetType(e.target.value)}>
                <option value="">Select</option>
                <option value="count">Count</option>
                <option value="timestamp">Timestamp</option>
              </select>
            </div>
            <div className="form-field">
              <button onClick={handleCreateWidget}>Create</button>
              <button onClick={() => setPopupOpen(false)}>Cancel</button>
            </div>
            {popupErrorMessage && <p className="error-message">{popupErrorMessage}</p>}
          </div>
        </div>
      )}
      {showOutput && (
        <div className="output-container">
          <h2>{widgetType === 'count' ? 'Count' : 'Timestamp'}</h2>
          {widgetType === 'count' && (
            <div className="add-widget-button-style">
              <button
                className="add-widget-button"
                style={{
                  backgroundColor: '#007BFF',
                  color: 'white',
                  padding: '10px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {entityType.toUpperCase()}<br />
                <span style={{ color: 'black' }}>Total Count: {orderNo}</span><br />
                {fulfillmentNo && <span style={{ color: 'black' }}>Fulfillment Count: {fulfillmentNo}</span>}
              </button>
            </div>
          )}
          {widgetType === 'timestamp' && (
            <LineChart width={500} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          )}
          <button
            className="back-button"
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default DialogBox;


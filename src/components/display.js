import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import { format } from 'date-fns'; // Robust date formatting
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Display = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [lugData, setLugData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const sampleLugData = {
    '2024-12-01': {
      B1013: [
        ["2024-12-01", "B1013", "420W", 12, 0.419, 0.362, 0.863, -2.81, 7.41, 0.85, 7.16, 12, 12.04],
        ["2024-12-01", "B1013", "420W", 12, 0.416, 0.36, 0.865, -2.59, 7.43, 0.6, 7.81, 12, 12.04],
      ],
      B1005: [
        ["2024-12-01", "B1005", "420W", 12, 0.407, 0.38, 0.869, -2.14, 7.43, 0.57, 7.64, 12, 12.04],
      ],
    },
    '2024-12-02': {
      B1005: [
        ["2024-12-02", "B1005", "420W", 12, 0.409, 0.35, 0.855, -3.7, 7.38, 0.53, 7.44, 12, 12.03],
        ["2024-12-02", "B1005", "420W", 12, 0.411, 0.351, 0.854, -3.82, 7.42, 0.51, 7.04, 12, 12.03],
      ],
      B1006: [
        ["2024-12-02", "B1006", "420W", 12, 0.405, 0.348, 0.859, -3.26, 7.41, 0.65, 8.55, 12, 12.04],
      ],
    },
  };

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    if (selectedDate && selectedBatch) {
      const data = sampleLugData[selectedDate]?.[selectedBatch];
      if (data) {
        setLugData(data);
        setShowTable(true);
      } else {
        setLugData([]);
        setShowTable(false);
      }
    }
  }, [selectedDate, selectedBatch]);

  const handleDateChange = (date) => {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    setSelectedDate(formattedDate);
    setSelectedBatch('');
    setShowTable(false);
  };

  const handleTodayClick = () => {
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    setSelectedDate(formattedDate);
    setSelectedBatch('');
    setShowTable(false);
  };

  const handleProceed = () => {
    if (selectedDate && selectedBatch) {
      setShowTable(true);
    } else {
      alert('Please select both date and batch.');
    }
  };

  const handleBackToHome = () => {
    navigate("/home"); // Navigate back to the home page
  };

  const getAvailableBatches = () => {
    if (selectedDate) {
      return Object.keys(sampleLugData[selectedDate] || {});
    }
    return [];
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const buttonColors = {
    today: { backgroundColor: '#ffc107', color: '#fff' },
    proceed: { backgroundColor: '#007bff', color: '#fff' },
    home: { backgroundColor: '#dc3545', color: '#fff' },
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {!showTable ? (
        <>
          <h2>Select Date and Batch Number</h2>

          {/* Full Screen Calendar */}
          <div style={{ display: 'inline-block', marginBottom: '20px' }}>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate ? new Date(selectedDate) : null}
              maxDetail="month"
              showNeighboringMonth={false}
            />
          </div>

          {/* Today Button */}
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={handleTodayClick}
              style={{ ...buttonStyle, ...buttonColors.today }}
            >
              Today
            </button>
          </div>

          {/* Display the batch dropdown */}
          {selectedDate && (
            <div style={{ marginBottom: '20px' }}>
              <label>
                Batch Number:
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  style={{ padding: '10px', fontSize: '16px' }}
                >
                  <option value="">Select a batch</option>
                  {getAvailableBatches().map((batch) => (
                    <option key={batch} value={batch}>
                      {batch}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {/* Proceed Button */}
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={handleProceed}
              style={{ ...buttonStyle, ...buttonColors.proceed }}
            >
              Proceed
            </button>
          </div>

          {/* Back to Home Button */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleBackToHome}
              style={{ ...buttonStyle, ...buttonColors.home }}
            >
              Back to Home
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Table Display */}
          <h3>Lug Data for {selectedBatch} on {selectedDate}</h3>
          <table border="1" style={{ width: '80%', margin: '20px auto' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Batch No.</th>
                <th>Grade</th>
                <th>Nominal Diameter(mm)</th>
                <th>Actual Length(m)</th>
                <th>Actual Weight (Kg)</th>
                <th>Actual Mass (Kg/m)</th>
                <th>Variation in Unit Mass</th>
                <th>Ave. Lug Spacing (mm)</th>
                <th>Lug Height (mm)</th>
                <th>Sum. Of Gap (mm)</th>
                <th>Target Length</th>
                <th>Rebar Length</th>
              </tr>
            </thead>
            <tbody>
              {lugData.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Back Button */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleBackToHome}
              style={{ ...buttonStyle, ...buttonColors.home }}
            >
              Back to Home
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Display;

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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
    navigate("/home");
  };

  const handleBackToSelection = () => {
    setSelectedDate('');
    setSelectedBatch('');
    setLugData([]);
    setShowTable(false);
  };

  const getAvailableBatches = () => {
    if (selectedDate) {
      return Object.keys(sampleLugData[selectedDate] || {});
    }
    return [];
  };

  const buttonStyle = {
    padding: '8px 15px',
    fontSize: '23px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  const buttonColors = {
    today: { backgroundColor: '#ffa302', color: '#fff' },
    proceed: { backgroundColor: '#b99a64', color: '#fff' },
    home: { backgroundColor: '#1f4761', color: '#fff' },
    backToSelection: { backgroundColor: '#fec619', color: '#000' }, // New button color
  };

  return (
    <div style={styles.displayPage}>
      <div style={styles.logoContainer}>
        <img
          src="/logoti.jpg"
          alt="Logo"
          style={styles.logo}
          onError={(e) => (e.target.style.display = 'none')}
        />
      </div>

      <h2 style={styles.title}>Select Date and Batch</h2>
      {!showTable ? (
        <>
          <div style={styles.form}>
            <h3 style={styles.formTitle}>Choose your Date</h3>
            <div style={styles.calendar}> 
            <Calendar
              onChange={handleDateChange}
              value={selectedDate ? new Date(selectedDate) : null}
              maxDetail="month"
              showNeighboringMonth={false}
              style={styles.calendar}
            />
            </div>

            <div style={styles.inputContainer}>
              <label style={styles.label}>Batch Number</label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                style={styles.input}
              >
                <option value="">Select a batch</option>
                {getAvailableBatches().map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.buttonContainer}>
            <button
                onClick={handleTodayClick}
                style={{ ...buttonStyle, ...buttonColors.today }}
              >
                Today
              </button>
              <button
                onClick={handleProceed}
                style={{ ...buttonStyle, ...buttonColors.proceed }}
              >
                Proceed
              </button>
              <button
                onClick={handleBackToHome}
                style={{ ...buttonStyle, ...buttonColors.home }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h3 style={styles.tableTitle}>
            Lug Data for {selectedBatch} on {selectedDate}
          </h3>
          <table style={styles.table}>
          <thead>
            <tr>
              {["Date", "Batch No.",
              "Grade", "Nominal Diameter(mm)", 
              "Actual Length(m)", "Actual Weight (Kg)",
              "Actual Mass (Kg/m)", "Variation in Unit Mass", 
              "Ave. Lug Spacing (mm)", "Lug Height (mm)",
              "Sum. Of Gap (mm)", "Target Length", 
              "Rebar Length"].map((header, index) => (
                <th key={index} style={styles.tableCell}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lugData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={styles.tableCell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
          </table>
          <div style={styles.buttonContainer}>
            <button
              onClick={handleBackToSelection}
              style={{ ...buttonStyle, ...buttonColors.backToSelection }}
            >
              Back to Date Selection
            </button>
            <button
              onClick={handleBackToHome}
              style={{ ...buttonStyle, ...buttonColors.home }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  displayPage: {
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    position: 'relative',
    padding: '20px',
  },
  logoContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
  },
  logo: {
    width: '75px',
    height: 'auto',
  },
  title: {
    fontSize: '40px',
    marginTop: '5px',
  },
  tableTitle: {
    fontSize: '25px',
    marginBottom: '10px',
  },
  form: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    width: '500px',
    height:'725px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  formTitle: {
    fontSize: '24px',
    marginTop: '20px',
  },
  inputContainer: {
    marginTop: '60px',
  },
  label: {
    display: 'block',
    textAlign: 'center',
    marginBottom: '5px',
    marginTop: '5px',
    fontSize: '28px',
  },
  input: {
    padding: '10px',
    width: '100%',
    margin: '5px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '25px',
  },
  calendar: {
    marginBottom: '20px',
    transform: 'scale(1.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    marginTop: 'auto', // Pushes buttons to the bottom
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px', // Spacing between buttons
    paddingTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '50px',
    border: 'none',
    borderRadius: '5px',
    marginBottom: '100px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  table: {
    width: '100%',
    fontSize: '20px',
    margin: '20px auto',
    textAlign: 'center',
    borderCollapse: 'collapse',
    backgroundColor: '#ffd999',
    borderRadius: '1px',
    color: '#000',
    border: '2px solid black',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  tableHeader: {
    backgroundColor: '#333',
    textAlign: 'center',
    padding: '10px',
    fontSize: '20px',
  },
  tableCell: {
    padding: '1px',
    textAlign: 'center',
    border: '1px solid black',
  },
};

export default Display;
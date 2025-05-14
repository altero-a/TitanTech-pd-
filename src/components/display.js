import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

const Display = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [lugData, setLugData] = useState([]);
  const [sampleLugData, setSampleLugData] = useState({});
  const [hoveredDate, setHoveredDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raspiRef = ref(database, 'raspi_uploads');
    const measurementsRef = ref(database, 'measurements');
    const raspiTestRef = ref(database, 'raspi_uploads_test');

    const allData = {};

    const handleSnapshot = (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      Object.values(data).forEach(entry => {
        const dateStr = entry['Date'] || entry['date'];
        const parsedDate = new Date(dateStr);
        if (!isNaN(parsedDate)) {
          const date = format(parsedDate, 'yyyy-MM-dd');
          const batch = entry['Batch Number'] || entry['batch'];
          if (!allData[date]) allData[date] = {};
          if (!allData[date][batch]) allData[date][batch] = [];

          allData[date][batch].push({
            Date: date,
            BatchNumber: batch,
            Diameter: entry['Diameter'],
            Weight: entry['Weight'],
            Length: entry['Length'] || '',
            LugHeight: entry['Lug Height'],
            LugSpacing: entry['Lug Spacing'],
            LugGaps: entry['Lug Gaps'],
            Status: entry['Status'],
          });
        }
      });
    };

    // Merge all sources into allData, then update once
    const loadData = async () => {
      onValue(raspiRef, (snap) => {
        handleSnapshot(snap);
        onValue(raspiTestRef, (snap2) => {
          handleSnapshot(snap2);
          onValue(measurementsRef, (snap3) => {
            handleSnapshot(snap3);
            setSampleLugData({ ...allData });
          });
        });
      });
    };

    loadData();
  }, []);

  useEffect(() => {
    if (selectedDate && selectedBatch) {
      const data = sampleLugData[selectedDate]?.[selectedBatch];
      setLugData(data ? data.map((entry) => ({ ...entry })) : []);
    }
  }, [selectedDate, selectedBatch, sampleLugData]);

  const handleDateChange = (date) => {
    setSelectedDate(format(new Date(date), 'yyyy-MM-dd'));
    setSelectedBatch('');
    setLugData([]);
  };

  const handleLengthChange = (index, value) => {
    const updated = [...lugData];
    updated[index].Length = value;
    setLugData(updated);
  };

  const allLengthsFilled = lugData.every(entry => entry.Length !== '' && entry.Length != null);

  const handleProceed = () => {
    if (!selectedDate || !selectedBatch) {
      alert('Please select both date and batch.');
    } else if (!allLengthsFilled) {
      alert('Please fill in all Length fields before proceeding.');
    } else {
      alert('Proceeding...');
    }
  };

  const handleBackToSelection = () => {
    setSelectedDate('');
    setSelectedBatch('');
    setLugData([]);
  };

  const handleBackToHome = () => navigate('/home');

  const getAvailableBatches = () =>
    selectedDate ? Object.keys(sampleLugData[selectedDate] || {}).sort() : [];

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  };

  const buttonColors = {
    proceed: { backgroundColor: '#ffa500', color: '#000' },
    home: { backgroundColor: '#34495e', color: '#fff' },
    back: { backgroundColor: '#ffc107', color: '#000' },
    print: { backgroundColor: '#28a745', color: '#fff' },
  };

  return (
    <div style={styles.displayPage}>
      <div style={styles.darkOverlay}></div>
      <div style={styles.contentWrapper}>
        <div style={styles.logoContainer}>
          <img src="/logoti.jpg" alt="TitanTech Logo" className="logo" style={styles.logo} />
        </div>

        {!lugData.length ? (
          <div style={styles.overlayWrapper}>
            <div style={styles.overlay}>
              <div style={styles.calendarAndButtons}>
                <h2 style={{ ...styles.title, color: '#fff' }}>Select Date and Batch Number</h2>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <div style={{ marginRight: '20px' }}>
                    <Calendar
                      onChange={handleDateChange}
                      value={selectedDate ? new Date(selectedDate) : new Date()}
                      maxDetail="month"
                      showNeighboringMonth={false}
                      tileContent={({ date }) => {
                        const formattedDate = format(date, 'yyyy-MM-dd');
                        const hasData = sampleLugData[formattedDate] && Object.keys(sampleLugData[formattedDate]).length > 0;
                        return formattedDate === hoveredDate && !hasData ? <span>No scans</span> : null;
                      }}
                      onMouseOver={({ activeStartDate }) => setHoveredDate(format(activeStartDate, 'yyyy-MM-dd'))}
                    />
                  </div>
                  {selectedDate && (
                    <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <label style={{ fontSize: '18px', marginBottom: '10px' }}>Batch Number:</label>
                      <select
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        style={{ padding: '10px', fontSize: '16px' }}
                      >
                        <option value="">Select a batch</option>
                        {getAvailableBatches().map((batch) => (
                          <option key={batch} value={batch}>{batch}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                  <button onClick={handleProceed} style={{ ...buttonStyle, ...buttonColors.proceed }}>Proceed</button>
                  <button onClick={handleBackToHome} style={{ ...buttonStyle, ...buttonColors.home }}>Back to Home</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div id="printableArea">
            <div style={styles.overlay}>
              <h3 style={styles.title}>Data for {selectedBatch} on {selectedDate}</h3>
              <div style={styles.tableContainer}>
                <table border="1" style={{ width: '100%', maxWidth: '1300px', margin: '20px auto', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f5b676', color: '#000', fontSize: '18px' }}>
                      <th>Date</th>
                      <th>Batch Number</th>
                      <th>Diameter (mm)</th>
                      <th>Weight (Kg)</th>
                      <th>Length (m)</th>
                      <th>Lug Height<div style={{ fontSize: '12px' }}>10mm (0.4-0.8)<br />12mm (0.5-1.0)<br />16mm (0.7-1.4)</div></th>
                      <th>Lug Spacing<div style={{ fontSize: '12px' }}>10mm (7.0)<br />12mm (8.4)<br />16mm (11.2)</div></th>
                      <th>Lug Gaps<div style={{ fontSize: '12px' }}>10mm (7.8)<br />12mm (9.4)<br />16mm (12.6)</div></th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lugData.map((entry, index) => (
                      <tr key={index} style={{ backgroundColor: '#f5b676', color: '#000' }}>
                        <td>{entry.Date}</td>
                        <td>{entry.BatchNumber}</td>
                        <td>{entry.Diameter}</td>
                        <td>{entry.Weight}</td>
                        <td>
                          <input
                            type="number"
                            value={entry.Length}
                            onChange={(e) => handleLengthChange(index, e.target.value)}
                            style={{ width: '70px' }}
                          />
                        </td>
                        <td>{entry.LugHeight}</td>
                        <td>{entry.LugSpacing}</td>
                        <td>{entry.LugGaps}</td>
                        <td style={{ color: /pass|ok/i.test(entry.Status) ? 'green' : 'red' }}>{entry.Status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button onClick={handleBackToSelection} style={{ ...buttonStyle, ...buttonColors.back, marginRight: '10px' }}>Back to Selection</button>
                <button
                  onClick={() => {
                    if (!allLengthsFilled) {
                      alert('Please fill in all Length values before printing.');
                    } else {
                      window.print();
                    }
                  }}
                  style={{ ...buttonStyle, ...buttonColors.print }}
                >Print</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hide buttons and logo when printing */}
      <style>{`
        @media print {
          button, .logo {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  displayPage: {
    backgroundImage: 'url("/bg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(224, 187, 118, 0.54)",
    zIndex: 1,
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  logoContainer: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 100,
  },
  logo: {
    maxWidth: '100px',
    height: 'auto',
  },
  title: {
    fontSize: '40px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  overlayWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: '40px',
    borderRadius: '10px',
    zIndex: 2,
  },
  calendarAndButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableContainer: {
    position: 'relative',
    zIndex: 2,
    padding: '20px',
  },
};

export default Display;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get, child, onValue } from "firebase/database";
import { database } from '../firebase';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Label
} from "recharts";

const Home = ({ user, setUser, users }) => {
  const [hover, setHover] = useState(false);
  const [statusData, setStatusData] = useState({ pass: 0, fail: 0 });
  const [compiledData, setCompiledData] = useState([]);
  const [hasTodayScan, setHasTodayScan] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const navigate = useNavigate();

  // Fetch Status Data
  useEffect(() => {
    const fetchStatusData = async () => {
      const dbRef = ref(database);
      try {
        const snapshot = await get(child(dbRef, "/"));
        let pass = 0, fail = 0;

        snapshot.forEach((childSnap) => {
          childSnap.forEach((itemSnap) => {
            const data = itemSnap.val();
            const statusRaw = (data.status || data.Status || "").toLowerCase();
            const status = statusRaw === "ok" ? "pass" : statusRaw;
            if (status === "pass") pass++;
            else if (status === "fail") fail++;
          });
        });

        setStatusData({ pass, fail });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStatusData();
  }, []);

  // Fetch Compilation Data for Charts
  useEffect(() => {
    const dataRef = ref(database, "raspi_uploads");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const countsByDate = {};

      for (let key in data) {
        const item = data[key];
        const statusRaw = item.Status || item.status || "";
        const status = statusRaw.toLowerCase();
        const rawDate = item.Date || item.date;

        if (!rawDate) continue;
        const date = rawDate.split(" ")[0];

        if (!countsByDate[date]) countsByDate[date] = { date, pass: 0, fail: 0 };

        // Treat "ok" as "pass"
        if (status === "pass" || status === "ok") countsByDate[date].pass++;
        else if (status === "fail") countsByDate[date].fail++;
      }

      // Sort data by date in descending order and take the first 5 days
      const sortedData = Object.values(countsByDate)
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5);  // Take the latest 5 days

      setCompiledData(sortedData);
    });
  }, []);

  // Check if today's batch is scanned
  useEffect(() => {
    const dataRef = ref(database, "raspi_uploads");
    const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      let found = false;

      for (let key in data) {
        const rawDate = data[key].Date || data[key].date;
        if (!rawDate) continue;

        let formatted = null;

        try {
          const parsed = new Date(rawDate);
          if (!isNaN(parsed)) {
            formatted = parsed.toLocaleDateString("en-CA"); // Normalize to YYYY-MM-DD
          } else if (typeof rawDate === "string" && /^\d{4}-\d{2}-\d{2}/.test(rawDate)) {
            formatted = rawDate.slice(0, 10); // Already in YYYY-MM-DD format
          }
        } catch (err) {
          console.warn("Invalid date format:", rawDate);
          continue;
        }

        if (formatted === today) {
          found = true;
          break;
        }
      }

      setHasTodayScan(found);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const handleViewUsers = () => navigate("/viewuser");
  const handleRequests = () => navigate("/requests");
  const handleDisplayClick = () => navigate("/display");
  const handleUserManualClick = () => navigate("/usermanual");

  const chartData = [
    { name: "Pass", value: statusData.pass },
    { name: "Fail", value: statusData.fail },
  ];

  const COLORS = ["#ffa500", "#25272b"];

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <img src="/logoti.jpg" alt="Logo" style={styles.logo} />
        </div>

        <button style={styles.navButton} onClick={() => navigate("/about")}>About</button>

        <div
          style={{ position: 'relative', width: '150px' }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={handleDisplayClick}
        >
          <button style={styles.navButton}>Display</button>
          {showTooltip && (
            <div style={styles.tooltip}>
              {hasTodayScan ? "Batch scanned today" : "No scanned batch yet Today"}
            </div>
          )}
        </div>

        {user.role === "admin" && (
          <div
            style={styles.userDropdown}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <button style={styles.navButton}>Users</button>
            {hover && (
              <div style={styles.hoverOptions}>
                <button style={styles.optionButton} onClick={handleViewUsers}>View Users</button>
                <button style={styles.optionButton} onClick={handleRequests}>Requests</button>
              </div>
            )}
          </div>
        )}

        <button style={styles.navButton} onClick={handleUserManualClick}>User Manual</button>

        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>

      <div style={styles.main}>
        <h1>Welcome, {user.name}!</h1>

        <div style={styles.chartContainer}>
          <h2 style={{ marginBottom: '10px' }}>Compilation Result</h2>

          <div style={styles.chartWrapper}>
            <div style={{ width: "48%" }}>
              <h3 style={styles.graphLabel}>Overall Scan Summary (Pass vs Fail)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="top" height={25} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={{ width: "48%" }}>
              <h3 style={styles.graphLabel}>Daily Scan Results (Pass & Fail)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={compiledData} margin={{ top: 10, right: 15, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date">
                    <Label value="Date" offset={-10} position="insideBottom" />
                  </XAxis>
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="pass" fill="#ffa500" name="Pass Count" />
                  <Bar dataKey="fail" fill="#25272b" name="Fail Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h3 style={{ ...styles.graphLabel, marginTop: "30px" }}>Trend of Scan Results Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={compiledData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date">
                <Label value="Date" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="pass" stroke="#ffa500" name="Pass" />
              <Line type="monotone" dataKey="fail" stroke="#25272b" name="Fail" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundImage: "url('/bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  sidebar: {
    width: "200px",
    backgroundColor: "#2a2b2f",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    gap: "15px",
  },
  logoContainer: {
    marginBottom: "10px",
  },
  logo: {
    width: "100px",
    height: "auto",
  },
  navButton: {
    backgroundColor: "#34495e",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    width: "150px",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "16px",
  },
  logoutButton: {
    marginTop: "auto",
    marginBottom: "20px",
    backgroundColor: "#ffa500",
    color: "#000",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    width: "150px",
    cursor: "pointer",
    fontSize: "16px",
  },
  main: {
    flex: 1,
    padding: "30px",
    backgroundColor: "rgba(224, 187, 118, 0.54)",
    position: "relative",
  },
  userDropdown: {
    position: "relative",
    width: "150px",
  },
  hoverOptions: {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "#3b4a59",
    width: "100%",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    zIndex: 10,
    overflow: "hidden",
  },
  optionButton: {
    backgroundColor: "#3b4a59",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    fontSize: "14px",
    textAlign: "left",
    cursor: "pointer",
    width: "100%",
  },
  chartContainer: {
    marginTop: "30px",
    backgroundColor: "#e6edff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  chartWrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  tooltip: {
    position: "absolute",
    top: "50%",
    left: "100%",
    marginLeft: "10px",
    fontSize: "20px",
    color: "#fff",
    backgroundColor: "#34495e",
    padding: "10px 15px",
    borderRadius: "5px",
    whiteSpace: "nowrap",
    zIndex: 20,
    transform: "translateY(-50%)",
  },
  graphLabel: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#2a2b2f"
  },
};

export default Home;

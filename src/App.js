import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import "react-datepicker/dist/react-datepicker.css";

import Login from "./components/login";
import CreateAcc from "./components/createacc";
import Home from "./components/home";
import About from "./components/about";
import Display from "./components/display";
import AddUser from "./components/user";
import ViewUsers from "./components/viewuser";
import BatchDetailsPage from "./components/batchdetails";
import Requests from "./components/requests";
import Landing from "./components/landing";
import UserManual from "./components/usermanual";  // Import UserManual component

const App = () => {
  const initialUsers = [
    {
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
      name: "Admin",
      status: "approved",
    },
    {
      email: "employee@example.com",
      password: "employee123",
      role: "employee",
      name: "Employee",
      status: "approved",
    },
  ];

  const [users, setUsers] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("users"));
    return stored || initialUsers;
  });

  const [user, setUser] = useState(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    return current || null;
  });

  const [csvData, setCsvData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  const addUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const filterDataByDate = (date) => {
    return csvData.filter((row) => row["Date"] === date);
  };

  const extractBatchNumbers = (filteredData) => {
    const batchNumbers = filteredData.map((row) => row["Batch No."]);
    return [...new Set(batchNumbers)];
  };

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/pd_database.csv`)
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setCsvData(result.data);
            setIsLoading(false);
          },
        });
      });
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const filtered = filterDataByDate(selectedDate);
      setFilteredData(filtered);
      setBatchOptions(extractBatchNumbers(filtered));
    }
  }, [selectedDate, csvData]);

  // ✅ Move LandingWrapper *inside* App to use useNavigate
  const LandingWrapper = () => {
    const navigate = useNavigate();
    const handleProceed = () => {
      navigate("/login");
    };
    return <Landing onProceed={handleProceed} />;
  };

  return (
    <Router>
      <Routes>
        {/* Landing is always the root page */}
        <Route path="/" element={<LandingWrapper />} />
        <Route path="/login" element={<Login setUser={setUser} users={users} />} />
        <Route path="/createacc" element={<CreateAcc addUser={addUser} />} />

        {user ? (
          <>
            <Route path="/home" element={<Home user={user} setUser={setUser} users={users} />} />
            <Route path="/about" element={<About />} />
            <Route path="/display" element={<Display csvData={csvData} />} />
            {user.role === "admin" && (
              <>
                <Route path="/adduser" element={<AddUser addUser={addUser} />} />
                <Route path="/viewuser" element={<ViewUsers users={users} setUsers={setUsers} />} />
                <Route path="/requests" element={<Requests users={users} setUsers={setUsers} />} />
              </>
            )}
            <Route
              path="/batchdetails"
              element={
                isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <BatchDetailsPage
                    csvData={csvData}
                    filteredData={filteredData}
                    batchOptions={batchOptions}
                  />
                )
              }
            />
            <Route path="/usermanual" element={<UserManual />} /> {/* Add the route for user manual */}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;

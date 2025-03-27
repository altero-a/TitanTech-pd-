import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import About from "./components/about";
import Display from "./components/display";
import AddUser from "./components/adduser";
import ViewUsers from "./components/viewuser";
import BatchDetailsPage from "./components/batchdetails";
import { app, auth, database, firestore, storage } from "./firebase"; // Firebase Import
import Papa from "papaparse";
import "react-datepicker/dist/react-datepicker.css";

console.log("Firebase Initialized:", app); // Debugging Firebase initialization

const App = () => {
  const initialUsers = [
    { email: "admin@gmail.com", password: "admin123", role: "admin", name: "Admin" },
    { email: "employee@example.com", password: "employee123", role: "employee", name: "Employee" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [user, setUser] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [socket, setSocket] = useState(null);

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
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

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("WebSocket connected!");
      socket.send("Hello, Server!");
    };

    socket.onmessage = (event) => {
      console.log("Message from server: ", event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed!");
    };

    setSocket(socket);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} users={users} />} />
        {user ? (
          <>
            <Route path="/home" element={<Home user={user} setUser={setUser} users={users} />} />
            <Route path="/about" element={<About />} />
            <Route path="/display" element={<Display csvData={csvData} />} />
            {user.role === "admin" && (
              <>
                <Route path="/adduser" element={<AddUser addUser={addUser} />} />
                <Route path="/viewuser" element={<ViewUsers users={users} setUsers={setUsers} />} />
              </>
            )}
            <Route
              path="/batchdetails"
              element={
                isLoading ? <p>Loading...</p> : <BatchDetailsPage csvData={csvData} filteredData={filteredData} batchOptions={batchOptions} />
              }
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;

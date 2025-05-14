import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState({});
  const navigate = useNavigate();

  // Load approved users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const approvedUsers = storedUsers.filter(user => user.status === "approved");
    setUsers(approvedUsers);
  }, []);

  // Toggle password visibility
  const togglePassword = (email) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [email]: !prevState[email], // Toggle the visibility of the password for the specific user
    }));
  };

  // Delete user from the state and localStorage
  const deleteUser = (email) => {
    if (window.confirm(`Are you sure you want to delete the user with email: ${email}?`)) {
      const updatedUsers = users.filter((user) => user.email !== email);
      setUsers(updatedUsers);  // Remove the user from the state

      // Also remove the user from localStorage
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const filteredAll = allUsers.filter(user => user.email !== email);
      localStorage.setItem("users", JSON.stringify(filteredAll)); // Update localStorage
    }
  };

  // Navigate back to the home page
  const goBack = () => {
    navigate("/home");
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h2 style={styles.title}>View Users</h2>
        {users.length === 0 ? (
          <p style={styles.noUsersMessage}>No approved users available.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>Role</th>
                <th style={styles.tableHeader}>Password</th>
                <th style={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {showPassword[user.email] ? user.password : "*****"}
                    <button onClick={() => togglePassword(user.email)} style={styles.toggleButton}>
                      {showPassword[user.email] ? "Hide" : "Show"}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteUser(user.email)} style={styles.deleteButton}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={goBack} style={styles.backButton}>Back to Home</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: 'url("/bg.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "1200px",
    width: "100%",
    color: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  noUsersMessage: {
    fontSize: "18px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#FFA302",
    padding: "10px",
    textAlign: "center",
  },
  evenRow: {
    backgroundColor: "#f4f4f4",
    color: "black",
  },
  oddRow: {
    backgroundColor: "#ffffff",
    color: "black",
  },
  deleteButton: {
    backgroundColor: "#1F4761",
    border: "none",
    padding: "10px",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "5px",
    margin: "5px",
  },
  toggleButton: {
    backgroundColor: "#FEC619",
    border: "none",
    padding: "5px 10px",
    color: "#000",
    cursor: "pointer",
    borderRadius: "5px",
    marginLeft: "5px",
  },
  backButton: {
    backgroundColor: "#B99A64",
    border: "none",
    padding: "10px 20px",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "20px",
  },
};

export default ViewUser;

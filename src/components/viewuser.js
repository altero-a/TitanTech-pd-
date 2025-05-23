import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewUser = ({ users, setUsers }) => {
  const [showPassword, setShowPassword] = useState({});
  const navigate = useNavigate();

  const togglePassword = (email) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [email]: !prevState[email],
    }));
  };

  const deleteUser = (email) => {
    if (window.confirm(`Are you sure you want to delete the user with email: ${email}?`)) {
      const updatedUsers = users.filter((user) => user.email !== email);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const goBack = () => {
    navigate("/home");
  };

  return (
    <div style={styles.container}>
      <div style={styles.yellowOverlay}></div> {/* Yellow filter over bg image */}
      <div style={styles.overlay}>
        <h2 style={styles.title}>View Users</h2>
        {users && users.filter((user) => user.status === "approved").length === 0 ? (
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
              {users
                .filter((user) => user.status === "approved")
                .map((user, index) => (
                  <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{showPassword[user.email] ? user.password : "*****"}</td>
                    <td>
                      <button onClick={() => deleteUser(user.email)} style={styles.deleteButton}>
                        Delete
                      </button>
                      <button onClick={() => togglePassword(user.email)} style={styles.toggleButton}>
                        {showPassword[user.email] ? "Hide Password" : "Show Password"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        <button onClick={goBack} style={styles.backButton}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    backgroundImage: 'url("/bg.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  yellowOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(224, 187, 118, 0.54)", // Yellow tint
    zIndex: 0,
  },
  overlay: {
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "1200px",
    width: "100%",
    color: "#fff",
    textAlign: "center",
    zIndex: 1, // Ensures content is above yellow overlay
  },
  title: {
    fontSize: "28px",
    color: "#f1c40f",
    marginBottom: "20px",
  },
  noUsersMessage: {
    fontSize: "18px",
    color: "#f1c40f",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#f1c40f",
    color: "#000",
    padding: "10px",
    textAlign: "left",
  },
  evenRow: {
    backgroundColor: "#333",
    color: "#fff",
  },
  oddRow: {
    backgroundColor: "#444",
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    border: "none",
    padding: "10px 20px",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "5px",
    margin: "5px",
    transition: "background-color 0.3s ease",
  },
  toggleButton: {
    backgroundColor: "#f39c12",
    border: "none",
    padding: "10px 20px",
    color: "#000",
    cursor: "pointer",
    borderRadius: "5px",
    margin: "5px",
    transition: "background-color 0.3s ease",
  },
  backButton: {
    backgroundColor: "#ffa500",
    border: "none",
    padding: "10px 20px",
    color: "#000",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "20px",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
};

export default ViewUser;

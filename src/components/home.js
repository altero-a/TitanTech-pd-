import React, { useState } from "react";  // Import useState
import { useNavigate } from "react-router-dom";

const Home = ({ user, setUser, users }) => {  // Use `users` instead of `employees` here
  const navigate = useNavigate();
  const [showUserList, setShowUserList] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const handleViewUsers = () => {
    setShowUserList(!showUserList); // Toggle the visibility of the user list
    navigate("/viewuser");  // Navigate to ViewUser page
  };

  return (
    <div style={styles.homePage}>
      <div style={styles.logoContainer}>
        <img src="/logoti.jpg" alt="TitanTech Logo" style={styles.logo} />
      </div>
      <h1 style={styles.title}>Welcome, {user.role.toUpperCase()}!</h1>
      <div style={styles.buttonsContainer}>
        <button onClick={() => navigate("/about")} style={styles.button}>About</button>
        <button onClick={() => navigate("/display")} style={styles.button}>Display</button>
        {user.role === "admin" && (
          <>
            <button onClick={() => navigate("/adduser")} style={styles.button}>Add User</button>
            <button onClick={handleViewUsers} style={styles.button}>View Users</button>
          </>
        )}
        <logbutton onClick={handleLogout} style={styles.logbutton}>Logout</logbutton>
      </div>

      {/* Only show user list if it's not empty and user is an admin */}
      {showUserList && user.role === "admin" && users && users.length > 0 && (
        <div style={styles.userList}>
          <h3>Authorized Users:</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableTh}>Name</th>
                <th style={styles.tableTh}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td style={styles.tableTd}>{user.name}</td>
                  <td style={styles.tableTd}>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show message if there are no users */}
      {showUserList && user.role === "admin" && (!users || users.length === 0) && (
        <p style={styles.noUsersMessage}>No users available.</p>
      )}
    </div>
  );
};

const styles = {
  homePage: {
    backgroundImage: 'url("/bg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    position: 'relative',
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
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    backgroundColor: '#b99a64',
    border: 'none',
    padding: '15px 20px',
    fontSize: '23px',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '5px',
    textAlign: 'center',
  },
  logbutton: {
    backgroundColor: '#1f4761',
    border: 'none',
    padding: '15px 20px',
    fontSize: '23px',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '5px',
    textAlign: 'center',
  },
};

export default Home;

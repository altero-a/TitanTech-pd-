import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(loggedIn);

    if (loggedIn?.role === "admin" && loggedIn?.status === "approved") {
      const pendingRequests = JSON.parse(localStorage.getItem("accountRequests")) || [];
      setRequests(pendingRequests);
    }
  }, []);

  const handleRoleSelection = (email, role) => {
    const accountRequests = JSON.parse(localStorage.getItem("accountRequests")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const approvedUser = accountRequests.find(request => request.email === email);
    if (!approvedUser) return;

    const updatedUser = { ...approvedUser, status: "approved", role };

    const updatedUsers = [
      ...users.filter(user => user.email !== email),
      updatedUser
    ];

    const updatedRequests = accountRequests.filter(request => request.email !== email);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("accountRequests", JSON.stringify(updatedRequests));

    setRequests(updatedRequests);
  };

  const handleDecline = (email) => {
    const accountRequests = JSON.parse(localStorage.getItem("accountRequests")) || [];
    const updatedRequests = accountRequests.filter(request => request.email !== email);
    localStorage.setItem("accountRequests", JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
  };

  if (!currentUser || currentUser.role !== "admin" || currentUser.status !== "approved") {
    return <p>Access Denied. Only approved admins can view this page.</p>;
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.logoContainer}>
        <img src="/logoti.jpg" alt="TitanTech Logo" style={styles.logo} />
      </div>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Pending Requests</h2>
          {requests.length > 0 ? (
            <ul>
              {requests.map((req, index) => (
                <li key={index} style={styles.listItem}>
                  <strong style={styles.textWhite}>Name:</strong> <span style={styles.textWhite}>{req.name}</span> <br />
                  <strong style={styles.textWhite}>Email:</strong> <span style={styles.textWhite}>{req.email}</span> <br />
                  <strong style={styles.textWhite}>Role:</strong> <span style={styles.textWhite}>{req.role}</span> <br />
                  <div style={{ display: "inline-block" }}>
                    <button
                      onClick={() => handleRoleSelection(req.email, "employee")}
                      style={styles.button}
                    >
                      Approve as Employee
                    </button>
                    <button
                      onClick={() => handleRoleSelection(req.email, "admin")}
                      style={styles.button}
                    >
                      Approve as Admin
                    </button>
                    <button
                      onClick={() => handleDecline(req.email)}
                      style={styles.buttonDecline}
                    >
                      Decline
                    </button>
                  </div>
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.noRequestsText}>No pending requests</p>
          )}
          <div style={styles.centeredButtonContainer}>
            <button onClick={() => navigate("/home")} style={styles.backButton}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundImage: 'url("/bg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
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
  overlay: {
    backgroundColor: "rgba(224, 187, 118, 0.54)",
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    textAlign: 'center',
    padding: '30px',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.83)',
    maxWidth: '600px',
    width: '80%',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '20px',
  },
  textWhite: {
    color: 'white',
  },
  listItem: {
    marginBottom: '20px',
  },
  button: {
    backgroundColor: "#fec619",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#000",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "10px",
    transition: "background-color 0.3s",
  },
  buttonDecline: {
    backgroundColor: "#e74c3c",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
  backButton: {
    backgroundColor: "#fec619",
    color: "#000",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  centeredButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  noRequestsText: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '20px',
  },
};

export default Requests;

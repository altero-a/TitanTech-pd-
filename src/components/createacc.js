import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAcc = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    const newUser = {
      name: user,
      email,
      password,
      role,
      status: "pending",
    };

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const accountRequests = JSON.parse(localStorage.getItem("accountRequests")) || [];

    const existsInUsers = storedUsers.some((u) => u.email.toLowerCase() === email.toLowerCase());
    const existsInRequests = accountRequests.some((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existsInUsers) {
      setMessage("Email already exists in the system.");
      return;
    }
    if (existsInRequests) {
      setMessage("Email is already pending approval.");
      return;
    }

    accountRequests.push(newUser);
    localStorage.setItem("accountRequests", JSON.stringify(accountRequests));

    setMessage("Account request submitted! Wait for admin approval.");
    setUser("");
    setEmail("");
    setPassword("");
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.logoContainer}>
        <img src="/logoti.jpg" alt="TitanTech Logo" style={styles.logo} />
      </div>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Request Account</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Submit Request</button>
            {message && <p style={styles.message}>{message}</p>}
            <p style={styles.backLink} onClick={() => navigate("/")}>Back to Login</p>
          </form>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
  form: {
    display: 'flex',
    flexDirection: 'column',  // Makes the form elements stack vertically
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',  // Ensure inputs take full width of their container
    maxWidth: '300px',  // Optional: limits input width for better design
  },
  button: {
    padding: '10px',
    fontSize: '18px',
    backgroundColor: '#fec619',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',  // Makes the button take full width
    maxWidth: '300px',  // Optional: limits button width for better design
  },
  message: {
    marginTop: '15px',
    fontSize: '14px',
    color: 'green',
  },
  backLink: {
    marginTop: '10px',
    textDecoration: 'underline',
    color: '#007bff',
    cursor: 'pointer',
  },
};

export default CreateAcc;

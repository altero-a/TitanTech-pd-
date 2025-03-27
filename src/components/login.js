import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

=======
>>>>>>> 084fec8f9bdaff8d785ac977c90ea0d1e33491b3

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
<<<<<<< HEAD
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const defaultUsers = [
    { user: "Admin", email: "admin@gmail.com", password: "admin123", role: "admin" },
    { user: "Employee", email: "employee@gmail.com", password: "employee123", role: "employee" },
  ];

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Ensure default users are always in the list
    const updatedUsers = [
      ...defaultUsers,
      ...storedUsers.filter(user => !defaultUsers.some(d => d.email === user.email))
    ];

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    const user = users.find(
      (user) => user.email.toLowerCase() === trimmedEmail && user.password === trimmedPassword
=======

  const inputStyle = {
    padding: '10px',
    width: '80%',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
  };

  // Predefined list of users (for demo purposes)
  const users = [
    { email: "admin@gmail.com", password: "admin123", role: "admin" },
    { email: "employee@gmail.com", password: "employee123", role: "employee" },
  ];

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();  // Prevents the default form submission
    const user = users.find(
      (user) => user.email === email && user.password === password
>>>>>>> 084fec8f9bdaff8d785ac977c90ea0d1e33491b3
    );

    if (user) {
      setUser(user);
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.loginPage}>
<<<<<<< HEAD
      <div style={styles.logoContainer}>
        <img
          src="/logoti.jpg"
          alt="Titan Tech Logo"
          style={styles.logo}
          onError={(e) => (e.target.style.display = "none")}
=======
      {/* Logo container */}
      <div style={styles.logoContainer}>
        <img 
          src="${process.env.PUBLIC_URL}/titantechlogo.png"  // Ensure the image is in the 'public' folder
          alt="Logo"
          style={styles.logo}
          onError={() => console.error("Logo not found or failed to load. Check the image path.")}
>>>>>>> 084fec8f9bdaff8d785ac977c90ea0d1e33491b3
        />
      </div>

      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
<<<<<<< HEAD
        <div style={styles.inputContainer}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <div style={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <span 
              style={styles.eyeIcon} 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
=======
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
>>>>>>> 084fec8f9bdaff8d785ac977c90ea0d1e33491b3
        </div>
        {error && <p style={styles.errorText}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  loginPage: {
<<<<<<< HEAD
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${process.env.PUBLIC_URL}/bg.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
    position: "relative",
  },
  logoContainer: {
    position: "absolute",
    top: "10px",
    left: "10px",
    zIndex: 10,
  },
  logo: {
    width: "75px",
    height: "auto",
  },
  title: {
    fontSize: "40px",
    marginBottom: "20px",
  },
  form: {
    backgroundColor: "#182933",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  inputContainer: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    textAlign: "left",
    fontSize: "25px",
  },
  passwordWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "100%", 
  },
  input: {
    padding: "10px",
    width: "100%",
    margin: "5px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "20px",
    boxSizing: "border-box", 
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    color: "#777",
    fontSize: "18px",
  },
  button: {
    backgroundColor: "#fec619",
    border: "none",
    padding: "10px 20px",
    fontSize: "20px",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "5px",
    textAlign: "center",
    width: "100%",
    transition: "background-color 0.3s",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
=======
    backgroundImage: 'url("${process.env.PUBLIC_URL}/bg.jpg")',  // Background image for login page
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
    width: '100px',  // Adjust the size of the logo
    height: 'auto',
  },
  title: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  form: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Semi-transparent background for the form
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  button: {
    backgroundColor: '#007BFF',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '5px',
    textAlign: 'center',
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
>>>>>>> 084fec8f9bdaff8d785ac977c90ea0d1e33491b3
  },
};

export default Login;
<<<<<<< HEAD

=======
>>>>>>> 084fec8f9bdaff8d785ac977c90ea0d1e33491b3

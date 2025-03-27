import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      <div style={styles.logoContainer}>
        <img
          src="/logoti.jpg"
          alt="Titan Tech Logo"
          style={styles.logo}
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>

      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
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
        </div>
        {error && <p style={styles.errorText}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  loginPage: {
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
  },
};

export default Login;


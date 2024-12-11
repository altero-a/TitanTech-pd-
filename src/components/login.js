import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      {/* Logo container */}
      <div style={styles.logoContainer}>
        <img 
          src="${process.env.PUBLIC_URL}/titantechlogo.png"  // Ensure the image is in the 'public' folder
          alt="Logo"
          style={styles.logo}
          onError={() => console.error("Logo not found or failed to load. Check the image path.")}
        />
      </div>

      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
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
        </div>
        {error && <p style={styles.errorText}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  loginPage: {
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
  },
};

export default Login;

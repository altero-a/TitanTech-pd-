import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div style={styles.aboutPage}>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <h2 style={styles.heading}>About Us</h2>
          <p style={styles.description}>
            Welcome to our platform! Here, you can manage users, view data, and explore various features that enhance productivity and user management.
          </p>
          <button onClick={handleBack} style={styles.button}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  aboutPage: {
    backgroundImage: 'url("/bg.jpg")',  // Ensure bg.jpg is in your public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Semi-transparent overlay for better text contrast
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Ensure content stands out
    maxWidth: '600px',
    width: '80%',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    animation: 'fadeIn 1.5s ease-in-out', // Fade-in effect
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    color: '#ddd',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3',
      transform: 'scale(1.05)', // Hover effect with slight scaling
    },
  },
};

export default About;

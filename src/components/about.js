import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div style={styles.aboutPage}>
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
  );
};

const styles = {
  aboutPage: {
    backgroundImage: 'url("/bg.jpg")', // Set your background image here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for better text readability
    padding: '30px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '600px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    animation: 'fadeIn 1.5s ease-in-out', // Add fade-in animation
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

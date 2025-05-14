import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div style={styles.aboutPage}>
      <div style={styles.logoContainer}>
        <img src="/logoti.jpg" alt="TitanTech Logo" style={styles.logo} />
      </div>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <h2 style={styles.heading}>About the Device</h2>
          <p style={styles.description}>
            Our app and device work together to provide seamless integration for efficient management. The device collects and processes data, while the app allows users to easily interact with and visualize the information. This system is designed to improve overall productivity and streamline workflows.
          </p>
          
          {/* Cautionary Notice Overlay */}
          <div style={styles.cautionOverlay}>
            <h2 style={styles.heading}>Cautionary Notice</h2>
            <p style={styles.cautionText}>
              Please note that the device is sensitive to environmental conditions such as dust, temperature fluctuations, and power instability. Exposure to such factors may result in damage or malfunction. Additionally, the camera’s results may not be entirely accurate due to lighting conditions in the surrounding environment.
            </p>
            <p style={styles.cautionText}>
              Regular maintenance is essential to ensure the device functions optimally. We recommend cleaning the device regularly to avoid dust buildup. If a malfunction or damage to any component occurs, please contact the team immediately so that we can assist with repairs and maintenance.
            </p>
          </div>

          <h3 style={styles.teamHeading}>Meet the Team</h3>
          <div style={styles.teamContainer}>
            <div style={styles.teamMember}>
              <img src="/ALEX.jpg" alt="ALEX" style={styles.teamImage} />
              <h4 style={styles.teamName}>Alexia A. Altero</h4>
              <p style={styles.teamRole}>4th Year Student, Technological Institute of the Philippines</p>
              <p style={styles.teamContact}>
                Email: <span style={styles.contactText}>qaaltero@tip.edu.ph</span><br />
                LinkedIn: <a href="https://www.linkedin.com/in/alexia-altero" style={styles.link} target="_blank" rel="noopener noreferrer">Alexia Altero</a><br />
                GitHub: <a href="https://github.com/altero-a" style={styles.link} target="_blank" rel="noopener noreferrer">https://github.com/altero-a</a>
              </p>
            </div>
            <div style={styles.teamMember}>
              <img src="/LANDO.jpg" alt="Lando" style={styles.teamImage} />
              <h4 style={styles.teamName}>Rolando F. Celeste</h4>
              <p style={styles.teamRole}>4th Year Student, Technological Institute of the Philippines</p>
              <p style={styles.teamContact}>
                Email: <span style={styles.contactText}>celeste.landon667@gmail.com</span><br />
                LinkedIn: <a href="https://www.linkedin.com/in/rolly-celeste-6202aa362/" style={styles.link} target="_blank" rel="noopener noreferrer">Rolando Celeste</a><br />
                GitHub: <a href="https://github.com/Rorando111" style={styles.link} target="_blank" rel="noopener noreferrer">https://github.com/Rorando111</a>
              </p>
            </div>
            <div style={styles.teamMember}>
              <img src="/paya.jpg" alt="Paya" style={styles.teamImage} />
              <h4 style={styles.teamName}>Jomarie A. Dupaya</h4>
              <p style={styles.teamRole}>4th Year Student, Technological Institute of the Philippines</p>
              <p style={styles.teamContact}>
                Email: <span style={styles.contactText}>dupayajomarie@gmail.com</span><br />
                LinkedIn: <a href="https://www.linkedin.com/in/jomariedupaya" style={styles.link} target="_blank" rel="noopener noreferrer">Jomarie Dupaya</a><br />
                GitHub: <a href="https://github.com/JomDupaya" style={styles.link} target="_blank" rel="noopener noreferrer">https://github.com/JomDupaya</a>
              </p>
            </div>
          </div>
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
    backgroundColor: 'rgba(0, 0, 0, 0.86)',
    maxWidth: '800px',
    width: '80%',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    animation: 'fadeIn 1.5s ease-in-out',
  },
  heading: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    color: '#ddd',
    marginBottom: '30px',
  },
  cautionOverlay: {
    backgroundColor: 'rgba(255, 166, 0, 0.42)', // Semi-transparent orange background
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  cautionText: {
    color: 'white', // Changed text color to black for cautionary notice
    fontSize: '16px', // Adjust font size for readability
    marginBottom: '15px',
  },
  teamHeading: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#fff',
    marginTop: '30px',
  },
  teamContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '20px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  teamMember: {
    textAlign: 'center',
    color: '#fff',
    width: '180px',
  },
  teamImage: {
    width: '80px',  // Reduced size of images
    height: '80px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  teamName: {
    fontSize: '15px',  // Adjusted font size for name
    fontWeight: 'bold',
  },
  teamRole: {
    fontSize: '12px',  // Adjusted font size for role
    marginBottom: '10px',
  },
  teamContact: {
    fontSize: '12px',  // Adjusted font size for contact info
  },
  contactText: {
    fontWeight: 'normal',
    color: '#fff',
  },
  link: {
    color: '#ffa500',
    textDecoration: 'none',
  },
  button: {
    backgroundColor: '#ffa500',
    color: '#000',
    padding: '12px 24px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
};

export default About;

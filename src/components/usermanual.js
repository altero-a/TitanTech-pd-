import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Usermanual = () => {
  const [showLogo, setShowLogo] = useState(true);
  const navigate = useNavigate();

  // Handle scroll event to hide or show logo
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowLogo(false); // Hide logo when scrolled down
      } else {
        setShowLogo(true); // Show logo when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={styles.aboutPage}>
      <img
        src="/logoti.jpg"
        alt="Logo"
        style={{
          ...styles.logo,
          top: showLogo ? "20px" : "-100px", // Moves the logo out of view when scrolled
        }}
      />
      <div style={styles.overlay}>
        <div style={styles.container}>
          <h1 style={styles.heading}>User Manual</h1>

          <div style={styles.stepsRow}>
            {/* Step 1 */}
            <div style={styles.step}>
              <div style={styles.imagesRow}>
                <img src="/rebar.JPG" alt="Rebar Placement" style={styles.image} />
                <img src="/device1.JPG" alt="Device" style={styles.image} />
              </div>
              <p style={styles.description}>
                <strong>Step 1:</strong> Place the rebar on the device and follow the instructions
                displayed on the LCD display by pressing the corresponding buttons
                to let the device get the measurements.
              </p>
            </div>

            {/* Step 2 */}
            <div style={styles.step}>
              <div style={styles.imagesRow}>
                <img src="/press.JPG" alt="Press to Upload" style={styles.image} />
              </div>
              <p style={styles.description}>
                <strong>Step 2:</strong> After viewing the summary report on the LCD,
                press the 3rd button as instructed to upload the data to the Web application.
              </p>
            </div>

            {/* Step 3 */}
            <div style={styles.step}>
              <div style={styles.imagesRow}>
                <img
                  src="/webapp.png"
                  alt="Web Application"
                  style={{ ...styles.image, ...styles.webappImage }}
                />
              </div>
              <p style={styles.description}>
                <strong>Step 3:</strong> Access the web application with your authenticated user credentials.
                Go to the "Display" section and choose the date and batch of data to view.
              </p>
            </div>

            {/* Step 4 */}
            <div style={styles.step}>
              <div style={styles.imagesRow}>
                <img src="/print.JPG" alt="Print" style={styles.image} />
                <img src="/paper.JPG" alt="Printed Output" style={styles.image} />
              </div>
              <p style={styles.description}>
                <strong>Step 4:</strong> You can save the table as a PDF or print it if connected to a printer. (Optional)
              </p>
            </div>
          </div>

          <button style={styles.button} onClick={() => navigate("/home")}>
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
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    overflow: "auto", // Allow scrolling
  },
  logo: {
    position: "fixed",
    left: "20px",
    width: "100px",
    height: "auto",
    zIndex: 1,
    transition: "top 0.3s ease", // Smooth transition for moving the logo
  },
  overlay: {
    backgroundColor: "rgba(224, 187, 118, 0.54)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    overflowY: "auto", // Enable vertical scrolling in overlay
  },
  container: {
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.86)",
    width: "95%",
    maxWidth: "1400px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
    overflowY: "auto", // Enable vertical scrolling in container if needed
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "30px",
  },
  stepsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
    marginBottom: "30px",
    overflowX: "auto",
  },
  step: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "8px",
    padding: "15px",
    width: "250px",
    flexShrink: 0,
    textAlign: "center",
  },
  imagesRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  image: {
    width: "100px",
    height: "auto",
    borderRadius: "5px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
  },
  webappImage: {
    width: "180px",
  },
  description: {
    fontSize: "18px",
    color: "#ddd",
    marginTop: "10px",
  },
  button: {
    backgroundColor: "#e29f5b",
    color: "#000",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  // Responsive Design - Mobile View
  '@media (max-width: 768px)': {
    heading: {
      fontSize: "24px", // Adjust font size for mobile
    },
    stepsRow: {
      flexDirection: "column", // Stack steps vertically on mobile
      gap: "15px",
    },
    step: {
      width: "90%", // Make each step take more space on mobile
      margin: "0 auto", // Center the steps on mobile
    },
    button: {
      width: "100%", // Button will take full width on mobile
    },
    logo: {
      width: "80px", // Adjust logo size for smaller screens
    },
  },
};

export default Usermanual;

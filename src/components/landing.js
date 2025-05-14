import React, { useState } from "react";

const Landing = ({ onProceed }) => {
  const [neverShowAgain, setNeverShowAgain] = useState(false);

  const handleProceedClick = () => {
    onProceed(neverShowAgain);
  };

  return (
    <div
      style={{
        backgroundColor: "#343639",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        fontFamily: "sans-serif",
        position: "relative",
        flexDirection: "column",
        minHeight: "91.5vh",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div style={{ flex: 1 }}>
          {/* Logo */}
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="./logoti.jpg" // Replace with actual logo path
              alt="Logo"
              style={{
                height: "60px",
                width: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            />
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "2.5rem",
              color: "#fff",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Measuring made easier
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "1rem",
              color: "#d1d5db",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Presenting you the device that can save time, it will automatically measure the necessary measurement that will classify if the rebar passed or failed the standard for usage,
            with easier saving and printing the gathered data at your disposal.
          </p>

          {/* Checkbox */}
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                color: "#fff",
              }}
            >
              <input
                type="checkbox"
                checked={neverShowAgain}
                onChange={() => setNeverShowAgain(!neverShowAgain)}
              />
              Never show again
            </label>
          </div>

          {/* Button */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleProceedClick}
              style={{
                padding: "12px 24px",
                backgroundColor: "#ffa500",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Proceed to Login
            </button>
          </div>
        </div>

        {/* Image */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src="./bg.jpg" // Replace with actual image path
            alt="Landing"
            style={{
              maxWidth: "100%",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      </div>

      {/* Top Yellow Overlay */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          backgroundColor: "#f1c40f",
          height: "100px",
          width: "100%",
        }}
      />

      {/* Bottom Yellow Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundColor: "#f1c40f",
          height: "100px",
          width: "100%",
        }}
      />
    </div>
  );
};

export default Landing;

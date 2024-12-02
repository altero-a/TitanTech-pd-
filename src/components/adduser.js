import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = ({ addUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleAddUser = () => {
    if (!name || !email || !password) {
      setSuccessMessage("All fields are required!");
      return;
    }

    const newUser = { name, email, password, role };
    addUser(newUser);
    setSuccessMessage("User added successfully!");
    setTimeout(() => navigate("/home"), 2000); // Redirect after 2 seconds
  };

  return (
    <div style={styles.addUserPage}>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <h2 style={styles.title}>Add New User</h2>
          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                placeholder="Enter name"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="Enter email"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="Enter password"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={styles.select}
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div style={styles.buttonContainer}>
              <button type="button" onClick={handleAddUser} style={styles.button}>
                Add User
              </button>
              <button
                type="button"
                onClick={() => navigate("/home")}
                style={styles.backButton}
              >
                Back to Home
              </button>
            </div>
          </form>

          {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

const styles = {
  addUserPage: {
    backgroundImage: 'url("/bg.jpg")', // Background image
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay to improve text contrast
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background for the form
    padding: '30px',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
    animation: 'fadeIn 1.5s ease-in-out',
  },
  title: {
    fontSize: '36px',
    color: '#FFA500',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    textAlign: 'left',
  },
  label: {
    fontSize: '16px',
    color: '#fff',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#2c2c2c',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  select: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    backgroundColor: '#2c2c2c',
    color: '#fff',
    border: '1px solid #ccc',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    flex: 1,
    backgroundColor: '#FFA500',
    color: '#fff',
    padding: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#555',
    color: '#fff',
    padding: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  successMessage: {
    marginTop: '20px',
    color: '#32CD32',
    fontSize: '18px',
  },
};

export default AddUser;

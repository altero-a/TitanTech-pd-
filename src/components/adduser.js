import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = ({ addUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [generatePassword, setGeneratePassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const generateTempPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    return Array.from({ length: 10 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  };

  const handleCheckboxChange = () => {
    setGeneratePassword(!generatePassword);
    setPassword(!generatePassword ? generateTempPassword() : "");
  };

  const handleAddUser = () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!name || !email || !password) {
      setErrorMessage("All fields are required!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Invalid email format!");
      return;
    }

    const newUser = { name, email, password, role };

    // Get existing users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    if (storedUsers.some((user) => user.email === email)) {
      setErrorMessage("Email already registered!");
      return;
    }

    // Add new user to localStorage
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setSuccessMessage("User added successfully!");
    setTimeout(() => navigate("/home"), 2000);

    setName("");
    setEmail("");
    setPassword("");
    setGeneratePassword(false);
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
                disabled={generatePassword}
              />
            </div>

            <div style={styles.checkboxGroup}>
              <input
                type="checkbox"
                checked={generatePassword}
                onChange={handleCheckboxChange}
              />
              <label style={styles.checkboxLabel}>
                Generate a temporary password
              </label>
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

            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            {successMessage && <p style={styles.successMessage}>{successMessage}</p>}

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
        </div>
      </div>
    </div>
  );
};

const styles = {
  addUserPage: {
    backgroundImage: 'url("/bg.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    position: "relative",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
    animation: "fadeIn 1.5s ease-in-out",
  },
  title: {
    fontSize: "36px",
    color: "#FFA500",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    fontSize: "23px",
    color: "#fff",
    marginBottom: "8px",
  },
  input: {
    width: "90%",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#F4EFE6",
    color: "#000",
    fontSize: "20px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  select: {
    width: "95%",
    padding: "12px",
    fontSize: "18px",
    borderRadius: "5px",
    backgroundColor: "#F4EFE6",
    color: "#000",
    border: "1px solid #ccc",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  button: {
    flex: 1,
    backgroundColor: "#FFA500",
    color: "#000",
    padding: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "20px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  backButton: {
    flex: 1,
    backgroundColor: "#555",
    color: "#fff",
    padding: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  successMessage: {
    marginTop: "20px",
    color: "#32CD32",
    fontSize: "18px",
  },
  errorMessage: {
    marginTop: "20px",
    color: "#FF6347",
    fontSize: "18px",
  },
  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
    color: "#fff",
  },
  checkboxLabel: {
    fontSize: "18px",
  },
};

export default AddUser;

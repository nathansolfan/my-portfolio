import React, { useState } from "react";
import axios from "axios";
import "../Styles/Register.css"; // Import your CSS file for styling

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth.php", {
        action: "register",
        username,
        password,
      });

      if (response.data.message) {
        setMessage(response.data.message);
        setError("");
      } else {
        setError(response.data.error || "Registration failed");
        setMessage("");
      }
    } catch (error) {
      setError("Failed", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

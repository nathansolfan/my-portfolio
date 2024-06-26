import React, { useState } from "react";
import axios from "axios";
import "../Styles/Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth.php", {
        action: "register",
        email,
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
      setMessage("");
    }
  };

  return (
    <div className="register-container">
      <h2>Register Today!</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

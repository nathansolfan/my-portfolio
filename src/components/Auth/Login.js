import axios from "axios";
import React, { useState } from "react";
import "../Styles/Register.css"; // Use the same CSS as Register for simplicity

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth.php", {
        action: "login",
        email,
        password,
      });

      if (response.data.token) {
        setMessage("Login successful!");
        setError("");
        localStorage.setItem("token", response.data.token);
      } else {
        setError(response.data.error || "Login failed");
        setMessage("");
      }
    } catch (error) {
      setError("Failed to login");
      setMessage("");
    }
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

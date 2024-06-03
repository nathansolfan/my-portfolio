import React, { useState } from "react";
import axios from "axios";

export default function Auth({ onAuthSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async (action) => {
    try {
      const response = await axios.post("http://localhost:8080/auth.php", {
        username,
        password,
        action,
      });
      if (response.data.token) {
        onAuthSuccess(response.data.token);
      } else {
        setError(response.data.error || "Unknown error");
      }
    } catch (err) {
      setError("Failed to authenticate");
    }
  };

  return (
    <div>
      <h2>Login / Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleAuth("register")}>Register</button>
      <button onClick={() => handleAuth("login")}>Login</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

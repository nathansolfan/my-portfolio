import React, { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/ath.php", {
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

  return <div></div>;
}

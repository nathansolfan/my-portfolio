import React, { useState } from "react";
import axios from "axios";
import "../Styles/Register.css"; // Import your CSS file for styling

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  return <div>Register</div>;
}

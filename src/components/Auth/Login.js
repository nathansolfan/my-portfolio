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
      })

    } catch () {}

    
  };

  return <div>
    
  </div>;
}

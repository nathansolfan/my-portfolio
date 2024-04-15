import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailInput() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/edit-booking?email=${encodeURIComponent(email)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email to find booking"
        required
      />
      <button type="submit">Find Booking</button>
    </form>
  );
}

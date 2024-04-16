import React, { useState } from "react";
import BookingChange from "../molecule/BookingChange"; // Ensure correct import

export default function EmailInput() {
  const [email, setEmail] = useState("");
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookingDetails = (email) => {
    setLoading(true);
    const backendUrl = "http://localhost:8000/index.php";
    const queryParams = `?email=${encodeURIComponent(email)}`;

    fetch(backendUrl + queryParams)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json();
      })
      .then((data) => {
        setBookingDetails(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load booking");
        setLoading(false);
      });
  };

  const handleUpdate = (updatedBooking) => {
    const backendUrl = "http://localhost:8000/index.php";
    fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBooking),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(() => alert("Booking updated successfully"))
      .catch((error) => console.error("Error updating booking:", error));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchBookingDetails(email);
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email to find booking"
          required
        />
        <button type="submit">Find Booking</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading &&
        !error &&
        bookingDetails.map((booking) => (
          <BookingChange
            key={booking.id}
            booking={booking}
            onUpdate={handleUpdate}
          />
        ))}
    </div>
  );
}

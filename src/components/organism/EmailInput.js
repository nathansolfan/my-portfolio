import React, { useState } from "react";

export default function EmailInput() {
  const [email, setEmail] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null); // Initially null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookingDetails = (email) => {
    setLoading(true);
    setError(null);
    const backendUrl = "http://localhost:8000/index.php";
    const queryParams = `?email=${encodeURIComponent(email)}`;

    fetch(backendUrl + queryParams)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        // Ensure data is an array
        setBookingDetails(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load booking", error);
        setError("Failed to load booking");
        setLoading(false);
        setBookingDetails([]); // Ensure it's always an array
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBookingDetails(email);
  };

  return (
    <div>
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

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && bookingDetails && bookingDetails.length > 0 && (
        <div>
          <h3>Booking Details:</h3>
          {bookingDetails.map((booking) => (
            <div key={booking.id}>
              <p>ID: {booking.id}</p>
              <p>Name: {booking.name}</p>
              <p>Phone: {booking.phone}</p>
              <p>Message: {booking.comments}</p>
            </div>
          ))}
        </div>
      )}
      {!loading && !error && bookingDetails && bookingDetails.length === 0 && (
        <div>No booking details found.</div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function EditBooking() {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (email) {
      setLoading(true);
      fetch(
        `http://localhost:8000/index.php?email=${encodeURIComponent(email)}`
      )
        .then((response) => response.json())
        .then((data) => {
          setBookingData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError(error.toString());
          setLoading(false);
        });
    }
  }, [email]);
  if (loading) return <div>Loading booking information...</div>;
  if (error) return <div>Error loading booking: {error}</div>;
  if (!bookingData) return <div>No booking data available.</div>;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/index.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => alert("Booking updated successfully"))
      .catch((error) => console.error("Error updating booking:", error));
  };

  if (loading) return <div>Loading booking information...</div>;
  if (error) return <div>Error loading booking: {error}</div>;
  if (!bookingData) return <div>No booking data available.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Booking</h2>
      <input
        type="text"
        name="date"
        value={bookingData.date || ""}
        onChange={handleChange}
        placeholder="Date"
      />
      <input
        type="text"
        name="time"
        value={bookingData.time || ""}
        onChange={handleChange}
        placeholder="Time"
      />
      {/* Add inputs for other fields such as name, email, phone, etc., similar to above */}
      <button type="submit">Update Booking</button>
    </form>
  );
}

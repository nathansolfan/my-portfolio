import React, { useState } from "react";
import Calendar from "./Calendar"; // Ensure this component is correctly imported and set up

export default function EmailInput() {
  const [email, setEmail] = useState("");
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const timeSlots = ["Morning", "Afternoon", "Evening", "Night"];

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
        setBookingDetails(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load booking", error);
        setError("Failed to load booking");
        setLoading(false);
        setBookingDetails([]);
      });
  };

  const handleChange = (index, field, value) => {
    const updatedBookings = [...bookingDetails];
    updatedBookings[index][field] = value;
    setBookingDetails(updatedBookings);
  };

  const handleUpdate = (booking) => {
    const backendUrl = "http://localhost:8000/index.php";
    fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((response) => response.json())
      .then(() => alert("Booking updated successfully"))
      .catch((error) => console.error("Error updating booking:", error));
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
      {!loading &&
        !error &&
        bookingDetails.map((booking, index) => (
          <div key={booking.id}>
            <h3>Booking Details:</h3>
            <input
              type="text"
              value={booking.date}
              readOnly // Make it read-only as we will use a Calendar component
              onClick={() => setCalendarVisible(!calendarVisible)} // Toggle calendar visibility
              placeholder="Select Date"
            />
            {calendarVisible && (
              <Calendar
                selectedDate={new Date(booking.date)}
                onDateSelect={(date) => {
                  handleChange(index, "date", date.toISOString().slice(0, 10));
                  setCalendarVisible(false);
                }}
              />
            )}
            <select
              value={booking.time}
              onChange={(e) => handleChange(index, "time", e.target.value)}
              placeholder="Time Slot"
            >
              {timeSlots.map((time, idx) => (
                <option key={idx} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={booking.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="Name"
            />
            <input
              type="email"
              value={booking.email}
              onChange={(e) => handleChange(index, "email", e.target.value)}
              placeholder="Email"
            />
            <input
              type="tel"
              value={booking.phone}
              onChange={(e) => handleChange(index, "phone", e.target.value)}
              placeholder="Phone"
            />
            <textarea
              value={booking.comments}
              onChange={(e) => handleChange(index, "comments", e.target.value)}
              placeholder="Comments"
            />
            <button onClick={() => handleUpdate(booking)}>
              Update Booking
            </button>
          </div>
        ))}
      {bookingDetails.length === 0 && <div>No booking details found.</div>}
    </div>
  );
}

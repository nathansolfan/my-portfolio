import React, { useState } from "react";
import DateSelector from "../molecule/DateSelector";

export default function EmailInput() {
  const [email, setEmail] = useState("");
  const [bookingDetails, setBookingDetails] = useState([]);
  const [selectedTime, setSeletecTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(null); // To know which booking's date to update

  const timeSlots = ["Morning", "Afternoon", "Evening", "Night"]; // Defined time slots

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
        setBookingDetails([]); // Ensure it's always an array
      });
  };

  const handleChange = (index, field, value) => {
    const updatedBookings = [...bookingDetails];
    updatedBookings[index][field] = value;
    setBookingDetails(updatedBookings);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBookingDetails(email);
  };

  const handleDateClick = (day) => {
    handleChange(selectedDateIndex, "date", day.toISOString().slice(0, 10)); // Update the date
    setCalendarVisible(false); // Close the calendar after selecting a date
  };
  const handleUpdate = (booking) => {
    const backendUrl = "http://localhost:8000/index.php";
    fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((response) => response.json())
      .then((data) => alert("Booking updated successfully"))
      .catch((error) => console.error("Error updating booking:", error));
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
              readOnly
              onClick={() => {
                setSelectedDateIndex(index); // Set the index of the date we're editing
                setCalendarVisible(true); // Open the calendar
              }}
              placeholder="Select Date"
            />
            {calendarVisible && selectedDateIndex === index && (
              <DateSelector onSelectDate={handleDateClick} />
            )}
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                className={`time-slot ${
                  selectedTime === slot ? "selected-time" : ""
                }`}
                onClick={() => setSeletecTime(slot)}
              >
                {slot}
              </button>
            ))}
            <input
              type="text"
              value={booking.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="Name"
            />

            <input
              type="text"
              value={booking.email}
              onChange={(e) => handleChange(index, "email", e.target.value)}
              placeholder="Email"
            />
            <input
              type="text"
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

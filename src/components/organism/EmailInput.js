import React, { useState } from "react";
import DateSelector from "../molecule/DateSelector";
import BookingChange from "../molecule/BookingChange";

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

  // const handleChange = (index, field, value) => {
  //   const updatedBookings = [...bookingDetails];
  //   updatedBookings[index][field] = value;
  //   setBookingDetails(updatedBookings);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetchBookingDetails(email);
  // };

  // const handleDateClick = (day) => {
  //   handleChange(selectedDateIndex, "date", day.toISOString().slice(0, 10)); // Update the date
  //   setCalendarVisible(false); // Close the calendar after selecting a date
  // };
  const handleUpdate = (booking) => {
    const updateData = {
      id: booking.id,
      date_field: booking.date, // Assuming this should match 'date_field' in the database
      time_slot: booking.time, // Assuming this should match 'time_slot' in the database
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      comments: booking.comments,
    };
    console.log("Updating booking with:", updateData);

    const backendUrl = "http://localhost:8000/index.php";
    fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("Update response:", data);
        alert("Booking updated successfully");
      })
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

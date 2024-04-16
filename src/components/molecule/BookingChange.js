import React, { useState } from "react";
import DateSelector from "./DateSelector";
import "../Styles/Booking.css";

function BookingChange({ booking, onUpdate }) {
  const [selectedTime, setSelectedTime] = useState(booking.time);
  const [bookingData, setBookingData] = useState({
    date: booking.date,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    comments: booking.comments,
    time: booking.time, // Use the time from the booking prop
  });
  const [dateSelectorVisible, setDateSelectorVisible] = useState(false);

  const toggleDateSelector = () => {
    setDateSelectorVisible(!dateSelectorVisible); // Toggle visibility
  };

  const handleChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateSelect = (date) => {
    handleChange("date", date.toISOString().slice(0, 10));
    toggleDateSelector();
  };

  const handleSubmit = () => {
    onUpdate({
      ...booking,
      ...bookingData,
    });
  };
  return (
    <div className="booking-container">
      <h3>Booking Details:</h3>
      <div className="booking-box">
        <input
          className="booking-item"
          type="text"
          value={bookingData.date}
          readOnly
          onClick={toggleDateSelector}
          placeholder="Select Date"
        />
        <DateSelector
          visible={dateSelectorVisible}
          onSelectDate={handleDateSelect}
        />
        {["Morning", "Afternoon", "Evening", "Night"].map((slot, index) => (
          <button
            key={index}
            className={`time-slot ${
              selectedTime === slot ? "selected-time" : ""
            }`}
            onClick={() => setSelectedTime(slot)}
          >
            {slot}
          </button>
        ))}
        <input
          className="booking-item"
          type="text"
          value={bookingData.name}
          onChange={(e) =>
            setBookingData((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Name"
        />
        <input
          className="booking-item"
          type="email"
          value={bookingData.email}
          onChange={(e) =>
            setBookingData((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Email"
        />
        <input
          className="booking-item"
          type="tel"
          value={bookingData.phone}
          onChange={(e) =>
            setBookingData((prev) => ({ ...prev, phone: e.target.value }))
          }
          placeholder="Phone"
        />
        <textarea
          className="booking-item"
          value={bookingData.comments}
          onChange={(e) =>
            setBookingData((prev) => ({ ...prev, comments: e.target.value }))
          }
          placeholder="Comments"
        />
        <button onClick={handleSubmit}>Update Booking</button>
      </div>
    </div>
  );
}

export default BookingChange;

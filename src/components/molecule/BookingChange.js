import React, { useState } from "react";
import DateSelector from "./DateSelector";

function BookingChange({ booking, onUpdate }) {
  const [selectedTime, setSelectedTime] = useState(booking.time);
  const [bookingData, setBookingData] = useState({
    date: booking.date,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    comments: booking.comments,
  });
  const [dateSelectorVisible, setDateSelectorVisible] = useState(false);

  const handleChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateSelect = (date) => {
    handleChange("date", date.toISOString().slice(0, 10));
  };

  const handleSubmit = () => {
    onUpdate({
      ...booking,
      ...bookingData,
      time: selectedTime,
    });
  };

  return (
    <div>
      <h3>Booking Details:</h3>
      <input
        type="text"
        value={bookingData.date}
        readOnly
        onClick={() => setDateSelectorVisible(true)}
        placeholder="Select Date"
      />
      {dateSelectorVisible && <DateSelector onSelectDate={handleDateSelect} />}
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
        type="text"
        value={bookingData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={bookingData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder="Email"
      />
      <input
        type="tel"
        value={bookingData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        placeholder="Phone"
      />
      <textarea
        value={bookingData.comments}
        onChange={(e) => handleChange("comments", e.target.value)}
        placeholder="Comments"
      />
      <button onClick={handleSubmit}>Update Booking</button>
    </div>
  );
}

export default BookingChange;

import React, { useState, useRef, useEffect } from "react";
import DateSelector from "./DateSelector";
import "../Styles/Booking.css";
import DeleteBooking from "./DeleteBooking";
import supabase from "../../service/supabaseService";

// import flatpick
import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr CSS
import TimePicker from "./TimePicker";

//accept RefreshBookings as prop
function BookingChange({ booking, onUpdate, refreshBookings }) {
  const [pickupTime, setPickupTime] = useState(booking.time); // manage state for time
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
    setDateSelectorVisible((prevVisible) => !prevVisible);
  };

  const handleChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateSelect = (date) => {
    handleChange("date", date.toISOString().slice(0, 10));
    toggleDateSelector();
  };

  const handleDelete = async (id) => {
    console.log("Attenmpting to delete booking with ID:", id);

    const { data, error } = await supabase
      .from("calendar")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting", error);
      alert("Error while deleting");
    } else {
      console.log("Booking deleted", data);
      alert("Booking deleteed");
      // call back the
      refreshBookings();
    }
  };

  const handleSubmit = () => {
    onUpdate({
      ...booking,
      ...bookingData,
    });
  };

  // flatpickr

  return (
    <div className="booking-container">
      <h3>Booking Details:</h3>
      <div className="booking-box">
        <input
          className="booking-item"
          type="text"
          value={
            bookingData.date
              ? new Date(bookingData.date).toLocaleDateString()
              : ""
          }
          readOnly
          onClick={toggleDateSelector} // Add this line
          placeholder="Select a Date"
        />
        <DateSelector
          visible={dateSelectorVisible}
          onSelectDate={handleDateSelect}
        />
        <div>
          <h3>Pick-Up Time:</h3>
          <TimePicker pickupTime={pickupTime} setPickupTime={setPickupTime} />
        </div>
        <div className="item-container">
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
        </div>
        <div className="button">
          <button onClick={handleSubmit}>Update Booking</button>
          <DeleteBooking bookingId={booking.id} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default BookingChange;

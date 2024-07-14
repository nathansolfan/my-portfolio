import React, { useState } from "react";
import "../Styles/Calendar.css";
import car from "../../images/carnr2.webp";
import supabase from "../../service/supabaseService";

import "flatpickr/dist/flatpickr.min.css";
import TimePicker from "../molecule/TimePicker";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [locations, setLocations] = useState({
    pickupLocation: "",
    dropoffLocation: "",
  });
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [comment, setComment] = useState("");

  const getMonthDays = (date) => {
    const startDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days = [];
    for (let day = startDay; day <= endDay; day.setDate(day.getDate() + 1)) {
      days.push(new Date(day));
    }
    return days;
  };

  const days = getMonthDays(currentDate);

  const handlePrevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  const handleNextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setPickupTime(""); // Assuming this resets the time when a new date is clicked
    setDropoffTime("");
  };

  const handleContactChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      date_field: selectedDate.toISOString().slice(0, 10),
      pickup_time: pickupTime,
      dropoff_time: dropoffTime,
      pickup_location: locations.pickupLocation,
      dropoff_location: locations.dropoffLocation,
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
      comments: comment,
    };

    const { data, error } = await supabase.from("calendar").insert([payload]);

    if (error) {
      alert(
        "An error occurred while saving your appointment: " + error.message
      );
    } else {
      alert("Your appointment has been successfully saved");
      setSelectedDate(null);
      setPickupTime("");
      setDropoffTime("");
      setLocations({ pickupLocation: "", dropoffLocation: "" });
      setContactInfo({ name: "", email: "", phone: "" });
      setComment("");
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-box">
        <div className="calendar-nav">
          <button onClick={handlePrevMonth}>Prev</button>
          <span className="month-year">
            {currentDate.toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button onClick={handleNextMonth}>Next</button>
        </div>
        <div className="calendar-grid">
          {days.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${
                selectedDate &&
                new Date(day).toISOString().slice(0, 10) ===
                  new Date(selectedDate).toISOString().slice(0, 10)
                  ? "selected-day"
                  : ""
              }`}
              onClick={() => handleDateClick(day)}
            >
              {day.getDate()}
            </div>
          ))}
        </div>
      </div>
      {selectedDate && (
        <>
          <div className="grid-time">
            <h3>Pick-Up Time:</h3>
            <TimePicker pickupTime={pickupTime} setPickupTime={setPickupTime} />
          </div>
          <div className="location-container">
            <h3 className="location-label">Pick-Up Location</h3>
            <input
              type="text"
              name="pickupLocation"
              className="location-input"
              placeholder="Pick up Location"
              value={locations.pickupLocation}
              onChange={(e) =>
                setLocations({ ...locations, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="location-container">
            <h3 className="location-label">Drop-Up Location</h3>
            <input
              type="text"
              name="dropoffLocation"
              className="location-input"
              placeholder="Drop up Location"
              value={locations.dropoffLocation}
              onChange={(e) =>
                setLocations({ ...locations, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="contact-info">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={contactInfo.name}
              onChange={handleContactChange}
              className="contact-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={contactInfo.email}
              onChange={handleContactChange}
              className="contact-input"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={contactInfo.phone}
              onChange={handleContactChange}
              className="contact-input"
            />
          </div>
          <div className="comments-section">
            <textarea
              className="comments-textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add any special requests or comments here..."
            ></textarea>
          </div>
          <button className="calendar-button" onClick={handleSubmit}>
            Submit
          </button>
        </>
      )}
    </div>
  );
}

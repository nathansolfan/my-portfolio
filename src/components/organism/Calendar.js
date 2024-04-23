import React, { useState } from "react";
import "../Styles/Calendar.css";
import car from "../../images/carnr2.webp";
import supabase from "../../service/supabaseService";

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
      {/* <img src={car} alt="Background" className="background-image" /> */}
      <div>
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
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            />
            <h3>Drop-Off Time:</h3>
            <input
              type="time"
              value={dropoffTime}
              onChange={(e) => setDropoffTime(e.target.value)}
            />
          </div>
          <div className="location-info">
            <h3>Locations</h3>
            <input
              type="text"
              name="pickupLocation"
              placeholder="Pick-Up Location"
              value={locations.pickupLocation}
              onChange={(e) =>
                setLocations({ ...locations, pickupLocation: e.target.value })
              }
            />
            <input
              type="text"
              name="dropoffLocation"
              placeholder="Drop-Off Location"
              value={locations.dropoffLocation}
              onChange={(e) =>
                setLocations({ ...locations, dropoffLocation: e.target.value })
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
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={contactInfo.email}
              onChange={handleContactChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={contactInfo.phone}
              onChange={handleContactChange}
            />
          </div>
          <div className="comments-section">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add any special requests or comments here..."
            ></textarea>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
}

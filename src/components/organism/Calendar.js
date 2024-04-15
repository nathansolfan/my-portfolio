import React, { useState } from "react";
import "../Styles/Calendar.css";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSeletecDate] = useState(null);
  const [selectedTime, setSeletecTime] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [comment, setComment] = useState("");

  const timeSlots = ["Morning", "Afternoon", "Evening", "Night"];

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
    setSeletecDate(day);
    setSeletecTime(""); // Reset selected time when a new date is clicked
  };

  const handleContactChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      date: selectedDate.toISOString().slice(0, 10),
      time: selectedTime,
      contactInfo,
      comment,
    };

    console.log("Submitting:", payload); // For testing, show the payload in the console

    fetch("http://localhost:8000/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => console.log("Server response:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="calendar-container">
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
              selectedDate && day.toISOString() === selectedDate.toISOString()
                ? "selected"
                : ""
            }`}
            onClick={() => handleDateClick(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
      {selectedDate && (
        <>
          <div className="grid-time">
            <h3>Select your time:</h3>
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
          </div>
          <div className="contact-info">
            <h3>Contact Information</h3>
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
            <h3>Comments</h3>
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

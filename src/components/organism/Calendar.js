import React, { useState } from "react";
import "../Styles/Calendar.css";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSeletecDate] = useState(null);
  const [selectedTime, setSeletecTime] = useState("");

  // time
  const timeSlots = ["Morning", "Afternoon", "Evening", "Night"];

  const getMonthDays = (date) => {
    const startDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days = [];
    for (let day = startDay; day <= endDay; day.setDate(day.getDate() + 1)) {
      // push the for / day inside the days empty array
      days.push(new Date(day));
    }
    return days;
  };
  const days = getMonthDays(currentDate);

  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate);
  };

  const monthYearFormat = currentDate.toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  });

  /* select*/
  const handleDateClick = (day) => {
    setSeletecDate(day);
    // fetch
    fetch("http://localhost:8000/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: day.toISOString().slice(0, 10) }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => console.log("Server response:", data))
      .catch((error) => console.error("Error", error));

    console.log("Selected date:", day.toLocaleDateString());
  };

  return (
    <div className="calendar-container">
      <div className="calendar-nav">
        <button onClick={handlePrevMonth}>Prev</button>
        <span className="month-year">{monthYearFormat}</span>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="calendar-grid">
        {days.map((day, index) => (
          /* <div key={index} className="calendar-day">
            {day.getDate()}
          </div>
*/
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
      {selectedTime} && (<p>Select a time slot:</p>
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
      )
    </div>
  );
}

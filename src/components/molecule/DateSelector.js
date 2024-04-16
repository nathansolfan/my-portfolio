import React, { useState } from "react";
import "../Styles/Calendar.css";

function DateSelector({ onSelectDate, visible }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  if (!visible) return null; // This line ensures the component only renders when visible is true.

  // Helper function to generate an array of days in the current month
  const getMonthDays = (date) => {
    const startDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days = [];
    for (
      let day = new Date(startDay);
      day <= endDay;
      day.setDate(day.getDate() + 1)
    ) {
      days.push(new Date(day));
    }
    return days;
  };

  const days = getMonthDays(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
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
            className="calendar-day"
            onClick={() => onSelectDate(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DateSelector;

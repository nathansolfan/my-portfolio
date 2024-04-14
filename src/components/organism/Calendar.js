import React, { useState } from "react";
import "../Styles/Calendar.css";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  return (
    <div className="calendar-container">
      <div>
        <button onClick={handlePrevMonth}>Prev</button>
        <span className="month-year">{monthYearFormat}</span>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="calendar-grid">
        {days.map((day) => (
          <div key={day.toISOString()}>{day.getDate()}</div>
        ))}
      </div>
    </div>
  );
}

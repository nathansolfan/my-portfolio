import React, { useState } from "react";

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

  const handlePrevMonth = () => {};

  const handleNextMonth = () => {};

  return (
    <div>
      <button onClick={handlePrevMonth}>Prev</button>
      <button onClick={handleNextMonth}>Next</button>
      <div>
        {days.map((day) => (
          <div key={day.toISOString()}>{day.getDate()}</div>
        ))}
      </div>
    </div>
  );
}

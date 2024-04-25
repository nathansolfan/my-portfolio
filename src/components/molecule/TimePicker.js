import React, { useEffect, useRef } from "react";
import "../Styles/TimerPicker.css";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr CSS

export default function TimePicker({ pickupTime, setPickupTime }) {
  const timeInputRef = useRef(null);

  useEffect(() => {
    flatpickr(timeInputRef.current, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
      defaultDate: pickupTime,
      onChange: (selectedDates, dateStr, instance) => {
        setPickupTime(dateStr);
      },
    });
  }, [pickupTime, setPickupTime]);
  return (
    <div>
      <input ref={timeInputRef} />
    </div>
  );
}

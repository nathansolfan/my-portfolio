import React from "react";

export default function DeleteBooking({ bookingId, onDelete }) {
  return (
    <div>
      <button onClick={() => onDelete(bookingId)}>Delete Booking</button>
    </div>
  );
}

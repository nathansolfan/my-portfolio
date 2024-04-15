import React from "react";
import { Link } from "react-router-dom";
import EditBooking from "../organism/EditBooking";

export default function Change({ bookings }) {
  return (
    <div>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <Link to={`/edit-booking/${booking.id}`}>{booking.name}</Link>
          </li>
        ))}
      </ul>
      <EditBooking />
    </div>
  );
}

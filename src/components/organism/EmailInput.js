import React, { useState } from "react";
import BookingChange from "../molecule/BookingChange"; // Ensure correct import
import supabase from "../../service/supabaseService"; // Adjust the import path as necessary

export default function EmailInput() {
  const [email, setEmail] = useState("");
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookingDetails = async (email) => {
    setLoading(true);
    setError(null);

    let { data, error } = await supabase
      .from("calendar")
      .select("*")
      .eq("email", email);

    if (error) {
      setError("Failed to load booking");
      console.error("Error fetching booking", error);
    } else {
      setBookingDetails(data);
    }
    setLoading(false);
  };

  const handleUpdate = async (updatedBooking) => {
    const { data, error } = await supabase
      .from("calendar")
      .update(updatedBooking)
      .eq("id", updatedBooking.id);

    if (error) {
      setError("Cant update");
      alert("Error updating");
    } else {
      alert("Booking updated");
      console.log("Updated data:", data);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchBookingDetails(email);
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email to find booking"
          required
        />
        <button type="submit">Find Booking</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading &&
        !error &&
        bookingDetails.map((booking) => (
          <BookingChange
            key={booking.id}
            booking={booking}
            onUpdate={handleUpdate}
          />
        ))}
    </div>
  );
}

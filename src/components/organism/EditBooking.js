import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function EditBooking() {
  const [bookingData, setBookingData] = useState(null);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (email) {
      fetch(
        `http://localhost:8000/index.php?email=${encodeURIComponent(email)}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setBookingData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [email]);

  console.log(id); // Check if id is logged correctly

  //   if (id) {
  //     fetch(`http://localhost:8000/index.php?id=${id}`)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         return response.json();
  //       })
  //       .then((data) => setBookingData(data))
  //       .catch((error) => console.error("Error fetching data:", error));
  //   }
  // }, [id]);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch("http://localhost:8000/index.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...bookingData, id }), // Include 'id' in the update payload
    })
      .then((response) => {
        if (response.ok) {
          alert("Booking Updated Successfully");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input
        name="date"
        value={bookingData.date || ""}
        onChange={handleChange}
      />
      <input
        name="time"
        value={bookingData.time || ""}
        onChange={handleChange}
      />
      <input
        name="name"
        value={bookingData.name || ""}
        onChange={handleChange}
      />
      <input
        name="email"
        value={bookingData.email || ""}
        onChange={handleChange}
      />
      <input
        name="phone"
        value={bookingData.phone || ""}
        onChange={handleChange}
      />
      <textarea
        name="comments"
        value={bookingData.comments || ""}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Update Booking</button>
    </div>
  );
}

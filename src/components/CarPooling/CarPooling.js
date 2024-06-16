import React, { useState } from "react";

const basePrice = 15; // Base price for the ride

const CarPooling = () => {
  const [passengers, setPassengers] = useState([]);
  const [price, setPrice] = useState(basePrice);

  const addPassenger = (stop) => {
    setPassengers([...passengers, stop]);
    calculatePrice([...passengers, stop]);
  };

  const calculatePrice = (passengers) => {
    const uniqueStops = new Set(passengers);
    const additionalCost = uniqueStops.size - 1; // Each unique stop adds 2£
    const totalPrice = basePrice + additionalCost * 2;
    setPrice(totalPrice);
  };

  return (
    <div>
      <h2>Car Pooling Price Calculator</h2>
      <div>
        <input
          type="text"
          placeholder="Enter stop"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value) {
              addPassenger(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
      <div>
        <h3>Passengers:</h3>
        <ul>
          {passengers.map((stop, index) => (
            <li key={index}>Stop: {stop}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Total Price: £{price}</h3>
      </div>
    </div>
  );
};

export default CarPooling;

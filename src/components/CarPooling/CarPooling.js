import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const initialCenter = {
  lat: 51.5074, // Example coordinates for London
  lng: -0.1278,
};

const basePrice = 15; // Base price for the ride

const CarPooling = () => {
  const [passengers, setPassengers] = useState([]);
  const [price, setPrice] = useState(basePrice);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const center = initialCenter;

  const addPassenger = (location) => {
    setPassengers([...passengers, location]);
    calculatePrice([...passengers, location]);
  };

  const calculatePrice = (passengers) => {
    const uniqueStops = new Set(
      passengers.map((loc) => loc.lat + "-" + loc.lng)
    );
    const additionalCost = uniqueStops.size - 1; // Each unique stop adds 2£
    const totalPrice = basePrice + additionalCost * 2;
    setPrice(totalPrice);
  };

  const handleMapClick = (e) => {
    const location = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setSelectedLocation(location);
  };

  const confirmLocation = () => {
    if (selectedLocation) {
      addPassenger(selectedLocation);
      setSelectedLocation(null);
    }
  };

  return (
    <div>
      <h2>Car Pooling Price Calculator</h2>
      <LoadScript googleMapsApiKey="AIzaSyBAHBjvzcG26iURd2HMx3Tf38hnE9EHeoA">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          {selectedLocation && <Marker position={selectedLocation} />}
          {passengers.map((location, index) => (
            <Marker key={index} position={location} />
          ))}
        </GoogleMap>
      </LoadScript>
      <button onClick={confirmLocation} disabled={!selectedLocation}>
        Confirm Location
      </button>
      <div>
        <h3>Passengers:</h3>
        <ul>
          {passengers.map((location, index) => (
            <li key={index}>
              Stop: Lat {location.lat}, Lng {location.lng}
            </li>
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

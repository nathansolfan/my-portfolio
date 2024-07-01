import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

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
  const [center, setCenter] = useState(initialCenter);
  const [postcode, setPostcode] = useState("");

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

  const handlePostcodeSearch = async () => {
    const apiKey = "YOUR_OPENCAGE_API_KEY"; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${postcode}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const { lat, lng } = response.data.results[0].geometry;
      setCenter({ lat, lng });
    } catch (error) {
      console.error("Failed to fetch coordinates for postcode", error);
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

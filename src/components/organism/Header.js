import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Header.css";
import nathan from "../../images/nathan1.webp";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <div className="navbar">
        <img src={nathan} alt="Logo" />

        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/find-booking" className="nav-link">
              List
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/calendar" className="nav-link">
              Calendar
            </Link>
          </li>
        </ul>
        <div className="account-action">
          <button onClick={toggleDropdown} className="nav-link">
            <FontAwesomeIcon icon={dropdownOpen ? faTimes : faBars} />{" "}
            {/* Toggle icons */}
          </button>
          <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
            <Link to="/register" className="nav-link">
              Register
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            {/* Add more links if needed */}
          </div>
        </div>
      </div>
    </header>
  );
}

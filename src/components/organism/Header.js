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
      {/* <img src={nathan} alt="Logo" /> */}

      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/aichat" className="nav-link">
            Chat
          </Link>
        </li>
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
        <li className="nav-item">
          <Link to="/box" className="nav-link">
            Box
          </Link>
        </li>
      </ul>
      <div className="account-action">
        <button onClick={toggleDropdown} className="header-button">
          <FontAwesomeIcon icon={dropdownOpen ? faTimes : faBars} />{" "}
          {/* Toggle icons */}
        </button>
      </div>

      <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
        <Link to="/register" className="nav-link">
          Register
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </div>
    </header>
  );
}

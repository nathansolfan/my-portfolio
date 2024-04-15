import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <nav className="navbar">
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
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/calendar" className="nav-link">
              Calendar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

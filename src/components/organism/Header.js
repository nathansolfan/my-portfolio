import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css";
import nathan from "../../images/nathan1.webp";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : "transparent"}`}>
      <nav className="navbar">
        <img src={nathan} alt="" />
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
      </nav>
    </header>
  );
}

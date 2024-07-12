import React, { useState } from "react";
import "../Styles/Header.css"; // Ensure this path is correct

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    document.body.classList.toggle("cs-open", !menuActive);
  };

  return (
    <header id="cs-navigation" className={menuActive ? "cs-active" : ""}>
      <div className="cs-container">
        <a href="/" className="cs-logo" aria-label="back to home">
          <img
            src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Graphics/day-care.svg"
            alt="logo"
            width="210"
            height="29"
            aria-hidden="true"
            decoding="async"
          />
        </a>
        <nav className="cs-nav" role="navigation">
          <button
            className="header-button"
            aria-label="mobile menu toggle"
            onClick={toggleMenu}
          >
            <div className="cs-box" aria-hidden="true">
              <span className="cs-line cs-line1" aria-hidden="true"></span>
              <span className="cs-line cs-line2" aria-hidden="true"></span>
              <span className="cs-line cs-line3" aria-hidden="true"></span>
            </div>
          </button>
          <ul className={`nav-list ${menuActive ? "show" : ""}`}>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="/services" className="nav-link">
                Services
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="/registration" className="nav-link">
                    Registration
                  </a>
                </li>
                <li>
                  <a href="/classes" className="nav-link">
                    Our Classes
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/blog" className="nav-link">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className="account-action">
          <p>Telephone: +44 07471443143</p>
        </div>
      </div>
    </header>
  );
}

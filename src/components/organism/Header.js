import React, { useState, useEffect } from "react";
import "../Styles/Header.css";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    document.body.classList.toggle("cs-open", menuActive);
  }, [menuActive]);

  const navItems = [
    { href: "/", text: "Home", active: true },
    { href: "/about", text: "About" },
    { href: "/services", text: "Services" },
    { href: "/about-us", text: "About Us" },
    { href: "/faq", text: "FAQ" },
  ];

  return (
    <header id="cs-navigation" className={menuActive ? "cs-active" : ""}>
      <div className="cs-container">
        <a href="/" className="cs-logo" aria-label="back to home">
          <img
            src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons%2Flogo-black.svg"
            alt="logo"
            width="210"
            height="29"
            aria-hidden="true"
            decoding="async"
          />
        </a>
        <nav className="cs-nav" role="navigation">
          <button
            className="cs-toggle"
            aria-label="mobile menu toggle"
            onClick={toggleMenu}
          >
            <div className="cs-box" aria-hidden="true">
              {[1, 2, 3].map((num) => (
                <span
                  key={num}
                  className={`cs-line cs-line${num}`}
                  aria-hidden="true"
                ></span>
              ))}
            </div>
          </button>
          <div className="cs-ul-wrapper">
            <ul
              id="cs-expanded"
              className={`cs-ul ${menuActive ? "show" : ""}`}
              aria-expanded={menuActive}
            >
              {navItems.map((item, index) => (
                <li key={index} className="cs-li">
                  <a
                    href={item.href}
                    className={`cs-li-link ${item.active ? "cs-active" : ""}`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <a href="/contact" className="cs-button-solid cs-nav-button">
          Contact Us
        </a>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import "../Styles/Hero.css";
import Cards from "../molecule/Cards";
import SideBySide from "./SideBySide";

export default function Hero() {
  return (
    <div>
      <section id="hero-1426">
        <div className="cs-container">
          <div className="cs-content">
            <span className="cs-topper">
              One website at the time, we conquer the world.
            </span>
            <h1 className="cs-title">Nathan Ferreira Developer</h1>
            <p className="cs-text">
              We help companies develop powerful corporate social
              responsibility, grantmaking, and employee engagement strategies.
            </p>
            <div className="cs-button-group">
              <button onClick={() => (window.location.href = "#about")}>
                About
              </button>
              <button onClick={() => (window.location.href = "#services")}>
                Services
              </button>
            </div>
          </div>
        </div>

        {/* Background Image */}
        <picture className="cs-background">
          <source
            media="(max-width: 600px)"
            srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Landscapes/field-m.jpg"
          />
          <source
            media="(min-width: 601px)"
            srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Landscapes/field.jpg"
          />
          <img
            loading="lazy"
            decoding="async"
            src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Landscapes/field.jpg"
            alt="field"
            width="1920"
            height="1200"
            aria-hidden="true"
          />
        </picture>
      </section>
      <Cards />
      <SideBySide />
    </div>
  );
}

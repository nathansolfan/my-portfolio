import React from "react";
import "../Styles/Hero.css";

export default function Hero() {
  return (
    <section id="hero-1426">
      <div className="cs-container">
        <div className="cs-content">
          <span className="cs-topper">
            One website at the time, we conquer the world.
          </span>
          <h1 className="cs-title">Nathan Ferreira Developer</h1>
          <p className="cs-text">
            We help companies develop powerful corporate social responsibility,
            grantmaking, and employee engagement strategies.
          </p>
          <div className="cs-button-group">
            <a href="" className="cs-button-solid cs-button1">
              Join Community
            </a>
            <a href="" className="cs-button-solid cs-button2">
              Donate Now
            </a>
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
  );
}

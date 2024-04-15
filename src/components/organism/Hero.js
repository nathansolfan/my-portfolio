import React from "react";
import "../Styles/Hero.css";

import image from "../../images/img.png";

export default function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-items">
        <div>
          <h1>NATHAN FERREIRA</h1>
          <p>
            Full-Stack Developer. <br></br>HTML/CSS/JS - PHP/NodeJS -
            SQL/MongoDB
          </p>
          <button className="hero-button">Learn More</button>
        </div>

        <img src={image} alt="" />
      </div>
    </div>
  );
}

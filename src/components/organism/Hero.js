import React from "react";
import "../Styles/Hero.css";
import { Link } from "react-router-dom";

import image from "../../images/img.png";
import image2 from "../../images/deep.jpg";

import Logo from "./Logo";
import Cards from "../molecule/Cards";

export default function Hero() {
  return (
    <div className="home-container">
      <div
        className="hero-container"
        style={{ backgroundImage: `url(${image2})` }}
      >
        <div className="hero-items">
          <div>
            <h1>NATHAN FERREIRA</h1>
            <p>
              Full-Stack Developer. <br></br>HTML/CSS/JS - PHP/NodeJS -
              SQL/MongoDB
            </p>
            <Link to="/about">
              <button className="hero-button">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Cards />
        <Logo />
      </div>
    </div>
  );
}

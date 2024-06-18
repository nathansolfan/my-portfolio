import React, { useState } from "react";
import { Link } from "react-router-dom";
import Draggable from "react-draggable";
import "../Styles/Hero.css";

import Logo from "./Logo";
import Cards from "../molecule/Cards";

export default function Hero() {
  const [dragging, setDragging] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const handleStart = () => {
    setDragging(true);
  };

  const handleStop = () => {
    setDragging(false);
  };

  const handleDoubleClick = () => {
    setMinimized(!minimized);
  };

  return (
    <main>
      <section className="hero-container">
        <Draggable onStart={handleStart} onStop={handleStop}>
          <div
            className={`hero-items ${dragging ? "dragging" : ""} ${
              minimized ? "minimized" : ""
            }`}
            onDoubleClick={handleDoubleClick}
          >
            <div className={`hero-content ${minimized ? "minimized" : ""}`}>
              {!minimized ? (
                <>
                  <h1>NATHAN FERREIRA</h1>
                  <p>
                    Full-Stack Developer. <br />
                    HTML/CSS/JS - PHP/NodeJS - SQL/MongoDB
                  </p>
                  <Link to="/about">
                    <button className="hero-button">Learn More</button>
                  </Link>
                </>
              ) : (
                <p>👤</p> // A simple icon or symbol for the minimized view
              )}
            </div>
          </div>
        </Draggable>
      </section>
      <section>
        <Cards />
        <Logo />
      </section>
    </main>
  );
}

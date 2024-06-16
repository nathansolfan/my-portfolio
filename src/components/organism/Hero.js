import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Hero.css";

import Logo from "./Logo";
import Cards from "../molecule/Cards";

export default function Hero() {
  const draggableRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - start.x,
        y: e.clientY - start.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <main className="hero-items">
      <section className="hero-container">
        <div
          ref={draggableRef}
          className="hero-items"
          style={{
            position: "absolute",
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: "move",
          }}
          onMouseDown={handleMouseDown}
        >
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
      </section>
      <section>
        <Cards />
        <Logo />
      </section>
    </main>
  );
}

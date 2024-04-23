import React from "react";
import "../Styles/Cards.css";

export default function Cards() {
  return (
    <section className="section-container">
      <div className="section-box">
        <a href="#" className="card">
          <div className="img-div">.stacked--left</div>
          <h2>Journey to coding:</h2>
        </a>
      </div>

      <div className="section-box">
        <a href="#" className="card">
          <div className="img-div">.stacked--right</div>
          <h2>Learning the structure</h2>
        </a>
      </div>
      {/* Repeat for other cards as needed */}
    </section>
  );
}

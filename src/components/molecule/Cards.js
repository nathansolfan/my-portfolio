import React from "react";
import "../Styles/Cards.css";

import image from "../../images/picnr1.webp";
import image2 from "../../images/picnr2.webp";

export default function Cards() {
  return (
    <section className="section-container">
      <div className="section-box">
        <h2>Journey to coding:</h2>
        <img src={image} alt="" />
      </div>

      <div className="section-box">
        <h2>Learning the structure</h2>
        <img src={image2} alt="" />
      </div>
    </section>
  );
}

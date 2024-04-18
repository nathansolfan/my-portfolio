import React from "react";
import "../Styles/Cards.css";

import image from "../../images/picnr1.webp";

export default function Cards() {
  return (
    <section className="section-container">
      <div className="section-box">
        <img src={image} alt="" />
      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import html from "../../images/logo/html.png";
import css from "../../images/logo/css.png";
import js from "../../images/logo/javascript.png";
import vite from "../../images/logo/vite.png";
import php from "../../images/logo/3.png";
import node from "../../images/logo/node.png";
import sql from "../../images/logo/sql.png";
import mongo from "../../images/logo/mongo.png";
import "../Styles/Logo.css";

export default function Logo() {
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImages(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="logo-container">
      <div className={`logo ${showImages ? "reveal" : ""}`}>
        <img src={html} alt="" />
        <img src={css} alt="" />
        <img src={js} alt="" />
        <img src={vite} alt="" />
        <img src={php} alt="" />
        <img src={node} alt="" />
        <img src={sql} alt="" />
        <img src={mongo} alt="" />
      </div>
    </div>
  );
}

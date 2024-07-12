import React from "react";
import "../Styles/Cards.css";

export default function Cards() {
  return (
    <section id="services-1355">
      <div className="cs-container">
        <div className="cs-content">
          <span className="cs-topper">Our Services</span>
          <h2 className="cs-title">
            We’re Committed to Deliver Top High Quality Services
          </h2>
        </div>
        <ul className="cs-card-group">
          <li className="cs-item">
            <a href="" className="cs-link">
              <h3 className="cs-h3">
                <span className="cs-span">Growing</span> Businesses
              </h3>
            </a>
            <picture className="cs-background">
              <source
                media="(max-width: 600px)"
                srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/meeting1.jpg"
              />
              <source
                media="(min-width: 601px)"
                srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/meeting1.jpg"
              />
              <img
                decoding="async"
                src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/meeting1.jpg"
                alt="construction"
                width="305"
                height="305"
                aria-hidden="true"
              />
            </picture>
          </li>
          <li className="cs-item">
            <a href="" className="cs-link">
              <h3 className="cs-h3">
                <span className="cs-span">Building</span> Relationships
              </h3>
            </a>
            <picture className="cs-background">
              <source
                media="(max-width: 600px)"
                srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/meeting2.jpg"
              />
              <source
                media="(min-width: 601px)"
                srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/meeting2.jpg"
              />
              <img
                decoding="async"
                src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/meeting2.jpg"
                alt="construction"
                width="305"
                height="305"
                aria-hidden="true"
              />
            </picture>
          </li>
          <li className="cs-item">
            <a href="" className="cs-link">
              <h3 className="cs-h3">
                <span className="cs-span">Operational</span> Excellence
              </h3>
            </a>
            <picture className="cs-background">
              <source
                media="(max-width: 600px)"
                srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/meeting3.jpg"
              />
              <source
                media="(min-width: 601px)"
                srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/meeting3.jpg"
              />
              <img
                decoding="async"
                src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/meeting3.jpg"
                alt="construction"
                width="305"
                height="305"
                aria-hidden="true"
              />
            </picture>
          </li>
        </ul>
      </div>
    </section>
  );
}

import React from "react";
import "../Styles/SideBySide.css";

const SideBySide = () => {
  return (
    <>
      <section id="RPsbs-414">
        <div className="cs-container">
          <div className="cs-content">
            <span className="cs-topper">Who We Are</span>
            <h2 className="cs-title">About Our Company</h2>
            <p className="cs-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
              provident consequuntur, asperiores nisi ut fugiat harum quo
              inventore, molestias vero cumque dolorum eligendi odio neque illo
              dolores tempore natus non sit nostrum nam sint. Amet maxime vel
              inventore culpa soluta?
            </p>
            <a href="/" className="cs-button-solid">
              More About Us
            </a>
          </div>
          <div className="cs-image-group">
            <picture className="cs-picture cs-picture1">
              <source
                media="(max-width: 600px)"
                srcSet="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping1.jpg"
              />
              <source
                media="(min-width: 601px)"
                srcSet="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping1.jpg"
              />
              <img
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                src="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping1.jpg"
                alt="backyard"
                width="229"
                height="352"
              />
            </picture>
            <picture className="cs-picture cs-picture2">
              <source
                media="(max-width: 600px)"
                srcSet="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping2.jpg"
              />
              <source
                media="(min-width: 601px)"
                srcSet="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping2.jpg"
              />
              <img
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                src="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping3.jpg"
                alt="backyard"
                width="390"
                height="352"
              />
            </picture>
            <picture className="cs-picture cs-picture3">
              <source
                media="(max-width: 600px)"
                srcSet="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping3.jpg"
              />
              <source
                media="(min-width: 601px)"
                srcSet="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping3.jpg"
              />
              <img
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                src="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping3.jpg"
                alt="backyard"
                width="649"
                height="227"
              />
            </picture>
          </div>
        </div>
      </section>

      <section id="RPsbsr-414">
        <div className="cs-container">
          <div className="cs-content">
            <span className="cs-topper">Who We Are</span>
            <h2 className="cs-title">About Our Company</h2>
            <p className="cs-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
              provident consequuntur, asperiores nisi ut fugiat harum quo
              inventore, molestias vero cumque dolorum eligendi odio neque illo
              dolores tempore natus non sit nostrum nam sint. Amet maxime vel
              inventore culpa soluta?
            </p>
            <a href="/" className="cs-button-solid">
              More About Us
            </a>
          </div>
          <div className="cs-image-group">
            <picture className="cs-picture cs-picture1">
              <source
                media="(max-width: 600px)"
                srcSet="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping1.jpg"
              />
              <source
                media="(min-width: 601px)"
                srcSet="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping1.jpg"
              />
              <img
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                src="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping1.jpg"
                alt="backyard"
                width="229"
                height="352"
              />
            </picture>
            <picture className="cs-picture cs-picture2">
              <source
                media="(max-width: 600px)"
                srcSet="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping2.jpg"
              />
              <source
                media="(min-width: 601px)"
                srcSet="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping2.jpg"
              />
              <img
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                src="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping3.jpg"
                alt="backyard"
                width="390"
                height="352"
              />
            </picture>
            <picture className="cs-picture cs-picture3">
              <source
                media="(max-width: 600px)"
                srcSet="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping3.jpg"
              />
              <source
                media="(min-width: 601px)"
                srcSet="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping3.jpg"
              />
              <img
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                src="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/landscaping3.jpg"
                alt="backyard"
                width="649"
                height="227"
              />
            </picture>
          </div>
        </div>
      </section>
    </>
  );
};

export default SideBySide;

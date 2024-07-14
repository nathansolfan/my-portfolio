import React from "react";
import "../Styles/Footer.css";

const Footer = () => {
  return (
    <footer id="footer-1390">
      <div className="cs-container">
        <div className="cs-top">
          <a aria-label="go back to home" className="cs-logo" href="/">
            <img
              className="cs-logo-img"
              loading="lazy"
              decoding="async"
              src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Logos/agency-logo.svg"
              alt="logo"
              width="209"
              height="40"
            />
          </a>
          <ul className="cs-ul">
            <li className="cs-li">
              <a href="/" className="cs-link">
                Home
              </a>
            </li>
            <li className="cs-li">
              <a href="/about" className="cs-link">
                About
              </a>
            </li>
            <li className="cs-li">
              <a href="/services" className="cs-link">
                Services
              </a>
            </li>
            <li className="cs-li">
              <a href="/blog" className="cs-link">
                Blog
              </a>
            </li>
            <li className="cs-li">
              <a href="/contact" className="cs-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="cs-bottom">
          <ul className="cs-social">
            <li className="cs-social-li">
              <a
                href="https://facebook.com"
                className="cs-social-link"
                aria-label="facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="cs-social-icon cs-default"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/facebook-ba.svg"
                  alt="icon"
                  loading="lazy"
                  decoding="async"
                  width="12"
                  height="12"
                  aria-hidden="true"
                />
              </a>
            </li>
            <li className="cs-social-li">
              <a
                href="https://twitter.com"
                className="cs-social-link"
                aria-label="twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="cs-social-icon cs-default"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/twitter-ba.svg"
                  alt="icon"
                  loading="lazy"
                  decoding="async"
                  width="12"
                  height="12"
                  aria-hidden="true"
                />
              </a>
            </li>
            <li className="cs-social-li">
              <a
                href="https://instagram.com"
                className="cs-social-link"
                aria-label="instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="cs-social-icon cs-default"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/instagram-ba.svg"
                  alt="icon"
                  loading="lazy"
                  decoding="async"
                  width="12"
                  height="12"
                  aria-hidden="true"
                />
              </a>
            </li>
            <li className="cs-social-li">
              <a
                href="https://youtube.com"
                className="cs-social-link"
                aria-label="youtube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="cs-social-icon cs-default"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/youtube-ba.svg"
                  alt="icon"
                  loading="lazy"
                  decoding="async"
                  width="12"
                  height="12"
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>
          <span className="cs-copyright">
            © Copyright 2023 -{" "}
            <a href="/" className="cs-copyright-link">
              Stitch Agency
            </a>
          </span>
          <div className="cs-flex">
            <a href="/privacy-policy" className="cs-copyright-link">
              Privacy Policy
            </a>
            <span className="cs-separater">|</span>
            <a href="/terms-of-use" className="cs-copyright-link">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

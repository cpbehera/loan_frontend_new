// src/components/common/Footer.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalculator,
  faFileSignature,
  faInfoCircle,
  faQuestionCircle,
  faUser,
  faBriefcase,
  faCar,
  faBalanceScale,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wave"></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo-section">
              <div className="logo-text">
                <img src="images/logo.png" alt="logo" />
                <h3>FinTrust</h3>
              </div>
              <p className="tagline">
                Making financial dreams come true, one loan at a time. Trusted
                by over 50,000 customers nationwide.
              </p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" aria-label="Twitter">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a href="#" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-middle-wrapper">
            <div className="footer-section">
              <h4>Products</h4>
              <ul>
                <li>
                  <a href="/personal-loans">
                    <FontAwesomeIcon icon={faUser} />
                    Personal Loans
                  </a>
                </li>
                <li>
                  <a href="/business-loans">
                    <FontAwesomeIcon icon={faBriefcase} />
                    Business Loans
                  </a>
                </li>
                <li>
                  <a href="/mortgage">
                    <FontAwesomeIcon icon={faHome} />
                    Home Loans
                  </a>
                </li>
                <li>
                  <a href="/auto-loans">
                    <FontAwesomeIcon icon={faCar} />
                    Mortage Loans
                  </a>
                </li>
                <li>
                  <a href="/debt-consolidation">
                    <FontAwesomeIcon icon={faBalanceScale} />
                    OD Loan
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/">
                    <FontAwesomeIcon icon={faHome} />
                    Home
                  </a>
                </li>
                <li>
                  <a href="/calculator">
                    <FontAwesomeIcon icon={faCalculator} />
                    Loan Calculator
                  </a>
                </li>
                <li>
                  <a href="/apply">
                    <FontAwesomeIcon icon={faFileSignature} />
                    Apply Now
                  </a>
                </li>
                <li>
                  <a href="/about">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/faq">
                    <FontAwesomeIcon icon={faQuestionCircle} />
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>
                <FontAwesomeIcon icon={faEnvelope} />
                support@loanpro.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} />
                1-800-LOAN-PRO
              </p>
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                123 Finance Street, Moneyville
              </p>
            </div>
            <div className="newsletter">
              <h5>Stay Updated</h5>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" />
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              &copy; 2025 FinTrust. All rights reserved. | Developed by Geinca
            </p>
            <div className="footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

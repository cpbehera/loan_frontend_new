// src/components/Hero.js
import React from "react";
import "./Hero.css";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg-wrapper">
        <div className="hero-content">
          <div className="hero-bg-slider">
            <div className="hero-bg-slide"></div>
            <div className="hero-bg-slide"></div>
            <div className="hero-bg-slide"></div>
          </div>

          <div className="hero-overlay-content">
            {/* <div className="hero-header-section">
              <div className="hero-title-header">
                <div className="header-tag">
                  <span className="icon-wrapper">
                    <img src="/images/dollar.png" alt="Dollar" />
                  </span>
                  <span className="tag-text">Financial</span>
                </div>
                <div className="header-tag">
                  <span className="icon-wrapper">
                    <img src="/images/arrow.png" alt="Arrow" />
                  </span>
                  <span className="tag-text">Loans</span>
                </div>
              </div>
              <div className="divider-line">
                <img src="/images/staright.png" alt="Divider" />
              </div>
            </div>

            <h1 className="hero-title">
              Whether personal, home, or business - we've got you covered.
            </h1>

            <div className="stats-icon">
              <img src="/images/vector-1.png" />
            </div>

            <div className="hero-actions">
              <button className="btn btn-primary">
                <span>Get Started</span>
                <span>
                  <FaArrowRight />
                </span>
              </button>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-label">Success Loans</div>
                  <div className="stat-value">94.6%</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Lowest Probability</div>
                  <div className="stat-value">0.25%</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

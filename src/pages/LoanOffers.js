// src/pages/LoanOffers.js
import React from 'react';
import { loanOffers } from '../data/MockData';
import { Link } from 'react-router-dom';
import './LoanOffers.css';

const LoanOffers = () => {
  return (
    <div className="loan-offers">
      <div className="offers-header">
        <div className="container">
          <h1>Our Loan Offers</h1>
          <p>Choose from our competitive loan options tailored to your needs</p>
        </div>
      </div>
      
      <div className="container">
        <div className="offers-grid">
          {loanOffers.map(offer => (
            <div key={offer.id} className={`offer-card ${offer.featured ? 'featured' : ''}`}>
              {offer.featured && <div className="featured-badge">Most Popular</div>}
              
              <div className="card-header">
                <div className="loan-icon">
                  <i className={`fas ${offer.icon}`}></i>
                </div>
                <h2>{offer.name}</h2>
                <div className="interest-rate">{offer.interestRate}% APR</div>
              </div>
              
              <div className="offer-details">
                <div className="detail-item">
                  <i className="fas fa-rupee-sign"></i>
                  <div>
                    <span>Maximum Amount</span>
                    <strong>₹{offer.maxAmount.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
                
                <div className="detail-item">
                  <i className="fas fa-calendar-alt"></i>
                  <div>
                    <span>Term</span>
                    <strong>{offer.term}</strong>
                  </div>
                </div>
                
                <div className="detail-item">
                  <i className="fas fa-bolt"></i>
                  <div>
                    <span>Processing Time</span>
                    <strong>{offer.processingTime}</strong>
                  </div>
                </div>
              </div>
              
              <div className="features">
                <h4>Key Features:</h4>
                <ul>
                  {offer.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="card-footer">
                <Link to="/apply" className="btn btn-primary apply-btn">
                  Apply Now <i className="fas fa-arrow-right"></i>
                </Link>
                <Link to={`/loan-details/${offer.id}`} className="btn-link">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="offers-footer">
          <h3>Can't find what you're looking for?</h3>
          <p>Contact our loan specialists for personalized assistance</p>
          <div className="contact-options">
            <div className="contact-option">
              <i className="fas fa-phone"></i>
              <span>Call: 1-800-LOAN-HUB</span>
            </div>
            <div className="contact-option">
              <i className="fas fa-envelope"></i>
              <span>Email: support@loanhub.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanOffers;
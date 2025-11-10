// src/pages/Contact.js
import React from 'react';
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact">
      <div className="container">
        <h1>Contact Us</h1>
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="contact-item">
              <h3>📞 Phone</h3>
              <p>1-800-LOAN-HUB</p>
            </div>
            <div className="contact-item">
              <h3>📧 Email</h3>
              <p>support@loanhub.com</p>
            </div>
            <div className="contact-item">
              <h3>🏢 Address</h3>
              <p>123 Financial District<br />New York, NY 10001</p>
            </div>
          </div>
          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message" rows="5"></textarea>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
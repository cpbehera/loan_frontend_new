// src/pages/Home.js
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { loanOffers } from "../data/MockData";
import { loanServices } from "../data/MockData";
import LoanPopup from "../components/LoanPopup";
import Hero from "../components/Hero";
import FinancialProducts from "../components/FinancialProducts";
import "./Home.css";
import LoanForm from "../components/LoanForm";
import FinancialServices from "../components/FinancialServices";
import Features from "../components/Features";
import Cta from "../components/Cta";
import Testimonial from "../components/Testimonial";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const loanFormRef = useRef(null);

  const handleApplyClick = (loanProduct) => {
    // Set the selected loan type for the form
    const loanTypeMap = {
      "Personal Loan": "personal",
      "Home Loan": "home", 
      "Business Loan": "business",
      "Mortage Loan": "mortage",
      "OD Loan": "od",
      "CC Limit Loan": "cc"
    };
    
    setSelectedLoanType(loanTypeMap[loanProduct.name] || loanProduct.name.toLowerCase());
    
    // Scroll to the loan form section
    if (loanFormRef.current) {
      loanFormRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleServiceApplyClick = (offer) => {
    setSelectedOffer(offer);
    setShowPopup(true);
  };

  return (
    <div className="home-appx">
      <Hero />
      {/* Loan Form Section with ref for scrolling */}
      <div ref={loanFormRef}>
        <LoanForm preSelectedLoanType={selectedLoanType} />
      </div>
      
      {/* Financial Products Section */}
      <FinancialProducts
        loanOffers={loanOffers}
        onApplyClick={handleApplyClick}
      />
      
      
      
      {/* Other Sections */}
      <FinancialServices
        loanServices={loanServices}
        onApplyClick={handleServiceApplyClick}
      />
      <Features />
      <Cta />
      <Testimonial />

      <LoanPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        offer={selectedOffer}
      />
    </div>
  );
};

export default Home;
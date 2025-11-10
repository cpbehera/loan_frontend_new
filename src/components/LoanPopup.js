import React from "react";
import "./LoanPopup.css";
import DynamicLoanForm from "./DynamicLoanForm";

const LoanPopup = ({ show, onClose, offer }) => {
  if (!show || !offer) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        {/* Pass the correct loanType */}
        <DynamicLoanForm loanType={offer.loanType} />
      </div>
    </div>
  );
};

export default LoanPopup;

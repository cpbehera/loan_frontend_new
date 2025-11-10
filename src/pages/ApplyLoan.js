// src/pages/ApplyLoan.js
import React, { useState } from 'react';
import { businessLoanDocs, homeLoanDocs } from '../data/MockData';
import './ApplyLoan.css';

export default function ApplyLoan() {
  const [loanType, setLoanType] = useState('business'); // 'business' | 'home'
  const docs = loanType === 'business' ? businessLoanDocs : homeLoanDocs;

  return (
    <div className="apply-loan-container">
      <h1>Apply for a Loan</h1>

      <div className="loan-type-toggle">
        <button
          className={loanType === 'business' ? 'active' : ''}
          onClick={() => setLoanType('business')}
        >
          Business Loan
        </button>
        <button
          className={loanType === 'home' ? 'active' : ''}
          onClick={() => setLoanType('home')}
        >
          Home Loan
        </button>
      </div>

      <form className="loan-form">
        <h2>
          {loanType === 'business'
            ? 'Business Loan Documents'
            : 'Home Loan Documents'}
        </h2>
        {docs.map((doc) => (
          <div key={doc.id} className="form-group">
            <label>{doc.name}</label>
            <input type="file" />
          </div>
        ))}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

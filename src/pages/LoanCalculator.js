// src/pages/LoanCalculator.js
import React, { useState } from 'react';
import { calculateEMI, calculateTotalInterest, generateAmortizationSchedule } from '../utils/calculations';
import './LoanCalculator.css';

const LoanCalculator = () => {
  const [formData, setFormData] = useState({
    loanAmount: 10000,
    interestRate: 8.5,
    loanTerm: 5
  });
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const calculateLoan = () => {
    const emi = calculateEMI(formData.loanAmount, formData.interestRate, formData.loanTerm);
    const totalInterest = calculateTotalInterest(emi, formData.loanAmount, formData.loanTerm);
    const schedule = generateAmortizationSchedule(formData.loanAmount, formData.interestRate, formData.loanTerm);

    setResults({
      emi,
      totalInterest,
      totalPayment: (parseFloat(emi) * formData.loanTerm * 12).toFixed(2),
      schedule: schedule.slice(0, 12) // Show first year only
    });
  };

  return (
    <div className="loan-calculator">
      <div className="calculator-header">
        <div className="container">
          <h1>Loan Calculator</h1>
          <p>Calculate your monthly payments and see a detailed amortization schedule</p>
        </div>
      </div>
      
      <div className="container">
        <div className="calculator-container">
          <div className="calculator-form">
            <div className="form-card">
              <h2>Loan Details</h2>
              
              <div className="form-group">
                <div className="form-header">
                  <label>Loan Amount</label>
                  <span className="value-display">${formData.loanAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  name="loanAmount"
                  min="1000"
                  max="1000000"
                  step="1000"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  className="slider"
                />
                <div className="range-labels">
                  <span>$1,000</span>
                  <span>$1,000,000</span>
                </div>
              </div>

              <div className="form-group">
                <div className="form-header">
                  <label>Interest Rate</label>
                  <span className="value-display">{formData.interestRate}%</span>
                </div>
                <input
                  type="range"
                  name="interestRate"
                  min="1"
                  max="20"
                  step="0.1"
                  value={formData.interestRate}
                  onChange={handleInputChange}
                  className="slider"
                />
                <div className="range-labels">
                  <span>1%</span>
                  <span>20%</span>
                </div>
              </div>

              <div className="form-group">
                <div className="form-header">
                  <label>Loan Term</label>
                  <span className="value-display">{formData.loanTerm} years</span>
                </div>
                <input
                  type="range"
                  name="loanTerm"
                  min="1"
                  max="30"
                  step="1"
                  value={formData.loanTerm}
                  onChange={handleInputChange}
                  className="slider"
                />
                <div className="range-labels">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>

              <button onClick={calculateLoan} className="btn btn-primary calculate-btn">
                Calculate EMI
              </button>
            </div>
          </div>

          {results && (
            <div className="calculator-results">
              <div className="results-card">
                <div className="results-summary">
                  <h3>Loan Summary</h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <div className="summary-icon">
                        <i className="fas fa-calendar-alt"></i>
                      </div>
                      <div className="summary-content">
                        <span>Monthly Payment</span>
                        <strong>${results.emi}</strong>
                      </div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-icon">
                        <i className="fas fa-percentage"></i>
                      </div>
                      <div className="summary-content">
                        <span>Total Interest</span>
                        <strong>${results.totalInterest}</strong>
                      </div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-icon">
                        <i className="fas fa-dollar-sign"></i>
                      </div>
                      <div className="summary-content">
                        <span>Total Payment</span>
                        <strong>${results.totalPayment}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="amortization-schedule">
                  <h4>First Year Payment Schedule</h4>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Payment</th>
                          <th>Principal</th>
                          <th>Interest</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.schedule.map(row => (
                          <tr key={row.month}>
                            <td>{row.month}</td>
                            <td>${parseFloat(row.payment).toFixed(2)}</td>
                            <td>${parseFloat(row.principal).toFixed(2)}</td>
                            <td>${parseFloat(row.interest).toFixed(2)}</td>
                            <td>${parseFloat(row.balance).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {!results && (
          <div className="calculator-placeholder">
            <div className="placeholder-content">
              <i className="fas fa-calculator"></i>
              <h3>Enter your loan details to see calculations</h3>
              <p>Adjust the sliders above and click "Calculate EMI" to see your payment breakdown</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
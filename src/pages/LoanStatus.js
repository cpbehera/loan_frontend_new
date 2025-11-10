// src/pages/LoanStatus.js
import React from 'react';
import { loanApplications } from '../data/MockData';
import './LoanStatus.css';

export default function LoanStatus() {
  return (
    <div className="loan-status-container">
      <h1>Your Loan Applications</h1>

      <table className="loan-status-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Applicant Name</th>
            <th>Loan Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Applied Date</th>
          </tr>
        </thead>
        <tbody>
          {loanApplications.map((application) => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.applicantName}</td>
              <td>{application.loanType}</td>
              <td>{application.amount.toLocaleString()}</td>
              <td className={`status ${application.status.toLowerCase()}`}>
                {application.status}
              </td>
              <td>{application.appliedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

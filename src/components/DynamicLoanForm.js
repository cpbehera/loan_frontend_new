// src/components/DynamicLoanForm.js
import React, { useState } from "react";
import { loanForms } from "../data/LoanForms";

export default function DynamicLoanForm({ loanType }) {
  const [incomeType, setIncomeType] = useState(""); // Job or Business
  const fields = loanForms[loanType];

  return (
    <form className="loan-form">
      <h2>{loanType.toUpperCase()} Loan Form</h2>
      {fields.map((field) => {
        if (field.condition && field.condition !== incomeType) {
          return null; // Skip fields not matching Job/Business
        }

        if (field.type === "select") {
          return (
            <div className="form-group" key={field.id}>
              <label>{field.label}</label>
              <select
                onChange={(e) => setIncomeType(e.target.value)}
                required
              >
                <option value="">Select</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return (
          <div className="form-group" key={field.id}>
            <label>{field.label}</label>
            <input type={field.type} name={field.id} required />
          </div>
        );
      })}
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
}

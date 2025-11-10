import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./LoanForm.css";
import BankingPage from './BankingPage';

const LoanForm = ({ preSelectedLoanType, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    employmentStatus: "",
    monthlyIncome: "",
    loanType: preSelectedLoanType || "",
    loanAmount: "",
    loanPurpose: "",
  });

  const [step, setStep] = useState("form");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cibilScore] = useState(Math.floor(650 + Math.random() * 150));
  const [applicationId, setApplicationId] = useState(null);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Fetch banks from backend with proper error handling
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        console.log("🔄 Fetching banks from backend...");
        const response = await fetch("http://localhost:5000/api/banks");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setBanks(data);
          console.log(`✅ Loaded ${data.length} banks`);
        } else {
          console.error("❌ Banks data is not an array:", data);
          setBanks([]);
        }
      } catch (error) {
        console.error("❌ Error fetching banks:", error);
        setBanks([]);
      }
    };
    fetchBanks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // File upload handler
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    console.log(`File selected for ${name}:`, files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep("approval");
  };

  // Save application to backend
  const saveApplicationToBackend = async () => {
    try {
      const applicationData = {
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`,
        cibilScore: cibilScore,
        submittedAt: new Date().toLocaleString(),
      };

      console.log("Saving application:", applicationData);

      const response = await fetch("http://localhost:5000/api/loan-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loan_type: formData.loanType,
          application_data: applicationData
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Application saved:", result);
        setApplicationId(result.id);
        return result.id;
      } else {
        throw new Error(result.error || "Failed to save application");
      }
    } catch (error) {
      console.error("❌ Error saving application:", error);
      throw error;
    }
  };

  // Handle bank selection
  const handleBankSelection = async (bankId) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`http://localhost:5000/api/loan-applications/${applicationId}/select-bank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bank_id: bankId
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const selectedBank = banks.find(bank => bank.id === bankId);
        setSelectedBank(selectedBank);
        alert(`✅ ${selectedBank.name} selected successfully! Your loan is approved.`);
        setStep("final");
      } else {
        throw new Error(result.error || "Failed to select bank");
      }
    } catch (error) {
      alert("❌ Failed to select bank: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Razorpay payment integration - DIRECT PAYMENT
  const handlePayment = async () => {
    try {
      setIsSubmitting(true);

      console.log("💾 Saving application to backend...");
      const appId = await saveApplicationToBackend();

      setApplicationId(appId);
      console.log("✅ Application ID Saved:", appId);

      const options = {
        key: "rzp_test_lZFlaRxE8skXuU",
        amount: 49900,
        currency: "INR",
        name: "Loan Platform Fee",
        description: "Processing Fee for Loan Application",
        handler: async function (response) {
          try {
            console.log("✅ Payment Successful:", response);
            console.log("📝 Application ID for banking:", appId);

            setStep("success");

          } catch (error) {
            console.error("❌ Error after payment:", error);
            alert("Payment successful but there was an error updating your application.");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phoneNumber,
        },
        theme: { color: "#1E88E5" },
        modal: {
          ondismiss: function () {
            console.log("Payment modal dismissed");
            setIsSubmitting(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("❌ Error initiating payment:", error);
      alert("Failed to initiate payment. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      employmentStatus: "",
      monthlyIncome: "",
      loanType: preSelectedLoanType || "",
      loanAmount: "",
      loanPurpose: "",
    });
    setAgreed(false);
    setApplicationId(null);
    setSelectedBank(null);
    setStep("form");
    setShowTermsModal(false);

    // Close popup if onClose function provided
    if (onClose) {
      onClose();
    }
  };

  // Calculate approved loan amount
  const calculateApprovedAmount = () => {
    const requestedAmount = parseInt(formData.loanAmount.replace(/[^0-9]/g, '')) || 0;
    return Math.floor(requestedAmount * 0.8);
  };

  const approvedAmount = calculateApprovedAmount();

  // Terms and Conditions Modal Component
  const TermsAndConditionsModal = () => (
    <div className="modal-overlay terms-modal-overlay">
      <div className="modal-content terms-modal">
        <button 
          className="modal-close-btn" 
          onClick={() => setShowTermsModal(false)}
        >
          &times;
        </button>

        <div className="modal-header">
          <h2>Terms and Conditions</h2>
          <div className="modal-gradient-border"></div>
        </div>

        <div className="terms-content">
          <div className="terms-section">
    
            <p>By applying for a loan, the applicant agrees to the following terms and conditions. Loan approval is subject to verification of the applicant’s eligibility, which includes assessment of personal, financial, and employment details, as well as creditworthiness as determined by the Company. Submission of false or misleading information may result in immediate rejection or cancellation of the loan application without notice.</p>
          </div>

          <div className="terms-section">
          
            <p>A non-refundable platform fee of ₹499 shall be charged to every applicant during the loan processing stage. This fee covers administrative and verification costs and will not be refunded under any circumstances, regardless of whether the loan application is approved or rejected.</p>
          </div>

          <div className="terms-section">
          
            <p>The loan amount, interest rate, tenure, and applicable charges will be communicated to the applicant upon approval. The Company reserves the right to modify these rates or terms at any time in accordance with its internal policies or regulatory changes. Disbursement of the loan shall occur only after successful completion of all verification processes, execution of the loan agreement, and payment of any applicable fees or charges.</p>
            <p>
              Repayment of the loan must be made in accordance with the schedule provided in the loan agreement. Any delay or default in repayment may result in penalty charges, additional interest, and may adversely affect the borrower’s credit score. The borrower may choose to prepay or foreclose the loan, subject to the conditions and charges defined in the agreement.
            </p>
          </div>

          <div className="terms-section">
           
            <p>In case of default, the Company reserves the right to initiate recovery proceedings and report the borrower’s credit performance to credit bureaus as per regulatory guidelines. All recovery-related costs and legal expenses shall be borne by the borrower.</p>
          </div>

          <div className="terms-section">
         
            <p>The Company retains the right to amend, revise, or update these terms and conditions without prior notice. The updated version will be made available through the Company’s official communication channels.</p>
          </div>

          <div className="terms-section">
           
            <p>These terms and conditions shall be governed by and construed in accordance with the laws of India, and any dispute arising herefrom shall fall under the exclusive jurisdiction of the competent courts of India.</p>
          </div>

          <div className="terms-section">
           
            <p>You consent to receive communications related to your loan application via email, SMS, phone calls, and other electronic means.</p>
          </div>

          <div className="terms-section">
           
            <p>These terms and conditions are governed by the laws of India, and any disputes shall be subject to the jurisdiction of courts in Mumbai.</p>
          </div>

          <div className="terms-acknowledgement">
            <p><strong>By checking the agreement box, you acknowledge that you have read, understood, and agree to all the terms and conditions mentioned above.</strong></p>
          </div>
        </div>

        <div className="terms-modal-footer">
          <button 
            className="close-terms-button"
            onClick={() => setShowTermsModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="loan-form-container">
      <div className="loan-form-wrapper">
        {/* Terms and Conditions Modal */}
        {showTermsModal && <TermsAndConditionsModal />}

        {/* STEP 1: Main Form */}
        {step === "form" && (
          <>
            <div className="loan-form-header">
              <div className="loan-form-badge">
                <img src="/images/loan-icon.png" alt="Loan Icon" />
                <span>Quick & Easy Application</span>
              </div>
              <h1>Apply for Your Loan <span>Today</span></h1>
              <p>Fill out the form below and get approved in minutes! ⚡</p>
            </div>

            <form onSubmit={handleSubmit} className="loan-form">
              {/* Personal Information Section */}
              <div className="form-section">
                <div className="form-section-header">
                  <span>1</span>
                  <h2>Personal Information</h2>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number *</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="9876543210"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Employment & Income Section */}
              <div className="form-section">
                <div className="form-section-header">
                  <span>2</span>
                  <h2>Employment & Income</h2>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="employmentStatus">Employment Status *</label>
                    <select
                      id="employmentStatus"
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select status</option>
                      <option value="employed">Employed</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="student">Student</option>
                      <option value="retired">Retired</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="monthlyIncome">Monthly Income *</label>
                    <input
                      type="text"
                      id="monthlyIncome"
                      name="monthlyIncome"
                      value={formData.monthlyIncome}
                      onChange={handleChange}
                      placeholder="₹50,000"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Loan Details Section */}
              <div className="form-section">
                <div className="form-section-header">
                  <span>3</span>
                  <h2>Loan Details</h2>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="loanType">Loan Type *</label>
                    <select
                      id="loanType"
                      name="loanType"
                      value={formData.loanType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select loan type</option>
                      <option value="personal">Personal Loan</option>
                      <option value="business">Business Loan</option>
                      <option value="home">Home Loan</option>
                      <option value="mortage">Mortgage Loan</option>
                      <option value="od">OD Loan</option>
                      <option value="cc">CC Limit Loan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="loanAmount">Loan Amount *</label>
                    <input
                      type="text"
                      id="loanAmount"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      placeholder="₹3,00,000"
                      required
                    />
                  </div>
                </div>

                {/* --- Conditional Fields Based on Loan Type --- */}
                {formData.loanType === "personal" && (
                  <div className="extra-docs">
                    <h4>Upload Required Documents (Personal Loan)</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Aadhar Card Front *</label>
                        <input
                          type="file"
                          name="aadharFront"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Aadhar Card Back *</label>
                        <input
                          type="file"
                          name="aadharBack"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>PAN Card Photo *</label>
                      <input
                        type="file"
                        name="panCard"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                      />
                    </div>
                  </div>
                )}

                {formData.loanType === "business" && (
                  <div className="extra-docs">
                    <h4>Upload Required Documents (Business Loan)</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>ITR/GST/Udyam Registration *</label>
                        <input
                          type="file"
                          name="businessProof"
                          onChange={handleFileChange}
                          accept="image/*,application/pdf"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>PAN Card Photo *</label>
                        <input
                          type="file"
                          name="panCard"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Aadhar Card *</label>
                        <input
                          type="file"
                          name="aadharFront"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.loanType === "home" && (
                  <div className="extra-docs">
                    <h4>Upload Required Documents (Home Loan)</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Property Document *</label>
                        <input
                          type="file"
                          name="propertyDocs"
                          onChange={handleFileChange}
                          accept="image/*,application/pdf"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>PAN Card Photo *</label>
                        <input
                          type="file"
                          name="panCard"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Aadhar Card *</label>
                        <input
                          type="file"
                          name="aadharFront"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.loanType === "mortage" && (
                  <div className="extra-docs">
                    <h4>Upload Required Documents (Mortgage Loan)</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>ITR/GST/Udyam Registration *</label>
                        <input
                          type="file"
                          name="propertyDocs"
                          onChange={handleFileChange}
                          accept="image/*,application/pdf"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>PAN Card Photo *</label>
                        <input
                          type="file"
                          name="panCard"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Aadhar Card *</label>
                        <input
                          type="file"
                          name="aadharFront"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.loanType === "od" && (
                  <div className="extra-docs">
                    <h4>Upload Required Documents (OD Loan)</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>ITR/GST/Udyam Registration *</label>
                        <input
                          type="file"
                          name="propertyDocs"
                          onChange={handleFileChange}
                          accept="image/*,application/pdf"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>PAN Card Photo *</label>
                        <input
                          type="file"
                          name="panCard"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Aadhar Card *</label>
                        <input
                          type="file"
                          name="aadharFront"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.loanType === "cc" && (
                  <div className="extra-docs">
                    <h4>Upload Required Documents (CC Limit Loan)</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>ITR/GST/Udyam Registration *</label>
                        <input
                          type="file"
                          name="propertyDocs"
                          onChange={handleFileChange}
                          accept="image/*,application/pdf"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>PAN Card Photo *</label>
                        <input
                          type="file"
                          name="panCard"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Aadhar Card *</label>
                        <input
                          type="file"
                          name="aadharFront"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" className="submit-button">
                Submit Application 🚀
              </button>
            </form>
          </>
        )}

        {/* STEP 2: Loan Approval Page - DIRECT TO PAYMENT */}
        {step === "approval" && (
          <div className="modal-overlay">
            <div className="modal-content approval-modal">
              <button className="modal-close-btn" onClick={resetForm}>
                &times;
              </button>

              <div className="modal-header">
                <h2>Loan Approved! 🎉</h2>
                <div className="modal-gradient-border"></div>
              </div>

              <div className="approval-content">
                <div className="approval-badge">
                  <div className="approval-icon">✅</div>
                  <h3>Congratulations! Your Loan {formData.loanAmount} is Pre-Approved</h3>
                </div>

                <div className="loan-details-card">
                  <div className="loan-detail-item">
                    <span className="detail-label">Requested Amount:</span>
                    <span className="detail-value">{formData.loanAmount}</span>
                  </div>
                  <div className="loan-detail-item">
                    <span className="detail-label">Approved Amount:</span>
                    <span className="detail-value approved">₹{approvedAmount.toLocaleString()}</span>
                  </div>
                  <div className="loan-detail-item">
                    <span className="detail-label">Loan Type:</span>
                    <span className="detail-value">{formData.loanType}</span>
                  </div>
                </div>
                <div className="terms-agreement">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="terms-checkbox"
                    />
                    <span className="checkbox-text">
                      I have read and agree to all{" "}
                      <span 
                        className="terms-link"
                        onClick={() => setShowTermsModal(true)}
                      >
                        terms & conditions
                      </span>
                    </span>
                  </label>
                </div>
                
                {/* ✅ DIRECT PAYMENT BUTTON - NO EXTRA STEP */}
                <button
                  className={`proceed-button ${!agreed ? "disabled" : ""}`}
                  disabled={!agreed}
                  onClick={handlePayment}
                >
                  {isSubmitting ? "Processing..." : "Pay ₹499 & Grab Your Loan 💳"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Success Page with Add Bank */}
        {step === "success" && (
          <div className="modal-overlay">
            <div className="modal-content success-modal">
              <button className="modal-close-btn" onClick={resetForm}>
                &times;
              </button>

              <div className="modal-header">
                <h2>Payment Successful! 🎉</h2>
                <div className="modal-gradient-border"></div>
              </div>

              <div className="success-content">
                <div className="success-badge">
                  <div className="success-icon">✅</div>
                  <h3>Payment Completed Successfully</h3>
                </div>

                <div className="application-summary">
                  <h4>Application Summary:</h4>
                  <div className="summary-item">
                    <span>Loan Amount:</span>
                    <span>₹{approvedAmount.toLocaleString()}</span>
                  </div>
                  <div className="summary-item">
                    <span>Loan Type:</span>
                    <span>{formData.loanType}</span>
                  </div>
                  <div className="summary-item">
                    <span>Application ID:</span>
                    <span>#{applicationId || 'Generating...'}</span>
                  </div>
                  <div className="summary-item">
                    <span>CIBIL Status:</span>
                    <span className="status-approved">Approved ✅</span>
                  </div>
                </div>

                <div className="next-steps">
                  <h4>Next Step: Select Bank</h4>
                  <p>Choose your preferred bank for loan disbursement.</p>

                  <button
                    className="add-bank-button"
                    onClick={() => {
                      console.log("🏦 Moving to banking page with:", {
                        applicationId: applicationId,
                        loanAmount: approvedAmount
                      });
                      setStep("banking");
                    }}
                  >
                    Select Bank 🏦
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Banking Page */}
        {step === "banking" && (
          <div className="modal-overlay">
            <div className="modals-content banking-modal-large">
              <button className="modal-close-btn" onClick={() => setStep("success")}>
                &times;
              </button>

              <div className="modal-header">
                <h2>Select Your Bank 🏦</h2>
                <div className="modal-gradient-border"></div>
              </div>

              <div className="banking-modal-content">
                <BankingPage
                  applicationId={applicationId}
                  loanData={{
                    loanAmount: approvedAmount,
                    loanType: formData.loanType,
                    monthlyIncome: formData.monthlyIncome,
                    employmentStatus: formData.employmentStatus
                  }}
                  onBack={() => setStep("success")}
                  onBankSelect={(bank) => {
                    console.log("Bank selected:", bank);
                    setSelectedBank(bank);
                    setStep("final");
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Final Approval Page */}
        {step === "final" && selectedBank && (
          <div className="modal-overlay">
            <div className="modal-content final-modal">
              <button className="modal-close-btn" onClick={resetForm}>
                &times;
              </button>

              <div className="modal-header">
                <h2>Loan Process Complete! 🎉</h2>
                <div className="modal-gradient-border"></div>
              </div>

              <div className="final-content">
                <div className="final-badge">
                  <div className="final-icon">✅</div>
                  <h3>Your Loan is Fully Approved!</h3>
                </div>

                <div className="final-details">
                  <div className="detail-card">
                    <h4>Bank Details</h4>
                    <div className="detail-item">
                      <span>Selected Bank:</span>
                      <span>{selectedBank.name}</span>
                    </div>
                    <div className="detail-item">
                      <span>ROI Range:</span>
                      <span>{selectedBank.roi_min}% - {selectedBank.roi_max}%</span>
                    </div>
                    <div className="detail-item">
                      <span>Processing Time:</span>
                      <span>{selectedBank.processing_time}</span>
                    </div>
                  </div>

                  <div className="detail-card">
                    <h4>Loan Details</h4>
                    <div className="detail-item">
                      <span>Approved Amount:</span>
                      <span>₹{approvedAmount.toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <span>CIBIL Score:</span>
                      <span>{cibilScore} (Approved ✅)</span>
                    </div>
                    <div className="detail-item">
                      <span>Application ID:</span>
                      <span>#{applicationId}</span>
                    </div>
                  </div>
                </div>

                <button className="complete-button" onClick={resetForm}>
                  Apply for Another Loan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanForm;
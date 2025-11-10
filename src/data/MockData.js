// src/data/MockData.js
import ITRImage from '../assets/images/itr.jpg';
import GSTImage from '../assets/images/gst.jpg';
import UDAYAMImage from '../assets/images/udayam.webp';
import balancesheetImage from '../assets/images/balance-sheet.jpg';

export const loanServices = [
  {
    id: 1,
    name: "ITR Filing",
    loanType: "personal",
    interestRate: 12,
    maxAmount: 500000,
    features: ["Quick approval", "No collateral", "Flexible repayment"],
    image: ITRImage,
    description: "Meet your personal needs with flexible repayment options"
  },
  {
    id: 2,
    name: "GST Registration",
    loanType: "home",
    interestRate: 8.5,
    maxAmount: 2000000,
    features: ["Low interest rates", "Long tenure", "Top-up facility"],
    image: GSTImage,
    description: "Realize your dream of owning a home with competitive rates"
  },
  {
    id: 3,
    name: "UDYAM Registration",
    loanType: "business",
    interestRate: 10,
    maxAmount: 5000000,
    features: ["Collateral-free options", "Business growth support", "Customized solutions"],
    image: UDAYAMImage,
    description: "Fuel your business growth with customized financing"
  },
  {
    id: 4,
    name: "Balance Sheet Service",
    loanType: "mortage",
    interestRate: 9.5,
    maxAmount: 3000000,
    features: ["Property financing", "Competitive rates", "Easy documentation"],
    image: balancesheetImage,
    description: "Get the best mortgage solutions for your property"
  }
];

// Loan offers for LoanOffers / Home page
export const loanOffers = [
  {
    loanType: "personal",
    interestRate: 12,
    maxAmount: 500000,       // ← make sure this exists
    features: ["Quick approval", "No collateral"]
  },
  {
    loanType: "business",
    interestRate: 8,
    maxAmount: 5000000,      // ← make sure this exists
    features: ["Long tenure", "Low EMI"]
  },
  {
    loanType: "home",
    interestRate: 10,
    maxAmount: 2000000,      // ← make sure this exists
    features: ["Fast processing", "Minimal documents"]
  },
  {
    loanType: "mortage",
    interestRate: 10,
    maxAmount: 2000000,      // ← make sure this exists
    features: ["Fast processing", "Minimal documents"]
  },
  {
    loanType: "od",
    interestRate: 10,
    maxAmount: 2000000,      // ← make sure this exists
    features: ["Fast processing", "Minimal documents"]
  },
  {
    loanType: "cc",
    interestRate: 10,
    maxAmount: 2000000,      // ← make sure this exists
    features: ["Fast processing", "Minimal documents"]
  }
];

// Calculator presets (optional)
export const loanCalculatorPresets = [
  {
    id: 1,
    title: "Personal Loan",
    amount: 50000,
    rate: 11.5,
    term: 3
  },
  {
    id: 2,
    title: "Home Loan",
    amount: 1000000,
    rate: 8.25,
    term: 20
  },
  {
    id: 3,
    title: "Car Loan",
    amount: 200000,
    rate: 9.0,
    term: 5
  },
  {
    id: 4,
    title: "Education Loan",
    amount: 300000,
    rate: 10.0,
    term: 7
  }
];

// Sample loan application statuses (frontend-only, can use for LoanStatus page)
export const sampleLoanStatus = [
  {
    id: 1,
    name: "John Doe",
    loanType: "Personal Loan",
    amount: 75000,
    status: "Approved",
    appliedAt: "2025-09-20"
  },
  {
    id: 2,
    name: "Jane Smith",
    loanType: "Home Loan",
    amount: 1200000,
    status: "Pending",
    appliedAt: "2025-09-22"
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    loanType: "Car Loan",
    amount: 250000,
    status: "Rejected",
    appliedAt: "2025-09-21"
  }
];

export const loanApplications = [
  {
    id: 1,
    applicantName: 'John Doe',
    loanType: 'Business Loan',
    amount: 75000,
    status: 'Approved',
    appliedDate: '2025-09-20'
  },
  {
    id: 2,
    applicantName: 'Jane Smith',
    loanType: 'Home Loan',
    amount: 1200000,
    status: 'Pending',
    appliedDate: '2025-09-22'
  },
  {
    id: 3,
    applicantName: 'Ravi Kumar',
    loanType: 'Business Loan',
    amount: 250000,
    status: 'Rejected',
    appliedDate: '2025-09-25'
  }
];

export const businessLoanDocs = [
  { id: 1, name: "Aadhaar Front & Back Photo" },
  { id: 2, name: "Bank Statement (6 months till date)" },
  { id: 3, name: "ITR 3 Years / GST / UDYAM" },
  { id: 4, name: "Shop Photo" }
];

export const homeLoanDocs = [
  { id: 1, name: "Aadhaar Front & Back Photo" },
  { id: 2, name: "Bank Statement (6 months till date)" },
  { id: 3, name: "ITR 3 Years / GST / UDYAM / Job 3 months salary slip" },
  { id: 4, name: "Property Papers" }
];

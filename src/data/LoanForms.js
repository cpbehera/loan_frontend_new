// src/data/LoanForms.js

export const loanForms = {
  personal: [
    { id: "customerName", label: "Customer Name", type: "text" },
    { id: "aadharFront", label: "Customer Aadhar Card Front Page", type: "file" },
    { id: "aadharBack", label: "Aadhar Card Back Side Photo", type: "file" },
    { id: "panCard", label: "PAN Card Photo", type: "file" },
    {
      id: "jobBusinessIncome",
      label: "Job / Business Income Documents",
      type: "select",
      options: ["Job", "Business"],
    },
    {
      id: "salarySlip",
      label: "3 Months Latest Salary Slip (Job Only)",
      type: "file",
      condition: "Job",
    },
    {
      id: "businessItr",
      label: "ITR 3 Years (Business Only)",
      type: "file",
      condition: "Business",
    },
    {
      id: "bankStatement",
      label: "Bank Statement (6 Months)",
      type: "file",
    },
  ],

  // 🏠 Home Loan Form
  home: [
    { id: "customerName", label: "Customer Name", type: "text" },
    { id: "aadharFrontBack", label: "Aadhaar Front & Back Photo", type: "file" },
    { id: "bankStatement", label: "Bank Statement (6 months till date)", type: "file" },
    {
      id: "incomeDocs",
      label: "ITR 3 Years / GST / UDYAM / Job 3 months salary slip",
      type: "file",
    },
    { id: "propertyPapers", label: "Property Papers", type: "file" },
  ],

  // 🏢 Business Loan Form
  business: [
    { id: "customerName", label: "Customer Name", type: "text" },
    { id: "aadharFrontBack", label: "Aadhaar Front & Back Photo", type: "file" },
    { id: "bankStatement", label: "Bank Statement (6 months till date)", type: "file" },
    { id: "itrDocs", label: "ITR 3 Years / GST / UDYAM", type: "file" },
    { id: "shopPhoto", label: "Shop Photo", type: "file" },
  ],
};

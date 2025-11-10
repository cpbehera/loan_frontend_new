// src/utils/calculations.js
export const calculateEMI = (principal, annualRate, years) => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  const emi = principal * monthlyRate * 
    Math.pow(1 + monthlyRate, numberOfPayments) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  return emi.toFixed(2);
};

export const calculateTotalInterest = (emi, principal, years) => {
  return (emi * years * 12 - principal).toFixed(2);
};

export const generateAmortizationSchedule = (principal, annualRate, years) => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  const emi = calculateEMI(principal, annualRate, years);
  let balance = principal;
  const schedule = [];

  for (let i = 1; i <= numberOfPayments; i++) {
    const interest = balance * monthlyRate;
    const principalPayment = emi - interest;
    balance -= principalPayment;

    schedule.push({
      month: i,
      payment: emi,
      principal: principalPayment.toFixed(2),
      interest: interest.toFixed(2),
      balance: Math.max(balance, 0).toFixed(2)
    });
  }

  return schedule;
};
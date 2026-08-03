export type EmiResult = {
  emi: number;
  totalInterest: number;
  totalAmount: number;
  schedule: { month: number; principal: number; interest: number; balance: number }[];
};

export function calculateEmi(principal: number, annualRatePct: number, tenureYears: number): EmiResult {
  const monthlyRate = annualRatePct / 12 / 100;
  const months = Math.round(tenureYears * 12);

  if (principal <= 0 || months <= 0) {
    return { emi: 0, totalInterest: 0, totalAmount: 0, schedule: [] };
  }

  const emi =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  let balance = principal;
  const schedule: EmiResult["schedule"] = [];

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = emi - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({
      month,
      principal: Math.round(principalPaid),
      interest: Math.round(interest),
      balance: Math.round(balance),
    });
  }

  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalAmount: Math.round(totalAmount),
    schedule,
  };
}

export type EligibilityInput = {
  monthlyIncome: number;
  occupation: "salaried" | "self-employed" | "professional" | "business-owner";
  age: number;
  currentEmi: number;
  creditScore: number;
  loanType: "home" | "personal" | "business" | "car" | "education" | "loan-against-property";
};

const loanTypeMultiplier: Record<EligibilityInput["loanType"], number> = {
  home: 60,
  "loan-against-property": 55,
  business: 40,
  car: 45,
  education: 50,
  personal: 24,
};

const loanTypeRate: Record<EligibilityInput["loanType"], number> = {
  home: 8.35,
  "loan-against-property": 9.0,
  business: 11.0,
  car: 8.7,
  education: 9.5,
  personal: 10.5,
};

export function calculateEligibility(input: EligibilityInput) {
  const { monthlyIncome, age, currentEmi, creditScore, loanType } = input;

  const maxTenureYears = Math.max(1, Math.min(30, 65 - age));
  const foirCap = creditScore >= 750 ? 0.55 : creditScore >= 700 ? 0.5 : creditScore >= 650 ? 0.45 : 0.35;

  const maxEmiCapacity = Math.max(0, monthlyIncome * foirCap - currentEmi);
  const rate = loanTypeRate[loanType];
  const monthlyRate = rate / 12 / 100;
  const months = maxTenureYears * 12;

  const eligibleAmountByEmi =
    monthlyRate === 0
      ? maxEmiCapacity * months
      : (maxEmiCapacity * (Math.pow(1 + monthlyRate, months) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, months));

  const eligibleAmountByIncomeMultiple = monthlyIncome * loanTypeMultiplier[loanType];

  const eligibleAmount = Math.min(eligibleAmountByEmi, eligibleAmountByIncomeMultiple);

  return {
    eligibleAmount: Math.round(Math.max(0, eligibleAmount) / 1000) * 1000,
    maxEmiCapacity: Math.round(maxEmiCapacity),
    maxTenureYears,
    suggestedRate: rate,
  };
}

export function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} Lakh`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatINRFull(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

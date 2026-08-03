export type PartnerBank = {
  name: string;
  shortName: string;
  type: "Public Sector" | "Private Sector" | "NBFC" | "Housing Finance";
};

export const partnerBanks: PartnerBank[] = [
  { name: "State Bank of India", shortName: "SBI", type: "Public Sector" },
  { name: "HDFC Bank", shortName: "HDFC", type: "Private Sector" },
  { name: "ICICI Bank", shortName: "ICICI", type: "Private Sector" },
  { name: "Axis Bank", shortName: "Axis", type: "Private Sector" },
  { name: "Punjab National Bank", shortName: "PNB", type: "Public Sector" },
  { name: "Bank of Baroda", shortName: "BoB", type: "Public Sector" },
  { name: "Kotak Mahindra Bank", shortName: "Kotak", type: "Private Sector" },
  { name: "LIC Housing Finance", shortName: "LIC HFL", type: "Housing Finance" },
  { name: "Bajaj Finserv", shortName: "Bajaj", type: "NBFC" },
  { name: "Tata Capital", shortName: "Tata Capital", type: "NBFC" },
  { name: "IDFC FIRST Bank", shortName: "IDFC FIRST", type: "Private Sector" },
  { name: "Canara Bank", shortName: "Canara", type: "Public Sector" },
];

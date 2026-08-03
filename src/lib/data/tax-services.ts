export type TaxService = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  price: string;
  timeline: string;
  benefits: string[];
  process: { step: string; description: string }[];
  documents: string[];
  faqs: { question: string; answer: string }[];
};

export const taxServices: TaxService[] = [
  {
    slug: "gst-registration",
    name: "GST Registration",
    tagline: "Get your GSTIN in as little as 3 working days",
    description:
      "We handle end-to-end GST registration for proprietorships, partnerships and companies — from document preparation to ARN tracking and GSTIN issuance.",
    icon: "FileCheck2",
    price: "Starts at ₹1,499",
    timeline: "3-7 working days",
    benefits: ["Legal recognition as a supplier", "Input tax credit eligibility", "Simplified interstate trade", "Improved business credibility"],
    process: [
      { step: "Document Collection", description: "We collect PAN, address proof and business details." },
      { step: "Application Filing", description: "Application filed on the GST portal with required annexures." },
      { step: "ARN Generation", description: "Acknowledgement Reference Number issued instantly." },
      { step: "GSTIN Issued", description: "GST certificate issued after department verification." },
    ],
    documents: ["PAN card of business/proprietor", "Aadhaar card", "Business address proof", "Bank account statement/cancelled cheque", "Passport size photo"],
    faqs: [{ question: "Is GST registration mandatory for all businesses?", answer: "Mandatory for businesses with turnover above ₹40 lakh (₹20 lakh for services), or those doing interstate supply/e-commerce." }],
  },
  {
    slug: "gst-filing",
    name: "GST Filing",
    tagline: "Never miss a GST return deadline again",
    description:
      "Monthly, quarterly and annual GST return filing (GSTR-1, GSTR-3B, GSTR-9) handled by our dedicated compliance team with proactive reminders.",
    icon: "FileText",
    price: "Starts at ₹999/month",
    timeline: "Ongoing monthly/quarterly",
    benefits: ["Avoid late fees & penalties", "Accurate input tax credit reconciliation", "Dedicated compliance manager", "Automated due-date reminders"],
    process: [
      { step: "Data Collection", description: "Sales & purchase data collected monthly." },
      { step: "Reconciliation", description: "GSTR-2B reconciliation for accurate ITC claims." },
      { step: "Return Filing", description: "GSTR-1 and GSTR-3B filed before due dates." },
      { step: "Confirmation", description: "Filed acknowledgement shared with you." },
    ],
    documents: ["Sales invoices", "Purchase invoices", "Previous return copies", "GST login credentials"],
    faqs: [{ question: "What happens if I file GST returns late?", answer: "Late filing attracts interest at 18% p.a. and late fees per day, so timely filing is important to avoid penalties." }],
  },
  {
    slug: "tds-filing",
    name: "TDS Filing",
    tagline: "Accurate, on-time TDS return filing every quarter",
    description:
      "We manage TDS deduction calculations, challan payments, and quarterly TDS return filing (24Q, 26Q) to keep your business fully compliant.",
    icon: "Receipt",
    price: "Starts at ₹1,999/quarter",
    timeline: "Quarterly",
    benefits: ["Avoid TDS default penalties", "Form 16/16A generation", "TRACES reconciliation support", "Accurate challan tracking"],
    process: [
      { step: "TDS Computation", description: "Deduction amounts calculated as per applicable sections." },
      { step: "Challan Payment", description: "TDS challans deposited within due dates." },
      { step: "Return Filing", description: "Quarterly returns filed on TRACES/Income Tax portal." },
      { step: "Certificate Issuance", description: "Form 16/16A issued to deductees." },
    ],
    documents: ["Salary/payment details", "PAN of deductees", "Previous TDS challans", "TAN registration certificate"],
    faqs: [{ question: "What is the due date for quarterly TDS returns?", answer: "Typically the last day of the month following the quarter end (e.g., 31st July for Q1 April-June)." }],
  },
  {
    slug: "income-tax-filing",
    name: "Income Tax Filing",
    tagline: "Maximize deductions, minimize stress at tax time",
    description:
      "Income tax return filing for individuals, professionals and businesses with expert guidance on deductions, exemptions and tax-saving strategies.",
    icon: "ReceiptIndianRupee",
    price: "Starts at ₹799",
    timeline: "1-3 working days",
    benefits: ["Maximize eligible deductions", "Avoid notices from tax scrutiny", "Support for revised/belated returns", "Capital gains computation support"],
    process: [
      { step: "Income Assessment", description: "All income sources reviewed (salary, business, capital gains, etc.)." },
      { step: "Deduction Planning", description: "Eligible deductions under 80C, 80D, etc. applied." },
      { step: "Return Preparation", description: "ITR prepared and shared for your review." },
      { step: "E-filing", description: "Return filed and e-verified on the Income Tax portal." },
    ],
    documents: ["Form 16 / income proof", "Bank statements", "Investment proofs", "PAN & Aadhaar"],
    faqs: [{ question: "What is the due date for filing income tax returns?", answer: "Generally 31st July for individuals (non-audit cases) each assessment year, unless extended by the government." }],
  },
  {
    slug: "company-registration",
    name: "Company Registration",
    tagline: "Launch your business with the right legal structure",
    description:
      "We help you register Private Limited Companies, LLPs, Partnership Firms and OPCs with complete MCA compliance and post-incorporation support.",
    icon: "Building2",
    price: "Starts at ₹5,999",
    timeline: "7-12 working days",
    benefits: ["Limited liability protection", "Enhanced business credibility", "Easier access to funding", "Perpetual succession"],
    process: [
      { step: "Name Approval", description: "Company name reserved via MCA RUN service." },
      { step: "Document Drafting", description: "MOA, AOA and other incorporation documents prepared." },
      { step: "Filing with MCA", description: "SPICe+ form filed with the Ministry of Corporate Affairs." },
      { step: "Certificate of Incorporation", description: "COI, PAN and TAN issued." },
    ],
    documents: ["PAN & Aadhaar of directors", "Address proof of directors", "Registered office address proof", "Passport photos"],
    faqs: [{ question: "Which business structure should I choose?", answer: "Private Limited suits businesses seeking investment; LLP suits professional services; OPC suits solo founders wanting limited liability." }],
  },
  {
    slug: "pan-services",
    name: "PAN Services",
    tagline: "New PAN, corrections and reprints handled for you",
    description: "Application, correction, and reprint services for PAN cards for individuals, companies and NRIs.",
    icon: "IdCard",
    price: "Starts at ₹299",
    timeline: "7-15 working days",
    benefits: ["Mandatory for financial transactions", "Corrections handled hassle-free", "Support for NRI applicants", "Doorstep document pickup"],
    process: [
      { step: "Form Filling", description: "Form 49A/49AA filled with your details." },
      { step: "Document Verification", description: "KYC documents verified." },
      { step: "Submission to NSDL/UTIITSL", description: "Application submitted to the issuing authority." },
      { step: "PAN Dispatch", description: "PAN card dispatched to your address." },
    ],
    documents: ["Identity proof", "Address proof", "Date of birth proof", "Passport photo"],
    faqs: [{ question: "How long does it take to get a new PAN card?", answer: "Typically 7-15 working days from application submission, depending on the issuing authority's processing time." }],
  },
  {
    slug: "digital-signature",
    name: "Digital Signature Certificate",
    tagline: "Secure DSC for e-filing and e-tendering",
    description: "Class 3 Digital Signature Certificates for individuals and organizations, required for MCA filings, GST, e-tenders and income tax e-verification.",
    icon: "PenTool",
    price: "Starts at ₹1,199",
    timeline: "1-2 working days",
    benefits: ["Legally valid for e-filings", "Required for company/LLP filings", "Secure and tamper-proof", "Valid for 1-3 years"],
    process: [
      { step: "Application", description: "DSC application form completed online." },
      { step: "Video KYC", description: "Identity verified via video verification." },
      { step: "Issuance", description: "USB token with DSC issued/couriered." },
    ],
    documents: ["PAN card", "Aadhaar card", "Passport photo", "Email ID & mobile number"],
    faqs: [{ question: "Who needs a Digital Signature Certificate?", answer: "Company directors, GST practitioners, and anyone filing statutory returns with the MCA or Income Tax department." }],
  },
  {
    slug: "msme-registration",
    name: "MSME Registration",
    tagline: "Unlock government benefits for your small business",
    description: "Udyam (MSME) registration to access priority sector lending, subsidies, and protection against delayed payments.",
    icon: "Factory",
    price: "Starts at ₹499",
    timeline: "1-2 working days",
    benefits: ["Access to collateral-free loans", "Protection against delayed payments", "Subsidy on patent/trademark fees", "Priority in government tenders"],
    process: [
      { step: "Eligibility Check", description: "Investment & turnover verified against MSME criteria." },
      { step: "Udyam Application", description: "Application filed on the Udyam Registration portal." },
      { step: "Certificate Issued", description: "Udyam Registration Certificate generated instantly." },
    ],
    documents: ["Aadhaar of proprietor/partner/director", "PAN of business", "Bank account details", "Business activity details"],
    faqs: [{ question: "Is MSME registration mandatory?", answer: "It's voluntary but highly recommended to access government schemes, subsidies and priority sector lending benefits." }],
  },
];

export function getTaxServiceBySlug(slug: string) {
  return taxServices.find((s) => s.slug === slug);
}

export type LoanCategory = "secured" | "unsecured";

export type LoanProduct = {
  slug: string;
  name: string;
  shortName: string;
  category: LoanCategory;
  tagline: string;
  description: string;
  icon: string;
  interestRate: string;
  maxAmount: string;
  maxTenure: string;
  processingTime: string;
  processingFee: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  faqs: { question: string; answer: string }[];
};

export const loanProducts: LoanProduct[] = [
  {
    slug: "home-loan",
    name: "Home Loan",
    shortName: "Home Loan",
    category: "secured",
    tagline: "Own your dream home with India's most competitive rates",
    description:
      "Kavya Financial Services helps you finance the purchase or construction of your dream home with home loans sourced from 25+ leading banks and NBFCs. We compare rates, negotiate on your behalf, and manage paperwork end-to-end so you get the best deal with minimal hassle.",
    icon: "Home",
    interestRate: "8.35% p.a. onwards",
    maxAmount: "Up to ₹10 Crore",
    maxTenure: "30 Years",
    processingTime: "7-10 working days",
    processingFee: "0.5% - 1% of loan amount",
    benefits: [
      "Attractive interest rates starting at 8.35% p.a.",
      "Loan tenure up to 30 years for lower EMIs",
      "Balance transfer facility with top-up loan",
      "Minimal documentation and doorstep service",
      "Special rates for women applicants",
      "Tax benefits under Section 80C and 24(b)",
    ],
    eligibility: [
      "Age 21 to 65 years at loan maturity",
      "Minimum monthly income of ₹25,000",
      "Salaried, self-employed & professionals eligible",
      "Good credit score (700+) preferred",
      "Indian resident or NRI with valid documentation",
    ],
    documents: [
      "Identity proof (PAN, Aadhaar, Passport)",
      "Address proof (Utility bill, Aadhaar, Passport)",
      "Income proof (Salary slips / ITR for last 3 years)",
      "Bank statements (last 6 months)",
      "Property documents (sale deed, approved plan)",
      "Passport size photographs",
    ],
    faqs: [
      { question: "What is the maximum home loan amount I can get?", answer: "Loan amount depends on your income, credit profile and property value; we can arrange up to ₹10 Crore through our partner banks." },
      { question: "Can I get a home loan with a co-applicant?", answer: "Yes, adding a co-applicant such as your spouse can increase your eligible loan amount and may qualify you for better rates." },
      { question: "Is there a prepayment penalty?", answer: "For floating rate home loans, RBI guidelines prohibit prepayment penalties for individual borrowers." },
      { question: "Do you help with balance transfer from my existing bank?", answer: "Yes, we assist with seamless balance transfer to a lender offering a lower rate, along with a top-up loan if required." },
    ],
  },
  {
    slug: "mortgage-loan",
    name: "Mortgage Loan",
    shortName: "Mortgage Loan",
    category: "secured",
    tagline: "Unlock the value of your property for any financial need",
    description:
      "A mortgage loan lets you leverage your residential or commercial property to raise funds for business expansion, education, medical emergencies, or any large expense — while continuing to use the property.",
    icon: "Landmark",
    interestRate: "9.25% p.a. onwards",
    maxAmount: "Up to ₹5 Crore",
    maxTenure: "20 Years",
    processingTime: "7-12 working days",
    processingFee: "0.75% - 1.5% of loan amount",
    benefits: [
      "High-value funding against owned property",
      "Flexible end-use of funds",
      "Longer repayment tenure up to 20 years",
      "Lower interest rates than unsecured loans",
      "Overdraft facility available with select lenders",
    ],
    eligibility: [
      "Age 25 to 65 years",
      "Clear property title in applicant's name",
      "Stable income source (salaried/self-employed)",
      "Property should be free from legal disputes",
    ],
    documents: [
      "KYC documents (PAN, Aadhaar)",
      "Property ownership documents",
      "Income proof / ITR / Bank statements",
      "Property valuation & legal opinion report",
      "Photographs and application form",
    ],
    faqs: [
      { question: "What is the difference between a mortgage loan and a home loan?", answer: "A home loan is for purchasing/constructing a house, while a mortgage loan lets you borrow against a property you already own for any purpose." },
      { question: "Can I mortgage a commercial property?", answer: "Yes, both residential and commercial properties are accepted as collateral, subject to valuation and clear title." },
    ],
  },
  {
    slug: "loan-against-property",
    name: "Loan Against Property",
    shortName: "LAP",
    category: "secured",
    tagline: "Turn your property into working capital",
    description:
      "Loan Against Property (LAP) offers high-value financing at competitive rates by pledging your residential, commercial, or industrial property, ideal for business expansion, debt consolidation, or major life expenses.",
    icon: "Building2",
    interestRate: "9.00% p.a. onwards",
    maxAmount: "Up to ₹7.5 Crore",
    maxTenure: "18 Years",
    processingTime: "8-12 working days",
    processingFee: "0.5% - 1.25% of loan amount",
    benefits: [
      "Up to 70% of property market value as loan",
      "Lower interest rate compared to personal/business loans",
      "Longer tenure for comfortable EMIs",
      "Overdraft/drop-line facility options",
      "Both self-occupied & rented property accepted",
    ],
    eligibility: [
      "Age 25 to 70 years",
      "Owned residential/commercial property with clear title",
      "Stable and verifiable income",
      "Good repayment track record",
    ],
    documents: [
      "KYC & PAN card",
      "Property title deed and tax receipts",
      "Income proof / ITR (last 2-3 years)",
      "Bank statements (last 6 months)",
      "Business proof (for self-employed applicants)",
    ],
    faqs: [
      { question: "What can I use a loan against property for?", answer: "LAP funds can be used for business expansion, education, wedding, medical expenses, debt consolidation or any other legitimate purpose." },
      { question: "How much loan can I get against my property?", answer: "Typically up to 60-70% of the current market value of the property, subject to income eligibility." },
    ],
  },
  {
    slug: "commercial-loan",
    name: "Commercial Loan",
    shortName: "Commercial Loan",
    category: "secured",
    tagline: "Finance for commercial property purchase & business premises",
    description:
      "Commercial loans help businesses and investors purchase office spaces, retail shops, warehouses, and other commercial properties with structured repayment options tailored to business cash flows.",
    icon: "Building",
    interestRate: "9.50% p.a. onwards",
    maxAmount: "Up to ₹15 Crore",
    maxTenure: "15 Years",
    processingTime: "10-15 working days",
    processingFee: "1% - 2% of loan amount",
    benefits: [
      "High-value funding for commercial assets",
      "Customized repayment aligned to business cycles",
      "Available for purchase, construction or renovation",
      "Attractive rates for established businesses",
    ],
    eligibility: [
      "Business vintage of 3+ years preferred",
      "Stable business turnover and profitability",
      "Age 25 to 65 years for proprietors/directors",
      "Good business & personal credit history",
    ],
    documents: [
      "Business registration & KYC documents",
      "GST returns and financial statements",
      "ITR of business (last 2-3 years)",
      "Bank statements (last 12 months)",
      "Property documents for the commercial asset",
    ],
    faqs: [
      { question: "Who can apply for a commercial loan?", answer: "Business owners, partnerships, private limited companies and self-employed professionals looking to acquire commercial property." },
    ],
  },
  {
    slug: "plot-loan",
    name: "Plot Loan",
    shortName: "Plot Loan",
    category: "secured",
    tagline: "Buy your ideal plot to build your dream home tomorrow",
    description:
      "Plot loans (site purchase loans) help you buy a residential plot in an approved layout — the first step to building your dream home in Telangana, Andhra Pradesh, or Karnataka.",
    icon: "MapPin",
    interestRate: "8.75% p.a. onwards",
    maxAmount: "Up to ₹3 Crore",
    maxTenure: "20 Years",
    processingTime: "7-10 working days",
    processingFee: "0.5% - 1% of loan amount",
    benefits: [
      "Finance for HMDA/DTCP approved plots",
      "Convert to construction loan later",
      "Competitive interest rates",
      "Up to 80% of plot value financed",
    ],
    eligibility: [
      "Age 21 to 65 years",
      "Plot located within approved municipal/development limits",
      "Stable income source",
      "Clear plot title with no encumbrance",
    ],
    documents: [
      "KYC documents",
      "Plot sale deed & approved layout copy",
      "Income proof / bank statements",
      "Encumbrance certificate",
    ],
    faqs: [
      { question: "Is agricultural land eligible for a plot loan?", answer: "No, plot loans apply only to residential plots in approved layouts (HMDA/DTCP or municipal approved)." },
      { question: "Can I get a construction loan after a plot loan?", answer: "Yes, once you're ready to build, we can convert or supplement your financing with a construction loan." },
    ],
  },
  {
    slug: "site-purchase-loan",
    name: "Site Purchase Loan",
    shortName: "Site Purchase",
    category: "secured",
    tagline: "Dedicated financing to purchase your residential site",
    description:
      "Our site purchase loans are structured specifically for buying open residential sites in HMDA, DTCP or municipality-approved layouts across Telangana, Andhra Pradesh and Karnataka.",
    icon: "MapPinned",
    interestRate: "8.90% p.a. onwards",
    maxAmount: "Up to ₹2.5 Crore",
    maxTenure: "15 Years",
    processingTime: "7-10 working days",
    processingFee: "0.5% - 1% of loan amount",
    benefits: [
      "Fast approvals for approved-layout sites",
      "Flexible tenure up to 15 years",
      "Legal & technical verification support included",
    ],
    eligibility: [
      "Age 21 to 65 years",
      "Site in an approved layout",
      "Verifiable income source",
    ],
    documents: [
      "KYC & income documents",
      "Site sale agreement",
      "Layout approval copy",
      "Encumbrance certificate (13 years)",
    ],
    faqs: [
      { question: "Do you verify the legal status of the site?", answer: "Yes, our legal team conducts a full title and encumbrance check before loan disbursal." },
    ],
  },
  {
    slug: "construction-loan",
    name: "Construction Loan",
    shortName: "Construction Loan",
    category: "secured",
    tagline: "Build your home stage-by-stage with disbursals matched to progress",
    description:
      "Construction loans disburse funds in tranches aligned with construction milestones, ensuring you pay interest only on the amount disbursed, ideal for building a home on your own plot.",
    icon: "HardHat",
    interestRate: "8.60% p.a. onwards",
    maxAmount: "Up to ₹5 Crore",
    maxTenure: "25 Years",
    processingTime: "10-14 working days",
    processingFee: "0.5% - 1% of loan amount",
    benefits: [
      "Stage-wise disbursal linked to construction progress",
      "Interest charged only on disbursed amount",
      "Can be combined with plot loan",
      "Technical inspection support at each stage",
    ],
    eligibility: [
      "Ownership of plot with approved building plan",
      "Age 21 to 65 years",
      "Stable income and repayment capacity",
    ],
    documents: [
      "Approved building plan & municipal permission",
      "Plot ownership documents",
      "Estimated construction cost certified by architect",
      "Income proof and bank statements",
    ],
    faqs: [
      { question: "How are funds disbursed in a construction loan?", answer: "Funds are released in stages — foundation, plinth, roofing, and finishing — after site inspection at each milestone." },
    ],
  },
  {
    slug: "home-extension-loan",
    name: "Home Extension Loan",
    shortName: "Extension Loan",
    category: "secured",
    tagline: "Add extra space to your existing home",
    description:
      "Home extension loans finance the addition of new rooms, floors, or extra space to your existing house, letting your home grow along with your family's needs.",
    icon: "LayoutGrid",
    interestRate: "8.95% p.a. onwards",
    maxAmount: "Up to ₹1.5 Crore",
    maxTenure: "20 Years",
    processingTime: "7-10 working days",
    processingFee: "0.5% - 1% of loan amount",
    benefits: [
      "Finance for vertical or horizontal expansion",
      "Attractive rates similar to home loans",
      "Simple documentation for existing customers",
    ],
    eligibility: [
      "Existing ownership of the property",
      "Municipal approval for the extension plan",
      "Stable income source",
    ],
    documents: [
      "Property ownership proof",
      "Approved extension/building plan",
      "Income proof & bank statements",
      "Cost estimate for extension work",
    ],
    faqs: [
      { question: "Can I add a floor to my existing house with this loan?", answer: "Yes, vertical extensions (adding a floor) are covered, subject to municipal approval and structural safety clearance." },
    ],
  },
  {
    slug: "home-renovation-loan",
    name: "Home Renovation Loan",
    shortName: "Renovation Loan",
    category: "secured",
    tagline: "Refresh and upgrade your home the smart way",
    description:
      "Renovation loans help fund repairs, remodeling, painting, flooring and interior upgrades for your existing home with quick approvals and minimal documentation.",
    icon: "Paintbrush",
    interestRate: "9.10% p.a. onwards",
    maxAmount: "Up to ₹75 Lakh",
    maxTenure: "15 Years",
    processingTime: "5-7 working days",
    processingFee: "0.5% - 1% of loan amount",
    benefits: [
      "Quick disbursal with minimal paperwork",
      "Covers structural repair & interior renovation",
      "Flexible tenure options",
    ],
    eligibility: [
      "Ownership of the property being renovated",
      "Age 21 to 65 years",
      "Stable income source",
    ],
    documents: [
      "Property ownership proof",
      "Renovation cost estimate",
      "Income proof & bank statements",
      "KYC documents",
    ],
    faqs: [
      { question: "What renovation work is covered?", answer: "Flooring, painting, waterproofing, electrical/plumbing upgrades, kitchen & bathroom remodeling are all covered." },
    ],
  },
  {
    slug: "personal-loan",
    name: "Personal Loan",
    shortName: "Personal Loan",
    category: "unsecured",
    tagline: "Instant funds for life's important moments",
    description:
      "Get collateral-free personal loans for weddings, travel, medical emergencies, or any personal need with fast approval and disbursal within 24-48 hours.",
    icon: "Wallet",
    interestRate: "10.50% p.a. onwards",
    maxAmount: "Up to ₹40 Lakh",
    maxTenure: "7 Years",
    processingTime: "24-48 hours",
    processingFee: "1% - 2.5% of loan amount",
    benefits: [
      "No collateral or security required",
      "Disbursal within 24-48 hours",
      "Minimal documentation",
      "Flexible end-use, no restrictions",
    ],
    eligibility: [
      "Age 21 to 60 years",
      "Minimum monthly income of ₹20,000",
      "Salaried or self-employed",
      "Credit score of 700+ preferred",
    ],
    documents: [
      "PAN & Aadhaar card",
      "Latest 3 months salary slips",
      "Bank statements (last 6 months)",
      "Employment/business proof",
    ],
    faqs: [
      { question: "How fast can I get a personal loan?", answer: "With complete documentation, disbursal can happen within 24-48 hours through our partner lenders." },
      { question: "Is a guarantor required for a personal loan?", answer: "No, personal loans are unsecured and typically do not require a guarantor or collateral." },
    ],
  },
  {
    slug: "education-loan",
    name: "Education Loan",
    shortName: "Education Loan",
    category: "unsecured",
    tagline: "Invest in your future with a hassle-free education loan",
    description:
      "Education loans cover tuition fees, hostel expenses, books, and living costs for higher studies in India or abroad, with moratorium periods that align repayment with your course duration.",
    icon: "GraduationCap",
    interestRate: "9.50% p.a. onwards",
    maxAmount: "Up to ₹1.5 Crore",
    maxTenure: "15 Years",
    processingTime: "5-10 working days",
    processingFee: "Nil - 1% of loan amount",
    benefits: [
      "Covers tuition, hostel, travel & living expenses",
      "Moratorium period during study duration",
      "Tax benefit under Section 80E",
      "Collateral-free options for smaller amounts",
    ],
    eligibility: [
      "Indian national with confirmed admission",
      "Co-applicant (parent/guardian) required",
      "Admission to recognized university/institution",
    ],
    documents: [
      "Admission letter & fee structure",
      "Academic records (10th, 12th, graduation)",
      "KYC of student and co-applicant",
      "Income proof of co-applicant",
    ],
    faqs: [
      { question: "Is collateral required for education loans?", answer: "For loans up to ₹7.5 lakh, most lenders don't require collateral; higher amounts may need collateral or third-party guarantee." },
      { question: "When does EMI repayment start?", answer: "Typically 6-12 months after course completion or upon securing a job, whichever is earlier." },
    ],
  },
  {
    slug: "business-loan",
    name: "Business Loan",
    shortName: "Business Loan",
    category: "unsecured",
    tagline: "Fuel your business growth with flexible financing",
    description:
      "Unsecured business loans provide quick working capital for inventory, expansion, equipment purchase, or operational needs — without pledging any collateral.",
    icon: "Briefcase",
    interestRate: "11.00% p.a. onwards",
    maxAmount: "Up to ₹75 Lakh",
    maxTenure: "5 Years",
    processingTime: "3-7 working days",
    processingFee: "1% - 2.5% of loan amount",
    benefits: [
      "No collateral required",
      "Quick approval based on business cash flows",
      "Flexible repayment tenure",
      "Overdraft & term loan options available",
    ],
    eligibility: [
      "Business vintage of 2+ years",
      "Minimum annual turnover as per lender norms",
      "Good business credit history",
    ],
    documents: [
      "Business registration proof",
      "GST returns (last 12 months)",
      "ITR & financial statements (2-3 years)",
      "Bank statements (last 12 months)",
    ],
    faqs: [
      { question: "What is the minimum business vintage required?", answer: "Most lenders require at least 2 years of operational business history, though some fintech lenders accept 1 year." },
    ],
  },
  {
    slug: "msme-loan",
    name: "MSME Loan",
    shortName: "MSME Loan",
    category: "unsecured",
    tagline: "Empowering small businesses with accessible credit",
    description:
      "MSME loans offer specially structured financing for micro, small and medium enterprises, including government-backed schemes with subsidized interest rates and collateral-free options.",
    icon: "Factory",
    interestRate: "9.75% p.a. onwards",
    maxAmount: "Up to ₹2 Crore",
    maxTenure: "7 Years",
    processingTime: "5-10 working days",
    processingFee: "0.5% - 2% of loan amount",
    benefits: [
      "Access to government schemes (CGTMSE, Mudra)",
      "Collateral-free loans up to ₹2 Crore under CGTMSE",
      "Subsidized rates for eligible MSMEs",
      "Support with Udyam registration",
    ],
    eligibility: [
      "Valid Udyam/MSME registration",
      "Business vintage as per scheme requirements",
      "Satisfactory credit history",
    ],
    documents: [
      "Udyam registration certificate",
      "Business PAN & KYC",
      "GST returns & financial statements",
      "Bank statements (last 12 months)",
    ],
    faqs: [
      { question: "What is CGTMSE and how does it help?", answer: "CGTMSE is a government credit guarantee scheme enabling collateral-free loans up to ₹2 Crore for eligible MSMEs." },
    ],
  },
  {
    slug: "car-loan",
    name: "Car Loan",
    shortName: "Car Loan",
    category: "unsecured",
    tagline: "Drive home your dream car today",
    description:
      "Finance up to 90% of your new or used car's on-road price with competitive interest rates, quick approvals, and flexible tenure options.",
    icon: "Car",
    interestRate: "8.70% p.a. onwards",
    maxAmount: "Up to ₹1 Crore",
    maxTenure: "7 Years",
    processingTime: "24-72 hours",
    processingFee: "0.5% - 1.5% of loan amount",
    benefits: [
      "Up to 90% on-road price financed",
      "New & used car financing available",
      "Fast approval and dealer tie-ups",
      "Flexible EMI options",
    ],
    eligibility: [
      "Age 21 to 65 years",
      "Minimum monthly income of ₹25,000",
      "Valid driving license (for self-use)",
    ],
    documents: [
      "KYC documents",
      "Income proof / bank statements",
      "Proforma invoice of the vehicle",
      "Driving license copy",
    ],
    faqs: [
      { question: "Can I get a loan for a used car?", answer: "Yes, we offer financing for both new and pre-owned cars, subject to the vehicle's age and valuation." },
    ],
  },
];

export function getLoanBySlug(slug: string) {
  return loanProducts.find((l) => l.slug === slug);
}

export function getRelatedLoans(slug: string, category: LoanCategory, count = 3) {
  return loanProducts.filter((l) => l.slug !== slug && l.category === category).slice(0, count);
}

export const securedLoans = loanProducts.filter((l) => l.category === "secured");
export const unsecuredLoans = loanProducts.filter((l) => l.category === "unsecured");

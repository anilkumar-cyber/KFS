export type FaqItem = { question: string; answer: string; category: string };

export const generalFaqs: FaqItem[] = [
  {
    category: "General",
    question: "What services does Kavya Financial Services offer?",
    answer:
      "We offer secured & unsecured loans (home, mortgage, LAP, personal, business, education, car and more), real estate sales, bank auction properties, GST & income tax services, and digital marketing/lead-generation services across Telangana, Andhra Pradesh and Karnataka.",
  },
  {
    category: "General",
    question: "Is there a fee for consultation?",
    answer:
      "No, initial consultation and eligibility assessment for loans and property is completely free of charge.",
  },
  {
    category: "General",
    question: "Which cities do you operate in?",
    answer:
      "We currently serve customers across Telangana, Andhra Pradesh and Karnataka, with dedicated relationship managers in Hyderabad, Vijayawada, Visakhapatnam, Bangalore and Mysuru.",
  },
  {
    category: "Loans",
    question: "How do you decide which bank to recommend?",
    answer:
      "We compare interest rates, processing fees, eligibility criteria and turnaround time across our 25+ partner banks and NBFCs to recommend the option best suited to your profile.",
  },
  {
    category: "Loans",
    question: "Do you charge any commission from customers?",
    answer:
      "Our service is typically free for customers as we are compensated by partner banks; any applicable service charges are always disclosed upfront with no hidden costs.",
  },
  {
    category: "Loans",
    question: "What credit score do I need to qualify for a loan?",
    answer:
      "A CIBIL score of 700+ significantly improves approval odds and interest rates, but we work with lenders who consider applicants with scores as low as 650 depending on the loan type.",
  },
  {
    category: "Real Estate",
    question: "Do you verify property documents before listing?",
    answer:
      "Yes, our legal team performs title verification and encumbrance checks before any property is listed on our platform.",
  },
  {
    category: "Real Estate",
    question: "Can I get a home loan for properties listed by Kavya?",
    answer:
      "Absolutely — our in-house loan team can process home loan applications in parallel with your property purchase for a seamless experience.",
  },
  {
    category: "Taxation",
    question: "Can you handle both GST and income tax filing for my business?",
    answer:
      "Yes, our taxation desk offers end-to-end support for GST registration & filing, TDS, income tax returns, and company/MSME registration.",
  },
  {
    category: "Taxation",
    question: "What is the turnaround time for GST registration?",
    answer:
      "GST registration typically takes 3-7 working days from submission of complete documentation, subject to department processing timelines.",
  },
];

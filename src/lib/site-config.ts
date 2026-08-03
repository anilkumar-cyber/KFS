export const siteConfig = {
  name: "Kavya Financial Services",
  shortName: "Kavya Financial",
  tagline: "Your Trusted Financial Partner",
  description:
    "Kavya Financial Services offers home loans, mortgage loans, personal loans, business loans, real estate, and taxation services across Telangana, Andhra Pradesh & Karnataka.",
  url: "https://www.kavyafinancialservices.com",
  phone: "+91 98765 43210",
  phoneRaw: "919876543210",
  whatsapp: "919876543210",
  email: "info@kavyafinancialservices.com",
  address: "3rd Floor, Financial District, Nanakramguda, Hyderabad, Telangana 500032",
  locations: ["Telangana", "Andhra Pradesh", "Karnataka"],
  hours: "Mon - Sat: 9:30 AM - 7:00 PM",
  social: {
    facebook: "https://facebook.com/kavyafinancialservices",
    instagram: "https://instagram.com/kavyafinancialservices",
    linkedin: "https://linkedin.com/company/kavyafinancialservices",
    twitter: "https://twitter.com/kavyafinserv",
    youtube: "https://youtube.com/@kavyafinancialservices",
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  columns: {
    heading: string;
    links: NavLink[];
  }[];
  featured?: { title: string; description: string; href: string };
};

export const secondaryNav = [
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const mainNav: (NavGroup | NavLink)[] = [
  { label: "Home", href: "/" },
  {
    label: "Loan Services",
    href: "/loans",
    columns: [
      {
        heading: "Secured Loans",
        links: [
          { label: "Home Loan", href: "/loans/home-loan" },
          { label: "Mortgage Loan", href: "/loans/mortgage-loan" },
          { label: "Loan Against Property", href: "/loans/loan-against-property" },
          { label: "Commercial Loan", href: "/loans/commercial-loan" },
          { label: "Plot Loan", href: "/loans/plot-loan" },
          { label: "Construction Loan", href: "/loans/construction-loan" },
          { label: "Home Extension Loan", href: "/loans/home-extension-loan" },
          { label: "Home Renovation Loan", href: "/loans/home-renovation-loan" },
        ],
      },
      {
        heading: "Unsecured Loans",
        links: [
          { label: "Personal Loan", href: "/loans/personal-loan" },
          { label: "Education Loan", href: "/loans/education-loan" },
          { label: "Business Loan", href: "/loans/business-loan" },
          { label: "MSME Loan", href: "/loans/msme-loan" },
          { label: "Car Loan", href: "/loans/car-loan" },
        ],
      },
    ],
    featured: {
      title: "Check Loan Eligibility",
      description: "Find your eligible loan amount in under a minute.",
      href: "/eligibility-calculator",
    },
  },
  {
    label: "Real Estate",
    href: "/real-estate",
    columns: [
      {
        heading: "Browse Properties",
        links: [
          { label: "All Properties", href: "/real-estate" },
          { label: "Farm Lands", href: "/real-estate?type=farm-land" },
          { label: "HMDA Approved Plots", href: "/real-estate?type=hmda-plots" },
          { label: "DTCP Approved Plots", href: "/real-estate?type=dtcp-plots" },
        ],
      },
      {
        heading: "Property Types",
        links: [
          { label: "Independent Houses", href: "/real-estate?type=independent-house" },
          { label: "Apartments", href: "/real-estate?type=apartment" },
          { label: "Villas", href: "/real-estate?type=villa" },
          { label: "Commercial Properties", href: "/real-estate?type=commercial" },
          { label: "Open Plots", href: "/real-estate?type=open-plot" },
        ],
      },
    ],
    featured: {
      title: "Auction Properties",
      description: "Bank-auctioned properties at attractive prices.",
      href: "/auction-properties",
    },
  },
  {
    label: "Tax & Compliance",
    href: "/tax-services",
    columns: [
      {
        heading: "GST Services",
        links: [
          { label: "GST Registration", href: "/tax-services/gst-registration" },
          { label: "GST Filing", href: "/tax-services/gst-filing" },
          { label: "TDS Filing", href: "/tax-services/tds-filing" },
        ],
      },
      {
        heading: "Company & Tax",
        links: [
          { label: "Income Tax Filing", href: "/tax-services/income-tax-filing" },
          { label: "Company Registration", href: "/tax-services/company-registration" },
          { label: "PAN Services", href: "/tax-services/pan-services" },
          { label: "Digital Signature", href: "/tax-services/digital-signature" },
          { label: "MSME Registration", href: "/tax-services/msme-registration" },
        ],
      },
    ],
  },
  {
    label: "Marketing",
    href: "/lead-generation",
    columns: [
      {
        heading: "Growth Services",
        links: [
          { label: "Lead Generation", href: "/lead-generation" },
          { label: "Digital Marketing", href: "/lead-generation#digital-marketing" },
          { label: "WhatsApp Marketing", href: "/lead-generation#whatsapp-marketing" },
          { label: "AI Chatbot", href: "/lead-generation#ai-chatbot" },
          { label: "Landing Page Development", href: "/lead-generation#landing-pages" },
        ],
      },
    ],
  },
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  loans: [
    { label: "Home Loan", href: "/loans/home-loan" },
    { label: "Loan Against Property", href: "/loans/loan-against-property" },
    { label: "Personal Loan", href: "/loans/personal-loan" },
    { label: "Business Loan", href: "/loans/business-loan" },
    { label: "Education Loan", href: "/loans/education-loan" },
    { label: "Car Loan", href: "/loans/car-loan" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blogs", href: "/blogs" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Real Estate", href: "/real-estate" },
    { label: "Auction Properties", href: "/auction-properties" },
    { label: "GST Services", href: "/tax-services/gst-registration" },
    { label: "Income Tax Filing", href: "/tax-services/income-tax-filing" },
    { label: "Lead Generation", href: "/lead-generation" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Sitemap", href: "/sitemap-page" },
  ],
};

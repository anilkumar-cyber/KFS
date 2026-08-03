export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  publishedOn: string;
  readMinutes: number;
  image: string;
};

export const blogCategories = ["Home Loans", "Personal Finance", "Real Estate", "Taxation", "Business"];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-the-right-home-loan-in-2026",
    title: "How to Choose the Right Home Loan in 2026",
    excerpt:
      "Interest rates, tenure, processing fees — here's a practical framework to compare home loan offers and pick the one that actually saves you money.",
    content: [
      "Choosing a home loan isn't just about finding the lowest interest rate — it's about understanding the total cost of borrowing over the entire tenure.",
      "Start by comparing the effective interest rate (including processing fees) across at least 3-4 lenders. A 0.25% difference in rate can save lakhs over a 20-year tenure.",
      "Next, evaluate prepayment flexibility. Since RBI mandates no prepayment penalty on floating-rate loans for individuals, prioritize lenders who make part-prepayment easy via app or net banking.",
      "Finally, factor in processing time and customer service quality — a slightly higher rate from a responsive lender can be worth it if you're on a tight purchase timeline.",
      "At Kavya Financial Services, we compare offers from 25+ banks and NBFCs so you don't have to visit multiple branches to find the best deal.",
    ],
    category: "Home Loans",
    tags: ["home loan", "interest rates", "EMI"],
    author: "Priya Venkatesh",
    authorRole: "Senior Loan Advisor",
    publishedOn: "2026-07-18",
    readMinutes: 6,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "cibil-score-guide-improve-loan-approval-odds",
    title: "CIBIL Score Guide: How to Improve Your Loan Approval Odds",
    excerpt:
      "Your credit score is the single biggest factor lenders check. Here's what impacts it and how to boost it before you apply.",
    content: [
      "A CIBIL score above 750 significantly improves both your approval chances and the interest rate you're offered.",
      "Key factors affecting your score include payment history (35%), credit utilization (30%), length of credit history, credit mix, and recent inquiries.",
      "Practical steps to improve your score: pay all EMIs and credit card bills on time, keep credit utilization below 30%, avoid multiple loan applications in a short period, and check your report regularly for errors.",
      "If you have a lower score, consider applying with a co-applicant who has strong credit, or opt for secured loans which typically have more lenient score requirements.",
    ],
    category: "Personal Finance",
    tags: ["credit score", "CIBIL", "loan approval"],
    author: "Arjun Mehta",
    authorRole: "Credit Analyst",
    publishedOn: "2026-07-05",
    readMinutes: 5,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "hmda-vs-dtcp-plots-what-buyers-should-know",
    title: "HMDA vs DTCP Approved Plots: What Buyers Should Know",
    excerpt:
      "Buying an open plot in Telangana or Andhra Pradesh? Understanding these approval types can save you from legal trouble later.",
    content: [
      "HMDA (Hyderabad Metropolitan Development Authority) approval applies to layouts within Hyderabad's metropolitan limits, while DTCP (Directorate of Town and Country Planning) approval applies in Andhra Pradesh and other parts of Telangana outside HMDA jurisdiction.",
      "Both approvals confirm that a layout has followed proper planning norms — road widths, open spaces, and infrastructure — making bank loans easier to obtain.",
      "Always verify the layout approval number on the respective authority's website before booking, and cross-check the survey number and encumbrance certificate with a legal expert.",
      "Kavya Financial Services only lists HMDA/DTCP-verified plots and provides free document verification support to every buyer.",
    ],
    category: "Real Estate",
    tags: ["HMDA", "DTCP", "plots", "real estate"],
    author: "Kiran Kumar",
    authorRole: "Real Estate Consultant",
    publishedOn: "2026-06-22",
    readMinutes: 7,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "gst-filing-deadlines-2026-complete-checklist",
    title: "GST Filing Deadlines 2026: Complete Checklist for Businesses",
    excerpt: "Missed deadlines mean penalties. Bookmark this checklist to stay compliant all year round.",
    content: [
      "GSTR-1 (outward supplies) is due on the 11th of the following month for monthly filers, and quarterly for those under the QRMP scheme.",
      "GSTR-3B (summary return with tax payment) is due on the 20th of the following month, with staggered dates based on state and turnover.",
      "GSTR-9 (annual return) is due by 31st December of the following financial year for businesses with turnover above ₹2 crore.",
      "Late filing attracts a late fee of ₹50/day (₹20/day for nil returns) plus 18% p.a. interest on unpaid tax — automate reminders or work with a compliance partner to avoid this.",
    ],
    category: "Taxation",
    tags: ["GST", "compliance", "deadlines"],
    author: "Sunitha Reddy",
    authorRole: "Tax Consultant",
    publishedOn: "2026-06-10",
    readMinutes: 4,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "msme-loan-schemes-every-small-business-should-know",
    title: "5 MSME Loan Schemes Every Small Business Owner Should Know",
    excerpt: "From CGTMSE to Mudra Yojana — a breakdown of government-backed schemes that make MSME financing easier.",
    content: [
      "CGTMSE (Credit Guarantee Fund Trust) enables collateral-free loans up to ₹2 crore for eligible micro and small enterprises.",
      "PM Mudra Yojana offers loans up to ₹10 lakh under Shishu, Kishor and Tarun categories for non-farm income-generating micro enterprises.",
      "Stand-Up India supports loans between ₹10 lakh and ₹1 crore for SC/ST and women entrepreneurs setting up greenfield enterprises.",
      "PSB Loans in 59 Minutes offers in-principle approval for MSME loans up to ₹5 crore within an hour through an online portal.",
      "SIDBI Make in India Soft Loan Fund (SMILE) provides equity-like soft loans to MSMEs in the manufacturing sector.",
    ],
    category: "Business",
    tags: ["MSME", "business loan", "government schemes"],
    author: "Rahul Nair",
    authorRole: "Business Loan Specialist",
    publishedOn: "2026-05-30",
    readMinutes: 6,
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "loan-against-property-vs-personal-loan",
    title: "Loan Against Property vs Personal Loan: Which Should You Choose?",
    excerpt: "Both offer quick access to funds, but the right choice depends on your amount, tenure, and asset ownership.",
    content: [
      "Loan against property (LAP) offers larger loan amounts (up to ₹7.5 crore) at lower interest rates (starting ~9%), but requires you to pledge property and takes longer to process.",
      "Personal loans are unsecured, faster to disburse (24-48 hours), but come with higher interest rates (~10.5%+) and lower amounts (typically up to ₹40 lakh).",
      "If you own property and need a large amount for a long tenure, LAP is more cost-effective. For smaller, urgent needs, a personal loan is more practical.",
      "Consider your monthly cash flow: LAP's lower rate means lower EMI for the same amount, but the longer tenure means more total interest paid over time.",
    ],
    category: "Personal Finance",
    tags: ["LAP", "personal loan", "comparison"],
    author: "Priya Venkatesh",
    authorRole: "Senior Loan Advisor",
    publishedOn: "2026-05-12",
    readMinutes: 5,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
  },
];

export function getBlogBySlug(slug: string) {
  return blogPosts.find((b) => b.slug === slug);
}

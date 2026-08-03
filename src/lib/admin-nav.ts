export type AdminNavItem = {
  label: string;
  href: string;
  icon: string;
  adminOnly?: boolean;
};

export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Leads / CRM", href: "/admin/leads", icon: "Users" },
  { label: "Properties", href: "/admin/properties", icon: "Building2" },
  { label: "Auction Properties", href: "/admin/auction-properties", icon: "Gavel" },
  { label: "Loan Products", href: "/admin/loans", icon: "Wallet" },
  { label: "Tax Services", href: "/admin/tax-services", icon: "Receipt" },
  { label: "Blog Posts", href: "/admin/blogs", icon: "FileText" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "Star" },
  { label: "FAQs", href: "/admin/faqs", icon: "HelpCircle" },
  { label: "Partner Banks", href: "/admin/banks", icon: "Landmark" },
  { label: "Users", href: "/admin/users", icon: "ShieldCheck", adminOnly: true },
];

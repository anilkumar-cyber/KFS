import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { getAllLoans } from "@/lib/queries/loans";
import { properties, auctionProperties } from "@/lib/data/properties";
import { getAllTaxServices } from "@/lib/queries/tax-services";
import { blogPosts } from "@/lib/data/blogs";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Browse a complete, organized list of every page on the Kavya Financial Services website.",
  alternates: { canonical: "/sitemap-page" },
};

type LinkItem = { label: string; href: string };
type LinkGroup = { heading: string; links: LinkItem[] };

export default async function SitemapPage() {
  const [loanProducts, taxServices] = await Promise.all([getAllLoans(), getAllTaxServices()]);

  const groups: LinkGroup[] = [
    {
      heading: "Main",
      links: [
        { label: "Home", href: "/" },
        { label: "EMI Calculator", href: "/emi-calculator" },
        { label: "Eligibility Calculator", href: "/eligibility-calculator" },
        { label: "Lead Generation & Marketing", href: "/lead-generation" },
      ],
    },
    {
      heading: "Loan Services",
      links: [
        { label: "All Loans", href: "/loans" },
        ...loanProducts.map((l) => ({ label: l.name, href: `/loans/${l.slug}` })),
      ],
    },
    {
      heading: "Real Estate",
      links: [
        { label: "All Properties", href: "/real-estate" },
        { label: "Auction Properties", href: "/auction-properties" },
        ...properties.map((p) => ({ label: p.title, href: `/real-estate/${p.slug}` })),
        ...auctionProperties.map((p) => ({ label: p.title, href: "/auction-properties" })),
      ],
    },
    {
      heading: "Tax & Compliance Services",
      links: [
        { label: "All Tax Services", href: "/tax-services" },
        ...taxServices.map((t) => ({ label: t.name, href: `/tax-services/${t.slug}` })),
      ],
    },
    {
      heading: "Blog",
      links: [
        { label: "All Articles", href: "/blogs" },
        ...blogPosts.map((b) => ({ label: b.title, href: `/blogs/${b.slug}` })),
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Testimonials", href: "/testimonials" },
        { label: "FAQ", href: "/faq" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Sitemap", href: "/sitemap-page" },
      ],
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Sitemap", href: "/sitemap-page" }]} />

      <section className="bg-hero-gradient py-14 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center gap-3">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white text-balance">Sitemap</h1>
            <p className="text-white/70 max-w-xl text-pretty">
              A complete, organized list of every page on our website.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {groups.map((group) => (
              <div key={group.heading}>
                <h2 className="font-heading font-bold text-lg mb-4 pb-2 border-b border-border">
                  {group.heading}
                </h2>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Hero } from "@/components/home/hero";
import { CalculatorsSection } from "@/components/home/calculators-section";
import { FeaturedLoans } from "@/components/home/featured-loans";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { StatsSection } from "@/components/home/stats-section";
import { PartnerBanks } from "@/components/home/partner-banks";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ServicesOverview } from "@/components/home/services-overview";
import { LatestBlogs } from "@/components/home/latest-blogs";
import { CtaSection } from "@/components/home/cta-section";
import { getAllLoans } from "@/lib/queries/loans";
import { getFeaturedProperties } from "@/lib/queries/properties";
import { getAllBanks } from "@/lib/queries/banks";
import { getApprovedTestimonials } from "@/lib/queries/testimonials";
import { getAllPosts } from "@/lib/queries/blogs";

export const metadata: Metadata = {
  title: `Home Loans, Real Estate & Financial Services | ${siteConfig.name}`,
  description:
    "Kavya Financial Services offers home loans, personal loans, business loans, real estate and GST/tax services across Telangana, Andhra Pradesh & Karnataka. Get the best rates from 25+ banks.",
  alternates: { canonical: "/" },
};

export const revalidate = 60;

const featuredLoanSlugs = [
  "home-loan",
  "personal-loan",
  "loan-against-property",
  "business-loan",
  "plot-loan",
  "car-loan",
  "education-loan",
  "commercial-loan",
];

export default async function Home() {
  const [allLoans, featuredProperties, banks, testimonials, posts] = await Promise.all([
    getAllLoans(),
    getFeaturedProperties(4),
    getAllBanks(),
    getApprovedTestimonials(),
    getAllPosts(),
  ]);

  const featuredLoans = featuredLoanSlugs
    .map((slug) => allLoans.find((l) => l.slug === slug))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedLoans loans={featuredLoans} />
      <CalculatorsSection />
      <FeaturedProperties properties={featuredProperties} />
      <WhyChooseUs />
      <ServicesOverview />
      <PartnerBanks banks={banks} />
      <TestimonialsSection testimonials={testimonials.slice(0, 6)} />
      <LatestBlogs posts={posts.slice(0, 3)} />
      <CtaSection />
    </>
  );
}

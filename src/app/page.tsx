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

export const metadata: Metadata = {
  title: `Home Loans, Real Estate & Financial Services | ${siteConfig.name}`,
  description:
    "Kavya Financial Services offers home loans, personal loans, business loans, real estate and GST/tax services across Telangana, Andhra Pradesh & Karnataka. Get the best rates from 25+ banks.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedLoans />
      <CalculatorsSection />
      <FeaturedProperties />
      <WhyChooseUs />
      <ServicesOverview />
      <PartnerBanks />
      <TestimonialsSection />
      <LatestBlogs />
      <CtaSection />
    </>
  );
}

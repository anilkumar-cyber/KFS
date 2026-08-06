import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  IndianRupee,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { LeadForm } from "@/components/shared/lead-form";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { getAllTaxServices } from "@/lib/queries/tax-services";
import { TaxServicesGrid } from "@/components/tax-services/tax-services-grid";

export const metadata: Metadata = {
  title: "GST, Income Tax & Compliance Services",
  description:
    "End-to-end GST registration & filing, TDS returns, income tax filing, company registration, PAN services, digital signatures and MSME registration — handled by Kavya Financial Services' dedicated compliance desk.",
  alternates: { canonical: "/tax-services" },
};

const whyChooseTaxDesk = [
  {
    icon: Users,
    title: "Dedicated Compliance Manager",
    description: "A single point of contact who understands your business and keeps every filing on track.",
  },
  {
    icon: Clock,
    title: "On-Time Filing Guarantee",
    description: "Proactive due-date reminders and timely submissions so you never pay a late fee or penalty.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    description: "No hidden charges — clear, upfront pricing for every service before we begin work.",
  },
  {
    icon: ShieldCheck,
    title: "Pan-India Digital Process",
    description: "Entirely online document collection, e-verification and filing — wherever you're located.",
  },
];

export const revalidate = 60;

export default async function TaxServicesPage() {
  const taxServices = await getAllTaxServices();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Tax & Compliance Services", href: "/tax-services" }]} />

      <section className="bg-hero-gradient py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-gold">
              <BadgeCheck className="size-7" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
              GST, Income Tax &amp; Compliance Services
            </h1>
            <p className="text-white/70 max-w-2xl text-pretty">
              From GST registration to company incorporation — our dedicated taxation desk handles the paperwork so
              you can focus on running your business, backed by transparent pricing and on-time filing.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Services"
            title="Complete Taxation & Compliance Coverage"
            description="Choose a service to see pricing, timelines, the process we follow, and documents required."
          />
          <TaxServicesGrid services={taxServices} />
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-muted/40">
        <Container>
          <SectionHeading
            eyebrow="Why Kavya"
            title="Why Choose Our Taxation Desk"
            description="A compliance partner that treats every filing deadline as seriously as you do."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChooseTaxDesk.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border/70 bg-card p-6 hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                  <item.icon className="size-5" />
                </div>
                <h3 className="font-heading font-bold text-base mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Get Started"
                title="Talk to Our Taxation Experts"
                description="Tell us what you need and our compliance team will reach out within 24 hours with a clear plan and pricing."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                >
                  Contact Us <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-border/80 shadow-premium p-6 sm:p-7">
              <LeadForm
                interestOptions={taxServices.map((s) => ({ value: s.slug, label: s.name }))}
                source="tax-services-hub"
                title="Get a Free Tax Consultation"
                description="Share your requirement and our compliance experts will get back to you."
                compact
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

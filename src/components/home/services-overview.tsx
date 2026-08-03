"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Calculator, Gavel, Megaphone, Receipt, Wallet } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

const services = [
  {
    icon: Wallet,
    title: "Secured & Unsecured Loans",
    description: "Home, mortgage, LAP, personal, business, education & car loans at the best rates.",
    href: "/loans",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description: "Farm lands, HMDA/DTCP plots, villas, apartments & commercial properties.",
    href: "/real-estate",
  },
  {
    icon: Gavel,
    title: "Auction Properties",
    description: "Bank-auctioned properties from SBI, PNB, BoB and other leading banks.",
    href: "/auction-properties",
  },
  {
    icon: Receipt,
    title: "GST & Taxation",
    description: "GST registration, filing, TDS, income tax returns & company registration.",
    href: "/tax-services",
  },
  {
    icon: Megaphone,
    title: "Lead Generation & Marketing",
    description: "Digital marketing, WhatsApp marketing, AI chatbots & landing pages for your business.",
    href: "/lead-generation",
  },
  {
    icon: Calculator,
    title: "Financial Calculators",
    description: "Free EMI & eligibility calculators to plan your finances with confidence.",
    href: "/emi-calculator",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title="One Partner, Every Financial Need"
          description="From your first loan to growing your business — we're with you at every step."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
            >
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 hover:shadow-premium hover:border-secondary/40 transition-all duration-300"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white mb-4 group-hover:bg-secondary transition-colors">
                  <service.icon className="size-6" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-1.5">{service.title}</h3>
                <p className="text-sm text-muted-foreground flex-1">{service.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="size-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  TrendingUp,
  GraduationCap,
  Heart,
  Users,
  Award,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/shared/lead-form";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Kavya Financial Services. Explore current openings in loans, real estate, taxation and digital marketing across Telangana, Andhra Pradesh & Karnataka.",
  alternates: { canonical: "/careers" },
};

const benefits = [
  {
    title: "Growth Opportunities",
    description: "Clear career progression paths from associate to team lead within 18-24 months of strong performance.",
    icon: TrendingUp,
  },
  {
    title: "Incentive-Based Commissions",
    description: "Attractive, uncapped incentive structures on top of fixed pay for customer-facing roles.",
    icon: Award,
  },
  {
    title: "Training Programs",
    description: "Structured onboarding and ongoing training on loan products, compliance and sales skills.",
    icon: GraduationCap,
  },
  {
    title: "Collaborative Culture",
    description: "A supportive, target-driven yet friendly work culture that celebrates wins together.",
    icon: Users,
  },
  {
    title: "Health & Wellness",
    description: "Group health insurance coverage and wellness support for all full-time employees.",
    icon: Heart,
  },
  {
    title: "Meaningful Work",
    description: "Help thousands of families and businesses make life-changing financial decisions every year.",
    icon: Briefcase,
  },
];

const jobOpenings = [
  {
    title: "Loan Relationship Manager",
    location: siteConfig.locations[0],
    type: "Full-time",
    description:
      "Manage end-to-end loan applications for home, personal and business loan customers, coordinating with our partner banks to ensure fast approvals and excellent customer experience.",
  },
  {
    title: "Real Estate Consultant",
    location: siteConfig.locations[0],
    type: "Full-time",
    description:
      "Advise customers on property purchases, conduct site visits, and coordinate legal verification for plots, apartments and villas across our listed properties.",
  },
  {
    title: "Tax Associate",
    location: siteConfig.locations[1],
    type: "Full-time",
    description:
      "Support GST registration, filing and income tax return preparation for individual and business clients, ensuring accuracy and on-time compliance.",
  },
  {
    title: "Digital Marketing Executive",
    location: siteConfig.locations[0],
    type: "Full-time",
    description:
      "Plan and execute digital campaigns, manage social media and support lead-generation efforts for our loans, real estate and tax service lines.",
  },
  {
    title: "Telecaller / Lead Qualifier",
    location: siteConfig.locations[2],
    type: "Full-time",
    description:
      "Handle inbound and outbound calls to qualify leads, schedule consultations, and maintain accurate records in our CRM system.",
  },
  {
    title: "Business Development Manager",
    location: siteConfig.locations[1],
    type: "Full-time",
    description:
      "Build partnerships with builders, developers and channel partners to expand our real estate and loan referral network in your region.",
  },
];

const interestOptions = [
  ...jobOpenings.map((job) => ({ value: job.title, label: job.title })),
  { value: "General Application", label: "General Application" },
];

export default function CareersPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Careers", href: "/careers" }]} />

      <section className="bg-hero-gradient py-16 sm:py-24">
        <Container>
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
              Careers at Kavya
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white text-balance">
              Join Our Team
            </h1>
            <p className="text-white/70 text-pretty">
              Build a rewarding career helping thousands of families and businesses across Telangana, Andhra
              Pradesh &amp; Karnataka achieve their financial goals.
            </p>
            <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-white font-semibold mt-2">
              <a href="#apply">
                View Openings <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </Container>
      </section>

      {/* Why work with us */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Why Kavya"
            title="Why Work With Us"
            description="We invest in our people because they're the reason our customers keep coming back."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border/70 p-6 hover:shadow-premium transition-shadow">
                <div className="flex size-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-4">
                  <b.icon className="size-5" />
                </div>
                <h3 className="font-heading font-bold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Job openings */}
      <section className="py-14 sm:py-20 bg-muted/40">
        <Container>
          <SectionHeading
            eyebrow="Current Openings"
            title="Explore Open Roles"
            description="Don't see a perfect fit? Submit a general application below — we're always looking for great talent."
          />
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {jobOpenings.map((job) => (
              <div key={job.title} className="rounded-2xl bg-card border border-border/70 p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading font-bold text-lg">{job.title}</h3>
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" /> {job.location}
                  <span className="mx-1">&middot;</span>
                  <Clock className="size-3.5" /> {job.type}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
                <a
                  href="#apply"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:underline w-fit"
                >
                  Apply Now <ArrowRight className="size-4" />
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Apply form */}
      <section id="apply" className="py-14 sm:py-20 scroll-mt-20">
        <Container>
          <div className="max-w-2xl mx-auto rounded-3xl border border-border/80 shadow-premium p-6 sm:p-8">
            <LeadForm
              interestOptions={interestOptions}
              source="careers-application"
              title="Apply Now"
              description="Fill in your details below and our HR team will reach out about the role you're interested in."
            />
          </div>
        </Container>
      </section>
    </>
  );
}

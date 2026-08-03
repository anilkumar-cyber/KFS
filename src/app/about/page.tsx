import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye as EyeIcon, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { companyStats } from "@/lib/data/stats";
import { getIcon } from "@/lib/icon-map";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Kavya Financial Services — our journey, mission, leadership team, and 12+ years of trusted financial partnership across Telangana, Andhra Pradesh & Karnataka.",
  alternates: { canonical: "/about" },
};

const journey = [
  {
    year: "2013",
    title: "Kavya Financial Services Founded",
    description:
      "Started as a small loan advisory desk in Hyderabad with a mission to simplify home loans for first-time buyers.",
  },
  {
    year: "2016",
    title: "Multi-Bank Partnership Network",
    description:
      "Expanded partnerships to 15+ banks and NBFCs, enabling customers to compare and choose the best loan offers under one roof.",
  },
  {
    year: "2017",
    title: "Real Estate Division Launched",
    description:
      "Entered real estate advisory with verified HMDA/DTCP plots, apartments and villas across Telangana and Andhra Pradesh.",
  },
  {
    year: "2019",
    title: "Taxation & Compliance Services",
    description:
      "Launched GST, income tax and company registration services to become a true one-stop financial partner for individuals and businesses.",
  },
  {
    year: "2022",
    title: "50,000+ Customers Milestone",
    description:
      "Crossed 50,000 happy customers and ₹2,000+ Crore in loans disbursed across three states.",
  },
  {
    year: "2023",
    title: "Digital Transformation",
    description:
      "Launched online eligibility & EMI calculators, digital document uploads and WhatsApp-based support for a seamless customer experience.",
  },
  {
    year: "2026",
    title: "Growing Stronger, Together",
    description:
      "Today we serve customers across 15+ cities in Telangana, Andhra Pradesh & Karnataka with 25+ lending partners and a full suite of financial services.",
  },
];

const leadership = [
  {
    name: "Kavya Reddy",
    title: "Founder & Managing Director",
    bio: "20+ years in retail banking and financial advisory, leading Kavya's vision of accessible, transparent financial services.",
    photo: "https://i.pravatar.cc/300?img=47",
  },
  {
    name: "Srinivas Rao",
    title: "Head of Loans & Banking Relations",
    bio: "Manages Kavya's network of 25+ partner banks and NBFCs, ensuring customers always get the most competitive rates.",
    photo: "https://i.pravatar.cc/300?img=33",
  },
  {
    name: "Meera Iyer",
    title: "Head of Real Estate",
    bio: "Oversees property verification, legal due-diligence and the real estate advisory team across all three states.",
    photo: "https://i.pravatar.cc/300?img=45",
  },
  {
    name: "Vikram Chowdary",
    title: "Head of Taxation & Compliance",
    bio: "Chartered accountant leading the GST, income tax and company registration desk with a 100% on-time filing record.",
    photo: "https://i.pravatar.cc/300?img=12",
  },
];

const locationDetails = [
  {
    state: "Telangana",
    description:
      "Our home base — headquartered in Hyderabad's Financial District, with dedicated relationship managers serving Hyderabad, Warangal, Karimnagar and Nizamabad.",
  },
  {
    state: "Andhra Pradesh",
    description:
      "Strong presence across Vijayawada, Visakhapatnam and Guntur, helping customers with home loans, plots and taxation services in the fast-growing AP corridor.",
  },
  {
    state: "Karnataka",
    description:
      "Serving Bangalore and Mysuru with a focus on real estate advisory and business loans for the region's thriving IT and startup ecosystem.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "About Us", href: "/about" }]} />

      <section className="bg-hero-gradient py-16 sm:py-24">
        <Container>
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
              About Kavya Financial Services
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white text-balance">
              {siteConfig.tagline}
            </h1>
            <p className="text-white/70 text-pretty">
              For over a decade, Kavya Financial Services has helped families and businesses across Telangana,
              Andhra Pradesh & Karnataka access the right loans, the right property, and the right financial
              guidance — with complete transparency at every step.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission / Vision */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-border/70 p-8 shadow-premium">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary mb-5">
                <Target className="size-6" />
              </div>
              <h2 className="font-heading text-xl font-bold mb-3">Our Mission</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To make financial services — loans, real estate, and taxation — simple, transparent and accessible
                to every individual and business across Telangana, Andhra Pradesh & Karnataka, by comparing the
                best options across our trusted partner network and guiding customers end-to-end.
              </p>
            </div>
            <div className="rounded-3xl border border-border/70 p-8 shadow-premium">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-5">
                <EyeIcon className="size-6" />
              </div>
              <h2 className="font-heading text-xl font-bold mb-3">Our Vision</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To be South India&apos;s most trusted one-stop financial partner — recognized for integrity, speed and
                genuinely putting the customer&apos;s best interest first, in every loan, property and tax decision we
                help with.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Journey timeline */}
      <section className="py-14 sm:py-20 bg-muted/40">
        <Container>
          <SectionHeading
            eyebrow="Our Journey"
            title="12+ Years of Building Trust"
            description="From a small loan advisory desk to a full-service financial partner across three states."
          />
          <div className="mt-12 max-w-2xl mx-auto">
            {journey.map((item) => (
              <div key={item.year} className="relative pl-8 pb-10 last:pb-0 border-l border-border">
                <span className="absolute -left-[7px] top-0 flex size-3.5 items-center justify-center rounded-full bg-secondary ring-4 ring-background" />
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{item.year}</span>
                <h3 className="font-heading font-bold text-lg mt-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats band */}
      <section className="relative py-16 sm:py-20 bg-hero-gradient overflow-hidden">
        <Container className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {companyStats.map((stat) => {
              const Icon = getIcon(stat.icon);
              return (
                <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                  <Icon className="size-6 text-gold" />
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                  <span className="text-xs sm:text-sm text-white/60">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Leadership Team"
            title="The People Behind Kavya"
            description="Experienced leaders in banking, real estate and taxation, dedicated to serving you better."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member) => (
              <div key={member.name} className="rounded-2xl border border-border/70 p-6 text-center hover:shadow-premium transition-shadow">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="size-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-secondary/10"
                />
                <h3 className="font-heading font-bold">{member.name}</h3>
                <p className="text-xs font-semibold text-secondary mt-0.5">{member.title}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Locations served */}
      <section className="py-14 sm:py-20 bg-muted/40">
        <Container>
          <SectionHeading
            eyebrow="Where We Operate"
            title="Serving Three States, One Promise"
            description="Local expertise combined with a state-wide network of partner banks, legal experts and property specialists."
          />
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {locationDetails.map((loc) => (
              <div key={loc.state} className="rounded-2xl bg-card border border-border/70 p-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <MapPin className="size-5" />
                </div>
                <h3 className="font-heading font-bold mb-2">{loc.state}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{loc.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-3xl bg-hero-gradient px-6 py-14 sm:py-16 text-center flex flex-col items-center gap-5">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white text-balance max-w-xl">
              Ready to work with a financial partner you can trust?
            </h2>
            <p className="text-white/70 max-w-lg text-pretty">
              Talk to our team today for a free consultation on loans, real estate or taxation services.
            </p>
            <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-white font-semibold">
              <Link href="/contact">
                Get in Touch <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

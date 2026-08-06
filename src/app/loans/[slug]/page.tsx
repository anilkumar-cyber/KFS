import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  FileText,
  Percent,
  IndianRupee,
  CalendarClock,
  Clock,
  ArrowRight,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { EmiCalculator } from "@/components/calculators/emi-calculator";
import { LeadForm } from "@/components/shared/lead-form";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/shared/json-ld";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LoanGrid } from "@/components/loans/loan-grid";
import { RevealSection } from "@/components/loans/reveal-section";
import { renderLoanIcon } from "@/components/loans/loan-icon";
import { getAllLoans, getLoanBySlug, getRelatedLoans } from "@/lib/queries/loans";

export const revalidate = 60;

export async function generateStaticParams() {
  const loans = await getAllLoans();
  return loans.map((loan) => ({ slug: loan.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loan = await getLoanBySlug(slug);
  if (!loan) return {};

  return {
    title: `${loan.name} - Interest Rates, Eligibility & Apply Online`,
    description: loan.description,
    alternates: { canonical: `/loans/${loan.slug}` },
  };
}

function parseRate(rateStr: string): number {
  const match = rateStr.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 10;
}

function parseAmount(amountStr: string): number {
  const match = amountStr.match(/([\d.]+)\s*(Crore|Lakh)/i);
  if (!match) return 2000000;
  const num = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  return unit === "crore" ? num * 10000000 : num * 100000;
}

function parseTenure(tenureStr: string): number {
  const match = tenureStr.match(/\d+/);
  return match ? Math.min(30, parseInt(match[0], 10)) : 15;
}

export default async function LoanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loan = await getLoanBySlug(slug);

  if (!loan) {
    notFound();
  }

  const [relatedLoans, allLoans] = await Promise.all([
    getRelatedLoans(loan.slug, loan.category, 3),
    getAllLoans(),
  ]);

  const maxAmountNum = parseAmount(loan.maxAmount);
  const defaultPrincipal = Math.max(100000, Math.round((maxAmountNum * 0.4) / 10000) * 10000);
  const defaultRate = parseRate(loan.interestRate);
  const defaultTenure = parseTenure(loan.maxTenure);

  const interestOptions = allLoans.map((l) => ({ value: l.slug, label: l.name }));

  const quickStats = [
    { icon: Percent, label: "Interest Rate", value: loan.interestRate },
    { icon: IndianRupee, label: "Max Loan Amount", value: loan.maxAmount },
    { icon: CalendarClock, label: "Max Tenure", value: loan.maxTenure },
    { icon: Clock, label: "Processing Time", value: loan.processingTime },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Loan Services", href: "/loans" },
          { name: loan.name, href: `/loans/${loan.slug}` },
        ]}
      />
      <FaqJsonLd faqs={loan.faqs} />

      <section className="bg-hero-gradient py-14 sm:py-20">
        <Container>
          <Breadcrumb className="mb-8">
            <BreadcrumbList className="text-white/60">
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />} className="hover:text-white">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="[&>svg]:text-white/40" />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/loans" />} className="hover:text-white">
                  Loan Services
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="[&>svg]:text-white/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">{loan.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col items-center text-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
              {loan.category === "secured" ? (
                <ShieldCheck className="size-3.5" />
              ) : (
                <Wallet className="size-3.5" />
              )}
              {loan.category === "secured" ? "Secured Loan" : "Unsecured Loan"}
            </span>
            <div className="flex size-16 items-center justify-center rounded-2xl bg-white/10 text-gold">
              {renderLoanIcon(loan.icon, "size-8")}
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white text-balance max-w-3xl">
              {loan.name}
            </h1>
            <p className="text-white/70 max-w-2xl text-pretty text-base sm:text-lg">{loan.tagline}</p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-white font-semibold px-6">
                <Link href="#apply-now">
                  Apply Now <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white px-6"
              >
                <Link href="#emi-calculator">Calculate EMI</Link>
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl">
              {quickStats.map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-4 text-left">
                  <stat.icon className="size-4 text-gold mb-2" />
                  <p className="text-[11px] uppercase tracking-wide text-white/60">{stat.label}</p>
                  <p className="text-sm font-bold text-white mt-0.5">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <RevealSection className="max-w-3xl mx-auto text-center">
            <SectionHeading eyebrow="Overview" title={`About ${loan.name}`} description={loan.description} />
          </RevealSection>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-muted/40">
        <Container>
          <SectionHeading
            eyebrow="Benefits"
            title="Why Choose This Loan"
            description={`Key advantages of the ${loan.name.toLowerCase()} from Kavya Financial Services.`}
            align="left"
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loan.benefits.map((benefit, i) => (
              <RevealSection key={benefit} delay={(i % 3) * 0.06} className="flex items-start gap-3 rounded-2xl bg-card border border-border/70 p-5">
                <CheckCircle2 className="size-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{benefit}</p>
              </RevealSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Eligibility" title="Who Can Apply" align="left" />
              <ul className="mt-8 flex flex-col gap-4">
                {loan.eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Documents" title="Documents Required" align="left" />
              <ul className="mt-8 flex flex-col gap-4">
                {loan.documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <FileText className="size-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="emi-calculator" className="py-14 sm:py-20 bg-muted/40 scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow="EMI Calculator"
            title="Estimate Your Monthly EMI"
            description={`See what your monthly instalments would look like for a typical ${loan.name.toLowerCase()}. Adjust the amount, rate and tenure to match your needs.`}
          />
          <div className="mt-10 max-w-4xl mx-auto">
            <EmiCalculator
              defaultPrincipal={defaultPrincipal}
              defaultRate={defaultRate}
              defaultTenure={defaultTenure}
              maxPrincipal={Math.max(maxAmountNum, defaultPrincipal)}
            />
          </div>
        </Container>
      </section>

      {loan.faqs.length > 0 && (
        <section className="py-14 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="FAQs"
              title="Frequently Asked Questions"
              description={`Common questions about the ${loan.name.toLowerCase()}.`}
            />
            <div className="mt-10 max-w-3xl mx-auto rounded-3xl border border-border/70 bg-card px-6 sm:px-8 shadow-premium">
              <Accordion className="w-full">
                {loan.faqs.map((faq, i) => (
                  <AccordionItem key={faq.question} value={`faq-${i}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>
      )}

      <section id="apply-now" className="py-14 sm:py-20 bg-muted/40 scroll-mt-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <SectionHeading
                eyebrow="Apply Now"
                title={`Get Started with Your ${loan.name}`}
                description="Share your details below and our loan experts will get in touch within 24 hours to guide you through the best offers available."
                align="left"
              />
              <ul className="mt-8 flex flex-col gap-3">
                {["No hidden charges", "Offers from 25+ banks & NBFCs compared", "End-to-end paperwork assistance"].map(
                  (point) => (
                    <li key={point} className="flex items-center gap-3 text-sm text-foreground">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      {point}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="rounded-3xl border border-border/80 bg-card shadow-premium p-6 sm:p-8">
              <LeadForm
                interestOptions={interestOptions}
                defaultInterest={loan.slug}
                source={`loan-detail-${loan.slug}`}
                title={`Apply for ${loan.name}`}
                description="Get a call back from our loan experts within 24 hours."
              />
            </div>
          </div>
        </Container>
      </section>

      {relatedLoans.length > 0 && (
        <section className="py-14 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Related Loans"
              title="You May Also Be Interested In"
              align="left"
            />
            <div className="mt-10">
              <LoanGrid loans={relatedLoans} columns="sm:grid-cols-2 lg:grid-cols-3" />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

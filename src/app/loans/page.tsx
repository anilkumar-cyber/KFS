import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Wallet, ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { getSecuredLoans, getUnsecuredLoans } from "@/lib/queries/loans";
import { LoanGrid } from "@/components/loans/loan-grid";

export const metadata: Metadata = {
  title: "Loan Services - Home, Personal, Business & More Loans",
  description:
    "Explore Kavya Financial Services' full range of secured and unsecured loans - home, mortgage, loan against property, personal, business, education, car loans & more. Sourced from 25+ banks & NBFCs at the best rates.",
  alternates: { canonical: "/loans" },
};

export const revalidate = 60;

export default async function LoansPage() {
  const [securedLoans, unsecuredLoans] = await Promise.all([getSecuredLoans(), getUnsecuredLoans()]);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Loan Services", href: "/loans" }]} />

      <section className="bg-hero-gradient py-16 sm:py-24">
        <Container>
          <div className="flex flex-col items-center text-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
              <Sparkles className="size-3.5" /> 13 Loan Products
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white text-balance max-w-3xl">
              Loan Services Tailored to Every Financial Need
            </h1>
            <p className="text-white/70 max-w-2xl text-pretty text-base sm:text-lg">
              From owning your dream home to fueling business growth, we source secured and unsecured loans from
              25+ leading banks and NBFCs — comparing rates and managing paperwork so you get the best deal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-white font-semibold px-6">
                <Link href="/eligibility-calculator">
                  Check Eligibility <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white px-6"
              >
                <Link href="/emi-calculator">Calculate EMI</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24" id="secured-loans">
        <Container>
          <SectionHeading
            eyebrow="Secured Loans"
            title="Backed by Collateral, Built for Bigger Goals"
            description="Leverage property or assets as collateral to unlock higher loan amounts, longer tenures, and lower interest rates."
            align="left"
          />
          <div className="mt-6 mb-10 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3.5 py-1.5 text-xs font-semibold text-secondary">
            <ShieldCheck className="size-4" /> {securedLoans.length} Secured Loan Products
          </div>
          <LoanGrid loans={securedLoans} />
        </Container>
      </section>

      <section className="py-16 sm:py-24 bg-muted/40" id="unsecured-loans">
        <Container>
          <SectionHeading
            eyebrow="Unsecured Loans"
            title="Collateral-Free Funding, Fast Approvals"
            description="Get quick access to funds for personal needs, education, or business growth — no collateral required."
            align="left"
          />
          <div className="mt-6 mb-10 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent">
            <Wallet className="size-4" /> {unsecuredLoans.length} Unsecured Loan Products
          </div>
          <LoanGrid loans={unsecuredLoans} />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-hero-gradient px-6 py-14 sm:px-14 sm:py-16 text-center">
            <div className="relative flex flex-col items-center gap-5">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white text-balance max-w-xl">
                Not Sure Which Loan Fits Your Needs?
              </h2>
              <p className="text-white/70 max-w-xl text-pretty">
                Use our free eligibility calculator to find out how much you can borrow based on your income, age
                and credit profile — in under a minute.
              </p>
              <Button asChild size="lg" className="rounded-full bg-gold hover:bg-gold/90 text-primary font-semibold px-7">
                <Link href="/eligibility-calculator">
                  Check My Eligibility <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

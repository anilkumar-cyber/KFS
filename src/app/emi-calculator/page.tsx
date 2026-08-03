import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { EmiCalculator } from "@/components/calculators/emi-calculator";
import { LeadForm } from "@/components/shared/lead-form";
import { loanProducts } from "@/lib/data/loans";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = {
  title: "EMI Calculator - Calculate Your Loan EMI Online",
  description:
    "Free EMI calculator for home loans, personal loans, business loans & more. Calculate your monthly EMI, total interest and view the payment schedule instantly.",
  alternates: { canonical: "/emi-calculator" },
};

const interestOptions = loanProducts.map((l) => ({ value: l.slug, label: l.name }));

export default function EmiCalculatorPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "EMI Calculator", href: "/emi-calculator" }]} />
      <section className="bg-hero-gradient py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-gold">
              <Calculator className="size-7" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white text-balance">
              Free EMI Calculator
            </h1>
            <p className="text-white/70 max-w-xl text-pretty">
              Estimate your monthly EMI, total interest payable, and view a detailed year-by-year payment schedule
              for any loan type in seconds.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <EmiCalculator maxPrincipal={100000000} />
            </div>
            <div className="rounded-3xl border border-border/80 shadow-premium p-6 sm:p-7">
              <LeadForm
                interestOptions={interestOptions}
                source="emi-calculator-page"
                title="Get the Best Rate for This EMI"
                description="Share your details and our loan experts will find you the lowest interest rate."
                compact
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-muted/40">
        <Container>
          <SectionHeading
            eyebrow="How It Works"
            title="Understanding Your EMI"
            description="EMI (Equated Monthly Installment) is the fixed amount you pay each month towards your loan, comprising both principal and interest."
          />
          <div className="mt-10 grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto text-center">
            {[
              { title: "Principal", desc: "The original loan amount you borrow from the lender." },
              { title: "Interest Rate", desc: "The annual rate charged by the lender, applied monthly to your outstanding balance." },
              { title: "Tenure", desc: "The total duration over which you repay the loan, from 1 to 30 years." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-card border border-border/70 p-6">
                <h3 className="font-heading font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

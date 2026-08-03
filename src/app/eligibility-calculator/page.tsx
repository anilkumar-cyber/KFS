import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { EligibilityCalculator } from "@/components/calculators/eligibility-calculator";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = {
  title: "Loan Eligibility Calculator - Check Your Eligible Loan Amount",
  description:
    "Check how much loan you're eligible for based on your income, age, credit score and existing obligations. Free instant loan eligibility calculator.",
  alternates: { canonical: "/eligibility-calculator" },
};

export default function EligibilityCalculatorPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Eligibility Calculator", href: "/eligibility-calculator" }]} />
      <section className="bg-hero-gradient py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-gold">
              <Sparkles className="size-7" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white text-balance">
              Loan Eligibility Calculator
            </h1>
            <p className="text-white/70 max-w-xl text-pretty">
              Find out how much loan you're likely eligible for based on your income, age, occupation and credit
              profile — in under a minute.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="max-w-2xl mx-auto">
            <EligibilityCalculator />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-muted/40">
        <Container>
          <SectionHeading
            eyebrow="Factors We Consider"
            title="What Determines Your Loan Eligibility?"
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-5xl mx-auto text-center">
            {[
              { title: "Monthly Income", desc: "Higher stable income increases your borrowing capacity." },
              { title: "Age", desc: "Determines the maximum tenure available for your loan." },
              { title: "Credit Score", desc: "A score of 750+ improves both eligibility and interest rate." },
              { title: "Existing EMIs", desc: "Current obligations reduce your available EMI capacity." },
              { title: "Occupation Type", desc: "Salaried, self-employed & professionals are assessed differently." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-card border border-border/70 p-5">
                <h3 className="font-heading font-bold text-sm mb-1.5">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

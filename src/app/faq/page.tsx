import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/shared/json-ld";
import { getAllFaqs } from "@/lib/queries/faqs";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about loans, real estate, taxation services and working with Kavya Financial Services.",
  alternates: { canonical: "/faq" },
};

const categoryOrder = ["General", "Loans", "Real Estate", "Taxation"];

export default async function FaqPage() {
  const generalFaqs = await getAllFaqs();

  const grouped = categoryOrder
    .map((category) => ({
      category,
      items: generalFaqs.filter((f) => f.category === category),
    }))
    .filter((g) => g.items.length > 0);

  // Include any categories not explicitly ordered above
  const extraCategories = Array.from(new Set(generalFaqs.map((f) => f.category))).filter(
    (c) => !categoryOrder.includes(c)
  );
  extraCategories.forEach((category) => {
    grouped.push({ category, items: generalFaqs.filter((f) => f.category === category) });
  });

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]} />
      <FaqJsonLd faqs={generalFaqs.map(({ question, answer }) => ({ question, answer }))} />

      <section className="bg-hero-gradient py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-gold">
              <HelpCircle className="size-7" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white text-balance">
              Frequently Asked Questions
            </h1>
            <p className="text-white/70 max-w-xl text-pretty">
              Everything you need to know about our loans, real estate and taxation services.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto flex flex-col gap-12">
            {grouped.map((group) => (
              <div key={group.category}>
                <SectionHeading align="left" title={group.category} className="mb-6" />
                <Accordion className="w-full rounded-2xl border border-border/70 px-5 sm:px-6 bg-card">
                  {group.items.map((faq, i) => (
                    <AccordionItem key={`${group.category}-${i}`} value={`${group.category}-${i}`}>
                      <AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-3xl bg-hero-gradient px-6 py-14 sm:py-16 text-center flex flex-col items-center gap-5">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white text-balance max-w-xl">
              Still have questions?
            </h2>
            <p className="text-white/70 max-w-lg text-pretty">
              Our team is happy to help. Reach out for a free, no-obligation consultation.
            </p>
            <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-white font-semibold">
              <Link href="/contact">
                Contact Us <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

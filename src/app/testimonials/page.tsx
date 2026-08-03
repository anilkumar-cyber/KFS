import type { Metadata } from "next";
import Link from "next/link";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { testimonials } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "Customer Testimonials",
  description:
    "Read real stories from customers who trusted Kavya Financial Services for home loans, business loans, real estate and taxation services across Telangana, Andhra Pradesh & Karnataka.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Testimonials", href: "/testimonials" }]} />

      <section className="bg-hero-gradient py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-gold">
              <Quote className="size-7" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white text-balance">
              What Our Customers Say
            </h1>
            <p className="text-white/70 max-w-xl text-pretty">
              Real stories from over 50,000 customers we&apos;ve helped across Telangana, Andhra Pradesh &amp; Karnataka.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted by Thousands of Families & Businesses"
            description="From first home purchases to business expansion loans, here's how we've helped our customers succeed."
          />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-border/70 p-6 flex flex-col gap-4 hover:shadow-premium transition-shadow bg-card"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold" />
                    ))}
                  </div>
                  <Quote className="size-6 text-muted-foreground/30" />
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img src={t.avatar} alt={t.name} className="size-11 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.location} &middot; {t.service}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-3xl bg-hero-gradient px-6 py-14 sm:py-16 text-center flex flex-col items-center gap-5">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white text-balance max-w-xl">
              Had a great experience with us?
            </h2>
            <p className="text-white/70 max-w-lg text-pretty">
              We&apos;d love to hear your story. Share your experience and help other customers make confident financial
              decisions.
            </p>
            <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-white font-semibold">
              <Link href="/contact">
                Share Your Story <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

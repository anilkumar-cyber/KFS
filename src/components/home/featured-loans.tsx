"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import type { LoanProduct } from "@/lib/queries/loans";
import { getIcon } from "@/lib/icon-map";

export function FeaturedLoans({ loans }: { loans: LoanProduct[] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Loan Products"
          title="Financing Solutions for Every Need"
          description="Secured and unsecured loans sourced from 25+ partner banks and NBFCs, tailored to your financial goals."
        />

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {loans.map((loan, i) => {
            const Icon = getIcon(loan.icon);
            return (
              <motion.div
                key={loan.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              >
                <Link href={`/loans/${loan.slug}`}>
                  <Card className="group relative h-full rounded-2xl border-border/70 p-5 sm:p-6 hover:border-secondary/40 hover:shadow-premium transition-all duration-300 overflow-hidden">
                    <div className="absolute -right-6 -top-6 size-24 rounded-full bg-secondary/5 group-hover:bg-secondary/10 transition-colors" />
                    <div className="relative flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white mb-4 group-hover:scale-105 transition-transform">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="relative font-heading font-bold text-base mb-1.5">{loan.shortName}</h3>
                    <p className="relative text-xs text-muted-foreground mb-3">{loan.interestRate}</p>
                    <span className="relative inline-flex items-center gap-1 text-xs font-semibold text-secondary group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="size-3.5" />
                    </span>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/loans"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors"
          >
            View All Loan Products <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

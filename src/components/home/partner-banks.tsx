"use client";

import { motion } from "framer-motion";
import { Landmark } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { partnerBanks } from "@/lib/data/banks";

export function PartnerBanks() {
  return (
    <section className="py-20 sm:py-24 border-y border-border/60">
      <Container>
        <SectionHeading eyebrow="Our Network" title="Trusted by 25+ Banks & NBFCs" />

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {partnerBanks.map((bank, i) => (
            <motion.div
              key={bank.shortName}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 6) * 0.05 }}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border/70 bg-card py-6 px-3 text-center hover:border-secondary/40 hover:shadow-premium transition-all"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-muted text-primary">
                <Landmark className="size-5" />
              </div>
              <span className="text-xs font-semibold leading-tight">{bank.shortName}</span>
              <span className="text-[10px] text-muted-foreground">{bank.type}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

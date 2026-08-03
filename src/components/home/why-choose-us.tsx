"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { whyChooseUs } from "@/lib/data/stats";
import { getIcon } from "@/lib/icon-map";

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Kavya"
          title="A Financial Partner You Can Rely On"
          description="12+ years of experience helping families and businesses across South India achieve their financial goals."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChooseUs.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="rounded-2xl border border-border/70 bg-card p-6 hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-heading font-bold text-base mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

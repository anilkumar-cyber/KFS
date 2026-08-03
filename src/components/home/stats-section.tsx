"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { companyStats } from "@/lib/data/stats";
import { getIcon } from "@/lib/icon-map";

export function StatsSection() {
  return (
    <section className="relative py-16 sm:py-20 bg-hero-gradient overflow-hidden">
      <Container className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {companyStats.map((stat, i) => {
            const Icon = getIcon(stat.icon);
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col items-center text-center gap-2"
              >
                <Icon className="size-6 text-gold" />
                <span className="font-heading text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-xs sm:text-sm text-white/60">{stat.label}</span>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

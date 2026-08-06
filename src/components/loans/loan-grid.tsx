"use client";

import { motion } from "framer-motion";
import type { LoanProduct } from "@/lib/queries/loans";
import { LoanCard } from "@/components/loans/loan-card";
import { cn } from "@/lib/utils";

export function LoanGrid({
  loans,
  className,
  columns = "sm:grid-cols-2 lg:grid-cols-4",
}: {
  loans: LoanProduct[];
  className?: string;
  columns?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:gap-5", columns, className)}>
      {loans.map((loan, i) => (
        <motion.div
          key={loan.slug}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
        >
          <LoanCard loan={loan} />
        </motion.div>
      ))}
    </div>
  );
}

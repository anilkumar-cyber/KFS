"use client";

import { motion } from "framer-motion";

export function ProcessStepper({ steps }: { steps: { step: string; description: string }[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((item, i) => (
        <motion.div
          key={item.step}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="relative flex flex-col"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-heading font-bold">
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="hidden sm:block h-0.5 flex-1 bg-border" aria-hidden="true" />
            )}
          </div>
          <div className="mt-4">
            <h3 className="font-heading font-bold text-base mb-1.5">{item.step}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

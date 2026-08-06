"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, IndianRupee } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { TaxService } from "@/lib/queries/tax-services";

export function TaxServicesGrid({ services }: { services: TaxService[] }) {
  return (
    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((service, i) => {
        const Icon = getIcon(service.icon);
        return (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
          >
            <Link
              href={`/tax-services/${service.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 hover:shadow-premium hover:border-secondary/40 transition-all duration-300"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white mb-4 group-hover:bg-secondary transition-colors">
                <Icon className="size-6" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-1.5">{service.name}</h3>
              <p className="text-sm text-muted-foreground flex-1">{service.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <IndianRupee className="size-3.5 text-accent" />
                  {service.price}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5 text-accent" />
                  {service.timeline}
                </span>
              </div>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="size-4" />
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

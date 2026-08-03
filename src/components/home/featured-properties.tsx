"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BedDouble, Landmark, MapPin, Ruler } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { properties } from "@/lib/data/properties";

export function FeaturedProperties() {
  const featured = properties.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-muted/40">
      <Container>
        <SectionHeading
          eyebrow="Real Estate"
          title="Featured Properties"
          description="Hand-picked plots, villas & apartments across Telangana, Andhra Pradesh and Karnataka, verified and bank-loan ready."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link href={`/real-estate/${property.slug}`}>
                <Card className="group h-full overflow-hidden rounded-2xl border-border/70 p-0 hover:shadow-premium transition-all duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary text-white">{property.typeLabel}</Badge>
                    {property.bankLoanAvailable && (
                      <Badge className="absolute top-3 right-3 bg-accent text-white gap-1">
                        <Landmark className="size-3" /> Loan Available
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-heading font-bold text-sm leading-snug line-clamp-1">{property.title}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="size-3" /> {property.location}, {property.city}
                    </p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Ruler className="size-3.5" /> {property.areaSqft.toLocaleString("en-IN")} sqft
                      </span>
                      {property.bedrooms && (
                        <span className="flex items-center gap-1">
                          <BedDouble className="size-3.5" /> {property.bedrooms} BHK
                        </span>
                      )}
                    </div>
                    <p className="mt-3 font-heading font-bold text-secondary text-lg">{property.priceLabel}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/real-estate"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
          >
            Browse All Properties <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] bg-hero-gradient px-6 py-16 sm:px-16 sm:py-20 text-center"
        >
          <div className="pointer-events-none absolute -top-20 right-0 size-72 rounded-full bg-gold/10 blur-[100px]" />
          <h2 className="relative font-heading text-3xl sm:text-4xl font-bold text-white text-balance max-w-2xl mx-auto">
            Ready to Take the Next Step Towards Your Financial Goals?
          </h2>
          <p className="relative mt-4 text-white/70 max-w-xl mx-auto text-pretty">
            Talk to our experts today for a free, no-obligation consultation on loans, real estate, or taxation services.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-gold text-primary hover:bg-gold/90 font-bold h-12 px-7">
              <Link href="/contact">
                Get Free Consultation <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full h-12 px-7 border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white"
            >
              <a href={`tel:${siteConfig.phoneRaw}`}>
                <Phone className="size-4" /> {siteConfig.phone}
              </a>
            </Button>
            <Button asChild size="lg" className="rounded-full h-12 px-7 bg-[#25D366] text-white hover:bg-[#1EBE5A] font-semibold">
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5" /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

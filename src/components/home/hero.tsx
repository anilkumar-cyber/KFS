"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Home, Building2, Wallet, MapPin, Search, ShieldCheck, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/lib/site-config";

const searchCategories = [
  { value: "home-loan", label: "Home Loan", href: "/loans/home-loan" },
  { value: "personal-loan", label: "Personal Loan", href: "/loans/personal-loan" },
  { value: "business-loan", label: "Business Loan", href: "/loans/business-loan" },
  { value: "loan-against-property", label: "Loan Against Property", href: "/loans/loan-against-property" },
  { value: "real-estate", label: "Real Estate", href: "/real-estate" },
];

export function Hero() {
  const router = useRouter();
  const [category, setCategory] = React.useState(searchCategories[0].value);
  const [location, setLocation] = React.useState("Hyderabad");

  function handleSearch() {
    const target = searchCategories.find((c) => c.value === category);
    if (!target) return;
    router.push(target.href === "/real-estate" ? `/real-estate?city=${encodeURIComponent(location)}` : target.href);
  }

  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-10%] size-[520px] rounded-full bg-secondary/25 blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-5%] size-[420px] rounded-full bg-accent/20 blur-[120px]" />
      </div>

      <Container className="relative pt-16 pb-24 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur"
            >
              <ShieldCheck className="size-3.5 text-gold" /> RBI-Compliant &middot; 25+ Bank Partners &middot; 50,000+ Customers
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance"
            >
              Your Trusted Partner for <span className="text-gradient-gold">Loans, Real Estate</span> &amp; Financial Growth
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-5 max-w-xl text-base sm:text-lg text-white/70 text-pretty"
            >
              From home loans to GST filing, property investments to business growth — {siteConfig.name} delivers
              end-to-end financial solutions across Telangana, Andhra Pradesh &amp; Karnataka.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-white font-semibold shadow-premium h-12 px-7">
                <Link href="/eligibility-calculator">
                  Check Loan Eligibility <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-7 border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white"
              >
                <Link href="/real-estate">
                  <Building2 className="size-4" /> Browse Properties
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[12, 45, 33, 51].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/80?img=${i}`}
                    alt=""
                    className="size-9 rounded-full border-2 border-primary object-cover"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-gold" />
                  ))}
                </div>
                <span className="text-xs text-white/60">Rated 4.8/5 by 50,000+ happy customers</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="glass rounded-3xl p-6 sm:p-7 shadow-premium">
              <h3 className="text-white font-heading font-bold text-lg mb-1">Find the Right Financial Solution</h3>
              <p className="text-white/60 text-sm mb-5">Search loans &amp; properties tailored to your needs</p>

              <div className="flex flex-col gap-3">
                <Select value={category} onValueChange={(v) => v && setCategory(v)}>
                  <SelectTrigger className="w-full h-12 bg-white/95 text-foreground border-0">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {searchCategories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={location} onValueChange={(v) => v && setLocation(v)}>
                  <SelectTrigger className="w-full h-12 bg-white/95 text-foreground border-0">
                    <MapPin className="size-4 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Hyderabad", "Vijayawada", "Visakhapatnam", "Bangalore", "Mysuru", "Warangal"].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button onClick={handleSearch} size="lg" className="h-12 rounded-xl bg-gold text-primary hover:bg-gold/90 font-bold">
                  <Search className="size-4" /> Search Now
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                {[
                  { icon: Home, label: "Home Loans", href: "/loans/home-loan" },
                  { icon: Wallet, label: "Personal Loans", href: "/loans/personal-loan" },
                  { icon: Building2, label: "Real Estate", href: "/real-estate" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex flex-col items-center gap-1.5 rounded-xl p-2.5 text-center hover:bg-white/10 transition-colors"
                  >
                    <item.icon className="size-5 text-gold" />
                    <span className="text-[11px] text-white/70 leading-tight">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

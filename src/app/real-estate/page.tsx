import type { Metadata } from "next";
import { Home } from "lucide-react";
import { Container } from "@/components/shared/container";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { PropertyBrowser } from "@/components/real-estate/property-browser";
import { properties } from "@/lib/data/properties";

export const metadata: Metadata = {
  title: "Real Estate - Plots, Villas, Apartments & Commercial Properties",
  description:
    "Browse verified HMDA & DTCP approved plots, villas, apartments, independent houses, farm lands and commercial properties across Telangana, Andhra Pradesh and Karnataka. Bank loan assistance available.",
  alternates: { canonical: "/real-estate" },
};

export default function RealEstatePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Real Estate", href: "/real-estate" }]} />
      <section className="bg-hero-gradient py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-gold">
              <Home className="size-7" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white text-balance">Real Estate</h1>
            <p className="text-white/70 max-w-xl text-pretty">
              Discover verified plots, villas, apartments and commercial properties across Telangana, Andhra Pradesh
              & Karnataka &mdash; every listing is bank-loan ready with our in-house financing support.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <PropertyBrowser properties={properties} />
        </Container>
      </section>
    </>
  );
}

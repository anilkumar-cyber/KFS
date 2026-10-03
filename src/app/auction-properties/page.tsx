import type { Metadata } from "next";
import { FileCheck2, Gavel, Landmark, ScrollText, Wallet } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHeroImage } from "@/components/shared/page-hero-image";
import { SectionHeading } from "@/components/shared/section-heading";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { LeadForm } from "@/components/shared/lead-form";
import { AuctionPropertyCard } from "@/components/real-estate/auction-property-card";
import { getAllAuctionProperties } from "@/lib/queries/properties";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Auction Properties - Bank Auctioned Properties (SARFAESI)",
  description:
    "Browse properties auctioned by leading banks under the SARFAESI Act at attractive reserve prices across Telangana, Andhra Pradesh and Karnataka. Get expert guidance on EMD, bidding and registration.",
  alternates: { canonical: "/auction-properties" },
};

const steps = [
  {
    icon: FileCheck2,
    title: "1. Register & Deposit EMD",
    desc: "Submit your bid application along with the Earnest Money Deposit (EMD) — typically 10% of the reserve price — before the auction deadline.",
  },
  {
    icon: Gavel,
    title: "2. Participate in Bidding",
    desc: "Take part in the e-auction or physical auction conducted by the bank, bidding above the reserve price in the specified increments.",
  },
  {
    icon: Landmark,
    title: "3. Sale Confirmation",
    desc: "The highest bidder is declared successful and the bank issues a sale confirmation letter. The balance amount must be paid within the stipulated timeline.",
  },
  {
    icon: ScrollText,
    title: "4. Registration & Possession",
    desc: "Once full payment is made, the sale certificate is issued and the property is registered in your name, followed by handover of possession.",
  },
];

export default async function AuctionPropertiesPage() {
  const auctionProperties = await getAllAuctionProperties();
  const interestOptions = auctionProperties.map((p) => ({ value: p.title, label: p.title }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Home", href: "/" }, { name: "Auction Properties", href: "/auction-properties" }]}
      />

      <section className="relative overflow-hidden bg-hero-gradient py-16 sm:py-20">
        <PageHeroImage image="realEstate" position="center 40%" />
        <Container className="relative">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-gold">
              <Gavel className="size-7" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white text-balance">
              Bank Auction Properties
            </h1>
            <p className="text-white/70 max-w-xl text-pretty">
              Properties auctioned by leading banks under the SARFAESI Act at attractive reserve prices. Our team
              guides you through EMD deposit, bidding, sale confirmation and registration — end to end.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Live Auctions"
            title="Properties Up for Bank Auction"
            description="Verified listings sourced directly from bank SARFAESI auction notices. Reserve prices and EMD amounts are as published by the respective banks."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {auctionProperties.map((property) => (
              <AuctionPropertyCard key={property.id} property={property} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-muted/40">
        <Container>
          <SectionHeading eyebrow="Process" title="How Bank Auctions Work" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step) => (
              <div key={step.title} className="rounded-2xl bg-card border border-border/70 p-6 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-4">
                  <step.icon className="size-6" />
                </div>
                <h3 className="font-heading font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground max-w-xl mx-auto">
            <Wallet className="size-3.5 shrink-0" /> EMD amounts are refundable to unsuccessful bidders as per bank
            policy. We recommend a legal and title due-diligence check before bidding on any auction property.
          </p>
        </Container>
      </section>

      <section id="auction-inquiry" className="py-14 sm:py-20 scroll-mt-20">
        <Container>
          <div className="max-w-2xl mx-auto rounded-3xl border border-border/80 shadow-premium p-6 sm:p-8">
            <LeadForm
              interestOptions={interestOptions}
              source="auction-property-inquiry"
              title="Auction Property Inquiry"
              description="Tell us which auction property interests you and our team will assist you with the bidding process, EMD and financing."
            />
          </div>
        </Container>
      </section>
    </>
  );
}

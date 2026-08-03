import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  Landmark,
  Calendar,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { EligibilityCalculator } from "@/components/calculators/eligibility-calculator";
import { LeadForm } from "@/components/shared/lead-form";
import { PropertyGallery } from "@/components/real-estate/property-gallery";
import { FavoriteButton } from "@/components/real-estate/favorite-button";
import { ShareButton } from "@/components/real-estate/share-button";
import { properties, getPropertyBySlug } from "@/lib/data/properties";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return { title: "Property Not Found" };
  }

  return {
    title: `${property.title} - ${property.priceLabel}`,
    description: property.description,
    alternates: { canonical: `/real-estate/${property.slug}` },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const postedDate = new Date(property.postedOn).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Real Estate", href: "/real-estate" },
          { name: property.title, href: `/real-estate/${property.slug}` },
        ]}
      />

      <section className="py-6 border-b border-border/70">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/real-estate" />}>Real Estate</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">{property.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge className="bg-primary text-white">{property.typeLabel}</Badge>
                    {property.bankLoanAvailable && (
                      <Badge className="bg-accent text-white gap-1">
                        <Landmark className="size-3" /> Bank Loan Available
                      </Badge>
                    )}
                  </div>
                  <h1 className="font-heading text-2xl sm:text-3xl font-bold text-balance">{property.title}</h1>
                  <p className="flex items-center gap-1.5 text-muted-foreground mt-2">
                    <MapPin className="size-4" /> {property.location}, {property.city}, {property.state}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FavoriteButton propertyId={property.id} size="icon" className="static rounded-lg border border-border" />
                  <ShareButton title={property.title} />
                </div>
              </div>

              <div className="mt-6">
                <PropertyGallery images={property.images} title={property.title} />
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-xl border border-border/70 p-4 text-center">
                  <Ruler className="size-5 mx-auto text-secondary mb-1.5" />
                  <p className="text-sm font-semibold">{property.areaSqft.toLocaleString("en-IN")} sqft</p>
                  <p className="text-xs text-muted-foreground">Area</p>
                </div>
                {property.bedrooms && (
                  <div className="rounded-xl border border-border/70 p-4 text-center">
                    <BedDouble className="size-5 mx-auto text-secondary mb-1.5" />
                    <p className="text-sm font-semibold">{property.bedrooms}</p>
                    <p className="text-xs text-muted-foreground">Bedrooms</p>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="rounded-xl border border-border/70 p-4 text-center">
                    <Bath className="size-5 mx-auto text-secondary mb-1.5" />
                    <p className="text-sm font-semibold">{property.bathrooms}</p>
                    <p className="text-xs text-muted-foreground">Bathrooms</p>
                  </div>
                )}
                <div className="rounded-xl border border-border/70 p-4 text-center">
                  <Calendar className="size-5 mx-auto text-secondary mb-1.5" />
                  <p className="text-sm font-semibold">{postedDate}</p>
                  <p className="text-xs text-muted-foreground">Posted On</p>
                </div>
                {property.reraId && (
                  <div className="rounded-xl border border-border/70 p-4 text-center">
                    <ShieldCheck className="size-5 mx-auto text-secondary mb-1.5" />
                    <p className="text-sm font-semibold break-all">{property.reraId}</p>
                    <p className="text-xs text-muted-foreground">RERA ID</p>
                  </div>
                )}
              </div>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-bold mb-3">About This Property</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-4 text-accent shrink-0" /> {amenity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-bold mb-4">Nearby Places</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {property.nearbyPlaces.map((place) => (
                    <div
                      key={place.name}
                      className="flex items-center justify-between rounded-xl border border-border/70 px-4 py-3 text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="size-4 text-secondary shrink-0" /> {place.name}
                      </span>
                      <span className="text-muted-foreground font-medium">{place.distance}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-bold mb-4">Location</h2>
                <iframe
                  title={`Map showing location of ${property.title}`}
                  src={`https://www.google.com/maps?q=${property.lat},${property.lng}&output=embed`}
                  className="w-full h-72 sm:h-96 rounded-2xl border border-border/70"
                  loading="lazy"
                />
              </div>

              <div className="mt-10">
                <SectionHeading
                  align="left"
                  eyebrow="Financing"
                  title="Check Loan Eligibility for This Property"
                  description="Estimate how much home or plot loan you could be eligible for towards this property."
                />
                <div className="mt-6">
                  <EligibilityCalculator defaultLoanType={property.bedrooms ? "home" : "loan-against-property"} />
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-border/80 shadow-premium p-6 sm:p-7">
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="font-heading text-3xl font-bold text-secondary">{property.priceLabel}</p>
                <div className="my-5 h-px bg-border" />
                <LeadForm
                  interestOptions={[{ value: property.typeLabel, label: property.typeLabel }]}
                  defaultInterest={property.typeLabel}
                  source={`property-inquiry-${property.slug}`}
                  title="Interested in this property?"
                  description="Share your details and our real estate advisor will contact you shortly."
                  compact
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

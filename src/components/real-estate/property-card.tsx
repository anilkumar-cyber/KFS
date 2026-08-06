"use client";

import Link from "next/link";
import { BedDouble, Landmark, MapPin, Ruler, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/real-estate/favorite-button";
import type { Property } from "@/lib/queries/properties";
import { cn } from "@/lib/utils";

export function PropertyCard({
  property,
  compareSelected,
  onToggleCompare,
  compareDisabled,
}: {
  property: Property;
  compareSelected?: boolean;
  onToggleCompare?: (id: string) => void;
  compareDisabled?: boolean;
}) {
  return (
    <Card className="group relative h-full overflow-hidden rounded-2xl border-border/70 p-0 transition-all duration-300 hover:shadow-premium">
      <FavoriteButton propertyId={property.id} className="absolute top-3 right-3 z-10" />
      <Link href={`/real-estate/${property.slug}`} className="block">
        <div className="relative h-44 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge className="absolute top-3 left-3 bg-primary text-white">{property.typeLabel}</Badge>
          {property.bankLoanAvailable && (
            <Badge className="absolute top-11 left-3 bg-accent text-white gap-1">
              <Landmark className="size-3" /> Loan Available
            </Badge>
          )}
        </div>
        <div className="p-4">
          <p className="font-heading font-bold text-sm leading-snug line-clamp-1">{property.title}</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <MapPin className="size-3" /> {property.location}, {property.city}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
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
      </Link>

      {onToggleCompare && (
        <button
          type="button"
          onClick={() => !compareDisabled && onToggleCompare(property.id)}
          disabled={compareDisabled}
          className={cn(
            "absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors",
            compareSelected
              ? "border-secondary bg-secondary text-white"
              : "border-border bg-white/90 text-foreground hover:bg-white",
            compareDisabled && !compareSelected && "cursor-not-allowed opacity-50"
          )}
        >
          <span
            className={cn(
              "flex size-3.5 items-center justify-center rounded-sm border",
              compareSelected ? "border-white bg-white/20" : "border-muted-foreground"
            )}
          >
            {compareSelected && <Check className="size-3" />}
          </span>
          Compare
        </button>
      )}
    </Card>
  );
}

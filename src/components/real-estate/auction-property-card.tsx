import { Banknote, Calendar, Gavel, MapPin, Ruler } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AuctionProperty } from "@/lib/queries/properties";

export function AuctionPropertyCard({ property }: { property: AuctionProperty }) {
  const auctionDate = property.auctionDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="group h-full overflow-hidden rounded-2xl border-border/70 p-0 transition-all duration-300 hover:shadow-premium">
      <div className="relative h-44 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-white gap-1">
          <Gavel className="size-3" /> {property.bank}
        </Badge>
        <Badge className="absolute top-3 right-3 bg-gold text-primary">{property.propertyType}</Badge>
      </div>
      <div className="p-4 sm:p-5">
        <p className="font-heading font-bold text-base leading-snug">{property.title}</p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1.5">
          <MapPin className="size-3.5" /> {property.location}, {property.city}, {property.state}
        </p>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">{property.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg bg-muted/60 p-2.5">
            <p className="text-muted-foreground">Reserve Price</p>
            <p className="font-heading font-bold text-secondary text-sm">{property.reservePriceLabel}</p>
          </div>
          <div className="rounded-lg bg-muted/60 p-2.5">
            <p className="text-muted-foreground flex items-center gap-1">
              <Banknote className="size-3" /> EMD Amount
            </p>
            <p className="font-heading font-bold text-sm">{property.emdAmount}</p>
          </div>
          <div className="rounded-lg bg-muted/60 p-2.5">
            <p className="text-muted-foreground flex items-center gap-1">
              <Calendar className="size-3" /> Auction Date
            </p>
            <p className="font-heading font-bold text-sm">{auctionDate}</p>
          </div>
          <div className="rounded-lg bg-muted/60 p-2.5">
            <p className="text-muted-foreground flex items-center gap-1">
              <Ruler className="size-3" /> Area
            </p>
            <p className="font-heading font-bold text-sm">{property.areaSqft.toLocaleString("en-IN")} sqft</p>
          </div>
        </div>

        <Button asChild className="mt-4 w-full rounded-full bg-accent hover:bg-accent/90 text-white font-semibold">
          <a href="#auction-inquiry">Enquire About This Property</a>
        </Button>
      </div>
    </Card>
  );
}

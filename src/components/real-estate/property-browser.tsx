"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Landmark, SearchX, X } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PropertyCard } from "@/components/real-estate/property-card";
import { propertyTypeOptions, type Property, type PropertyType } from "@/lib/queries/properties";
import { formatINR } from "@/lib/calculators";

const MAX_PRICE = 30000000; // ₹3 Crore
const MAX_COMPARE = 3;

const bedroomOptions = [
  { value: "any", label: "Any" },
  { value: "1", label: "1 BHK" },
  { value: "2", label: "2 BHK" },
  { value: "3", label: "3 BHK" },
  { value: "4", label: "4+ BHK" },
];

function PropertyBrowserInner({ properties }: { properties: Property[] }) {
  const searchParams = useSearchParams();

  const cities = React.useMemo(
    () => Array.from(new Set(properties.map((p) => p.city))).sort(),
    [properties]
  );

  const [type, setType] = React.useState<PropertyType | "all">(
    (searchParams.get("type") as PropertyType | "all") || "all"
  );
  const [city, setCity] = React.useState<string>(searchParams.get("city") || "all");
  const [bedrooms, setBedrooms] = React.useState<string>("any");
  const [bankLoanOnly, setBankLoanOnly] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState<number[]>([0, MAX_PRICE]);

  const [compareIds, setCompareIds] = React.useState<string[]>([]);
  const [showCompare, setShowCompare] = React.useState(false);
  const compareRef = React.useRef<HTMLDivElement>(null);

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }

  function handleShowCompare() {
    setShowCompare(true);
    requestAnimationFrame(() => {
      compareRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const filtered = properties.filter((p) => {
    if (type !== "all" && p.type !== type) return false;
    if (city !== "all" && p.city !== city) return false;
    if (bankLoanOnly && !p.bankLoanAvailable) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (bedrooms !== "any") {
      if (bedrooms === "4") {
        if (!p.bedrooms || p.bedrooms < 4) return false;
      } else if (p.bedrooms !== Number(bedrooms)) {
        return false;
      }
    }
    return true;
  });

  const compareProperties = properties.filter((p) => compareIds.includes(p.id));

  function resetFilters() {
    setType("all");
    setCity("all");
    setBedrooms("any");
    setBankLoanOnly(false);
    setPriceRange([0, MAX_PRICE]);
  }

  return (
    <div className="relative">
      {/* Filter bar */}
      <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Property Type</Label>
            <Select value={type} onValueChange={(v) => v && setType(v as PropertyType | "all")}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {propertyTypeOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">City</Label>
            <Select value={city} onValueChange={(v) => v && setCity(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Bedrooms</Label>
            <Select value={bedrooms} onValueChange={(v) => v && setBedrooms(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bedroomOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5 justify-center">
            <Label className="text-xs text-muted-foreground">Bank Loan Available</Label>
            <div className="flex items-center gap-2 h-8">
              <Switch checked={bankLoanOnly} onCheckedChange={(v) => setBankLoanOnly(Boolean(v))} />
              <span className="text-sm">{bankLoanOnly ? "Yes only" : "All properties"}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Price Range</Label>
            <span className="text-xs font-semibold text-secondary">
              {formatINR(priceRange[0])} &ndash; {formatINR(priceRange[1])}
              {priceRange[1] === MAX_PRICE ? "+" : ""}
            </span>
          </div>
          <Slider
            min={0}
            max={MAX_PRICE}
            step={100000}
            value={priceRange}
            onValueChange={(v) => Array.isArray(v) && setPriceRange(v)}
            className="max-w-full"
          />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> propert
            {filtered.length === 1 ? "y" : "ies"} found
          </p>
          <Button type="button" variant="ghost" size="sm" onClick={resetFilters} className="gap-1.5">
            <X className="size-3.5" /> Reset Filters
          </Button>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
          <SearchX className="size-10 text-muted-foreground" />
          <p className="font-heading font-bold text-lg">No properties match your filters</p>
          <p className="text-sm text-muted-foreground max-w-sm">
            Try adjusting your filters or resetting them to see more properties.
          </p>
          <Button onClick={resetFilters} className="mt-2 rounded-full bg-secondary hover:bg-secondary/90 text-white">
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 6) * 0.06 }}
            >
              <PropertyCard
                property={property}
                compareSelected={compareIds.includes(property.id)}
                onToggleCompare={toggleCompare}
                compareDisabled={compareIds.length >= MAX_COMPARE && !compareIds.includes(property.id)}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating compare bar */}
      <AnimatePresence>
        {compareIds.length > 0 && !showCompare && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
          >
            <div className="flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-white shadow-premium">
              <span className="text-sm font-semibold">
                {compareIds.length} propert{compareIds.length === 1 ? "y" : "ies"} selected
              </span>
              <Button
                type="button"
                size="sm"
                onClick={handleShowCompare}
                className="rounded-full bg-accent hover:bg-accent/90 text-white"
              >
                Compare Selected ({compareIds.length})
              </Button>
              <button
                type="button"
                onClick={() => setCompareIds([])}
                aria-label="Clear comparison"
                className="text-white/70 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline comparison table */}
      {showCompare && compareProperties.length > 0 && (
        <div ref={compareRef} className="mt-14 rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-premium">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading text-xl font-bold flex items-center gap-2">
              <Home className="size-5 text-secondary" /> Compare Properties
            </h3>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowCompare(false)} className="gap-1.5">
              <X className="size-3.5" /> Close
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                {compareProperties.map((p) => (
                  <TableHead key={p.id}>
                    <Link href={`/real-estate/${p.slug}`} className="flex flex-col gap-2 hover:text-secondary">
                      <img src={p.images[0]} alt={p.title} className="h-20 w-28 rounded-lg object-cover" />
                      <span className="whitespace-normal font-semibold leading-snug">{p.title}</span>
                    </Link>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-muted-foreground">Price</TableCell>
                {compareProperties.map((p) => (
                  <TableCell key={p.id} className="font-bold text-secondary">
                    {p.priceLabel}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-muted-foreground">Area</TableCell>
                {compareProperties.map((p) => (
                  <TableCell key={p.id}>{p.areaSqft.toLocaleString("en-IN")} sqft</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-muted-foreground">Type</TableCell>
                {compareProperties.map((p) => (
                  <TableCell key={p.id}>{p.typeLabel}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-muted-foreground">Bedrooms</TableCell>
                {compareProperties.map((p) => (
                  <TableCell key={p.id}>{p.bedrooms ? `${p.bedrooms} BHK` : "N/A"}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-muted-foreground">Location</TableCell>
                {compareProperties.map((p) => (
                  <TableCell key={p.id}>
                    {p.location}, {p.city}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-muted-foreground">Bank Loan</TableCell>
                {compareProperties.map((p) => (
                  <TableCell key={p.id}>
                    {p.bankLoanAvailable ? (
                      <span className="inline-flex items-center gap-1 text-accent font-semibold">
                        <Landmark className="size-3.5" /> Available
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Not Available</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export function PropertyBrowser({ properties }: { properties: Property[] }) {
  return (
    <React.Suspense fallback={<div className="h-40" />}>
      <PropertyBrowserInner properties={properties} />
    </React.Suspense>
  );
}

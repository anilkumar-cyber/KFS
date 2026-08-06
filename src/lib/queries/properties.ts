import { prisma } from "@/lib/db";
import type { Property as PropertyRow, AuctionProperty as AuctionPropertyRow } from "@prisma/client";

export type PropertyType =
  | "farm-land"
  | "hmda-plots"
  | "dtcp-plots"
  | "independent-house"
  | "apartment"
  | "villa"
  | "commercial"
  | "open-plot";

export type Property = {
  id: string;
  slug: string;
  title: string;
  type: PropertyType;
  typeLabel: string;
  price: number;
  priceLabel: string;
  location: string;
  city: string;
  state: string;
  areaSqft: number;
  bedrooms: number | null;
  bathrooms: number | null;
  bankLoanAvailable: boolean;
  featured: boolean;
  images: string[];
  description: string;
  amenities: string[];
  nearbyPlaces: { name: string; distance: string }[];
  lat: number;
  lng: number;
  postedOn: Date;
  reraId?: string | null;
};

function mapProperty(row: PropertyRow): Property {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    type: row.type as PropertyType,
    typeLabel: row.typeLabel,
    price: row.price,
    priceLabel: row.priceLabel,
    location: row.location,
    city: row.city,
    state: row.state,
    areaSqft: row.areaSqft,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    bankLoanAvailable: row.bankLoanAvailable,
    featured: row.featured,
    images: row.images,
    description: row.description,
    amenities: row.amenities,
    nearbyPlaces: row.nearbyPlaces as { name: string; distance: string }[],
    lat: row.lat,
    lng: row.lng,
    postedOn: row.postedOn,
    reraId: row.reraId,
  };
}

export async function getAllProperties(): Promise<Property[]> {
  const rows = await prisma.property.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { postedOn: "desc" },
  });
  return rows.map(mapProperty);
}

export async function getFeaturedProperties(limit = 4): Promise<Property[]> {
  return (await getAllProperties()).filter((p) => p.featured).slice(0, limit);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const row = await prisma.property.findFirst({ where: { slug, status: "PUBLISHED" } });
  return row ? mapProperty(row) : null;
}

export const propertyTypeOptions: { value: PropertyType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "farm-land", label: "Farm Lands" },
  { value: "hmda-plots", label: "HMDA Approved Plots" },
  { value: "dtcp-plots", label: "DTCP Approved Plots" },
  { value: "independent-house", label: "Independent Houses" },
  { value: "apartment", label: "Apartments" },
  { value: "villa", label: "Villas" },
  { value: "commercial", label: "Commercial Properties" },
  { value: "open-plot", label: "Open Plots" },
];

export type AuctionProperty = {
  id: string;
  title: string;
  bank: string;
  location: string;
  city: string;
  state: string;
  reservePrice: number;
  reservePriceLabel: string;
  emdAmount: string;
  auctionDate: Date;
  propertyType: string;
  areaSqft: number;
  image: string;
  description: string;
};

function mapAuction(row: AuctionPropertyRow): AuctionProperty {
  return {
    id: row.id,
    title: row.title,
    bank: row.bank,
    location: row.location,
    city: row.city,
    state: row.state,
    reservePrice: row.reservePrice,
    reservePriceLabel: row.reservePriceLabel,
    emdAmount: row.emdAmount,
    auctionDate: row.auctionDate,
    propertyType: row.propertyType,
    areaSqft: row.areaSqft,
    image: row.image,
    description: row.description,
  };
}

export async function getAllAuctionProperties(): Promise<AuctionProperty[]> {
  const rows = await prisma.auctionProperty.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { auctionDate: "asc" },
  });
  return rows.map(mapAuction);
}

"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import type { ContentStatus, Prisma } from "@prisma/client";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

function isUniqueSlugError(err: unknown): boolean {
  return typeof err === "object" && err !== null && "code" in err && (err as { code?: string }).code === "P2002";
}

export type NearbyPlaceInput = { name: string; distance: string };

export type PropertyInput = {
  slug: string;
  title: string;
  type: string;
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
  nearbyPlaces: NearbyPlaceInput[];
  lat: number;
  lng: number;
  reraId: string | null;
  status: ContentStatus;
};

export async function createProperty(input: PropertyInput) {
  await requireSession();
  try {
    const property = await prisma.property.create({
      data: {
        ...input,
        nearbyPlaces: input.nearbyPlaces as unknown as Prisma.InputJsonValue,
      },
    });
    revalidatePath("/admin/properties");
    revalidatePath("/admin");
    return { id: property.id };
  } catch (err) {
    if (isUniqueSlugError(err)) {
      throw new Error("A property with this slug already exists. Please choose a different slug.");
    }
    throw err;
  }
}

export async function updateProperty(id: string, input: PropertyInput) {
  await requireSession();
  try {
    await prisma.property.update({
      where: { id },
      data: {
        ...input,
        nearbyPlaces: input.nearbyPlaces as unknown as Prisma.InputJsonValue,
      },
    });
    revalidatePath("/admin/properties");
    revalidatePath(`/admin/properties/${id}`);
  } catch (err) {
    if (isUniqueSlugError(err)) {
      throw new Error("A property with this slug already exists. Please choose a different slug.");
    }
    throw err;
  }
}

export async function updatePropertyStatus(id: string, status: ContentStatus) {
  await requireSession();
  await prisma.property.update({ where: { id }, data: { status } });
  revalidatePath("/admin/properties");
  revalidatePath(`/admin/properties/${id}`);
}

export async function deleteProperty(id: string) {
  const session = await requireSession();
  if (session.role !== "ADMIN") throw new Error("Only admins can delete properties");
  await prisma.property.delete({ where: { id } });
  revalidatePath("/admin/properties");
  revalidatePath("/admin");
}

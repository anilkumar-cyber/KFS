"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import type { ContentStatus } from "@prisma/client";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

export type AuctionPropertyInput = {
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
  status: ContentStatus;
};

export async function createAuctionProperty(input: AuctionPropertyInput) {
  await requireSession();
  const property = await prisma.auctionProperty.create({ data: input });
  revalidatePath("/admin/auction-properties");
  revalidatePath("/admin");
  return { id: property.id };
}

export async function updateAuctionProperty(id: string, input: AuctionPropertyInput) {
  await requireSession();
  await prisma.auctionProperty.update({ where: { id }, data: input });
  revalidatePath("/admin/auction-properties");
  revalidatePath(`/admin/auction-properties/${id}`);
}

export async function updateAuctionPropertyStatus(id: string, status: ContentStatus) {
  await requireSession();
  await prisma.auctionProperty.update({ where: { id }, data: { status } });
  revalidatePath("/admin/auction-properties");
  revalidatePath(`/admin/auction-properties/${id}`);
}

export async function deleteAuctionProperty(id: string) {
  const session = await requireSession();
  if (session.role !== "ADMIN") throw new Error("Only admins can delete auction properties");
  await prisma.auctionProperty.delete({ where: { id } });
  revalidatePath("/admin/auction-properties");
  revalidatePath("/admin");
}

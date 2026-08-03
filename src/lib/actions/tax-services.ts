"use server";

import { revalidatePath } from "next/cache";
import { Prisma, type ContentStatus } from "@prisma/client";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

export type TaxServiceInput = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  price: string;
  timeline: string;
  benefits: string[];
  process: { step: string; description: string }[];
  documents: string[];
  faqs: { question: string; answer: string }[];
  status: ContentStatus;
};

function friendlySlugError(err: unknown): never {
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    throw new Error("That slug is already in use — please choose a different one.");
  }
  throw err;
}

export async function createTaxService(data: TaxServiceInput) {
  await requireSession();
  try {
    const created = await prisma.taxService.create({ data: { ...data, process: data.process, faqs: data.faqs } });
    revalidatePath("/admin/tax-services");
    revalidatePath("/admin");
    return created;
  } catch (err) {
    friendlySlugError(err);
  }
}

export async function updateTaxService(id: string, data: TaxServiceInput) {
  await requireSession();
  try {
    const updated = await prisma.taxService.update({
      where: { id },
      data: { ...data, process: data.process, faqs: data.faqs },
    });
    revalidatePath("/admin/tax-services");
    revalidatePath(`/admin/tax-services/${id}`);
    return updated;
  } catch (err) {
    friendlySlugError(err);
  }
}

export async function deleteTaxService(id: string) {
  await requireSession();
  await prisma.taxService.delete({ where: { id } });
  revalidatePath("/admin/tax-services");
  revalidatePath("/admin");
}

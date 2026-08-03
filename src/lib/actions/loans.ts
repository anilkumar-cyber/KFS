"use server";

import { revalidatePath } from "next/cache";
import { Prisma, type ContentStatus, type LoanCategory } from "@prisma/client";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

export type LoanProductInput = {
  slug: string;
  name: string;
  shortName: string;
  category: LoanCategory;
  tagline: string;
  description: string;
  icon: string;
  interestRate: string;
  maxAmount: string;
  maxTenure: string;
  processingTime: string;
  processingFee: string;
  benefits: string[];
  eligibility: string[];
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

export async function createLoanProduct(data: LoanProductInput) {
  await requireSession();
  try {
    const created = await prisma.loanProduct.create({ data: { ...data, faqs: data.faqs } });
    revalidatePath("/admin/loans");
    revalidatePath("/admin");
    return created;
  } catch (err) {
    friendlySlugError(err);
  }
}

export async function updateLoanProduct(id: string, data: LoanProductInput) {
  await requireSession();
  try {
    const updated = await prisma.loanProduct.update({ where: { id }, data: { ...data, faqs: data.faqs } });
    revalidatePath("/admin/loans");
    revalidatePath(`/admin/loans/${id}`);
    return updated;
  } catch (err) {
    friendlySlugError(err);
  }
}

export async function deleteLoanProduct(id: string) {
  await requireSession();
  await prisma.loanProduct.delete({ where: { id } });
  revalidatePath("/admin/loans");
  revalidatePath("/admin");
}

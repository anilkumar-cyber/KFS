"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

export type BankInput = {
  name: string;
  shortName: string;
  type: string;
  order: number;
};

export async function createBank(input: BankInput) {
  await requireSession();
  const bank = await prisma.partnerBank.create({ data: input });
  revalidatePath("/admin/banks");
  return { id: bank.id };
}

export async function updateBank(id: string, input: BankInput) {
  await requireSession();
  await prisma.partnerBank.update({ where: { id }, data: input });
  revalidatePath("/admin/banks");
  revalidatePath(`/admin/banks/${id}`);
}

export async function deleteBank(id: string) {
  const session = await requireSession();
  if (session.role !== "ADMIN") throw new Error("Only admins can delete partner banks");
  await prisma.partnerBank.delete({ where: { id } });
  revalidatePath("/admin/banks");
}

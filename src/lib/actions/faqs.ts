"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

export type FaqInput = {
  question: string;
  answer: string;
  category: string;
  order: number;
};

export async function createFaq(input: FaqInput) {
  await requireSession();
  const faq = await prisma.faq.create({ data: input });
  revalidatePath("/admin/faqs");
  return { id: faq.id };
}

export async function updateFaq(id: string, input: FaqInput) {
  await requireSession();
  await prisma.faq.update({ where: { id }, data: input });
  revalidatePath("/admin/faqs");
  revalidatePath(`/admin/faqs/${id}`);
}

export async function deleteFaq(id: string) {
  const session = await requireSession();
  if (session.role !== "ADMIN") throw new Error("Only admins can delete FAQs");
  await prisma.faq.delete({ where: { id } });
  revalidatePath("/admin/faqs");
}

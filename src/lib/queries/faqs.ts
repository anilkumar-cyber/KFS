import { prisma } from "@/lib/db";

export type FaqItem = { question: string; answer: string; category: string };

export async function getAllFaqs(): Promise<FaqItem[]> {
  const rows = await prisma.faq.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });
  return rows.map((r) => ({
    question: r.question,
    answer: r.answer,
    category: r.category,
  }));
}

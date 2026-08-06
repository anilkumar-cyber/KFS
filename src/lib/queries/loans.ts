import { prisma } from "@/lib/db";
import type { LoanProduct as LoanProductRow } from "@prisma/client";

export type LoanCategory = "secured" | "unsecured";

export type LoanProduct = {
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
};

function mapLoan(row: LoanProductRow): LoanProduct {
  return {
    slug: row.slug,
    name: row.name,
    shortName: row.shortName,
    category: row.category === "SECURED" ? "secured" : "unsecured",
    tagline: row.tagline,
    description: row.description,
    icon: row.icon,
    interestRate: row.interestRate,
    maxAmount: row.maxAmount,
    maxTenure: row.maxTenure,
    processingTime: row.processingTime,
    processingFee: row.processingFee,
    benefits: row.benefits,
    eligibility: row.eligibility,
    documents: row.documents,
    faqs: row.faqs as { question: string; answer: string }[],
  };
}

export async function getAllLoans(): Promise<LoanProduct[]> {
  const rows = await prisma.loanProduct.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(mapLoan);
}

export async function getSecuredLoans(): Promise<LoanProduct[]> {
  return (await getAllLoans()).filter((l) => l.category === "secured");
}

export async function getUnsecuredLoans(): Promise<LoanProduct[]> {
  return (await getAllLoans()).filter((l) => l.category === "unsecured");
}

export async function getLoanBySlug(slug: string): Promise<LoanProduct | null> {
  const row = await prisma.loanProduct.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
  return row ? mapLoan(row) : null;
}

export async function getRelatedLoans(
  slug: string,
  category: LoanCategory,
  count = 3
): Promise<LoanProduct[]> {
  const all = await getAllLoans();
  return all.filter((l) => l.slug !== slug && l.category === category).slice(0, count);
}

import { prisma } from "@/lib/db";
import type { TaxService as TaxServiceRow } from "@prisma/client";

export type TaxService = {
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
};

function mapTaxService(row: TaxServiceRow): TaxService {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    icon: row.icon,
    price: row.price,
    timeline: row.timeline,
    benefits: row.benefits,
    process: row.process as { step: string; description: string }[],
    documents: row.documents,
    faqs: row.faqs as { question: string; answer: string }[],
  };
}

export async function getAllTaxServices(): Promise<TaxService[]> {
  const rows = await prisma.taxService.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(mapTaxService);
}

export async function getTaxServiceBySlug(slug: string): Promise<TaxService | null> {
  const row = await prisma.taxService.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
  return row ? mapTaxService(row) : null;
}

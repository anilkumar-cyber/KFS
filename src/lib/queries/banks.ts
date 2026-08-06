import { prisma } from "@/lib/db";
import type { PartnerBank as PartnerBankRow } from "@prisma/client";

export type PartnerBank = {
  name: string;
  shortName: string;
  type: string;
};

function mapBank(row: PartnerBankRow): PartnerBank {
  return {
    name: row.name,
    shortName: row.shortName,
    type: row.type,
  };
}

export async function getAllBanks(): Promise<PartnerBank[]> {
  const rows = await prisma.partnerBank.findMany({
    orderBy: { order: "asc" },
  });
  return rows.map(mapBank);
}

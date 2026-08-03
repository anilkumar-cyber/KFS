import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteEntityButton } from "@/components/admin/delete-entity-button";
import { deleteBank } from "@/lib/actions/banks";

export const metadata: Metadata = { title: "Partner Banks", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminBanksPage() {
  const banks = await prisma.partnerBank.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{banks.length} partner banks</p>
        <Button asChild>
          <Link href="/admin/banks/new">
            <Plus className="size-3.5" /> New Bank
          </Link>
        </Button>
      </div>

      <Card className="rounded-2xl overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground uppercase tracking-wide">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">Bank</th>
                  <th className="text-left font-semibold px-5 py-3">Short Name</th>
                  <th className="text-left font-semibold px-5 py-3">Type</th>
                  <th className="text-left font-semibold px-5 py-3">Order</th>
                  <th className="text-left font-semibold px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {banks.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                      No partner banks yet.
                    </td>
                  </tr>
                )}
                {banks.map((bank) => (
                  <tr key={bank.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3">
                      <Link href={`/admin/banks/${bank.id}`} className="font-semibold hover:text-secondary hover:underline">
                        {bank.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{bank.shortName}</td>
                    <td className="px-5 py-3 text-xs">
                      <span className="rounded-full bg-muted px-2.5 py-1 font-medium">{bank.type}</span>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{bank.order}</td>
                    <td className="px-5 py-3">
                      <DeleteEntityButton id={bank.id} label={bank.name} entityName="partner bank" action={deleteBank} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

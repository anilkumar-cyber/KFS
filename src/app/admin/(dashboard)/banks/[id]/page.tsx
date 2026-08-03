import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BankForm } from "@/components/admin/bank-form";
import { DeleteEntityButton } from "@/components/admin/delete-entity-button";
import { deleteBank } from "@/lib/actions/banks";

export const metadata: Metadata = { title: "Edit Partner Bank", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditBankPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bank = await prisma.partnerBank.findUnique({ where: { id } });
  if (!bank) notFound();

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/banks" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to partner banks
        </Link>
        <DeleteEntityButton
          id={bank.id}
          label={bank.name}
          entityName="partner bank"
          action={deleteBank}
          redirectTo="/admin/banks"
        />
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">{bank.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <BankForm bank={bank} />
        </CardContent>
      </Card>
    </div>
  );
}

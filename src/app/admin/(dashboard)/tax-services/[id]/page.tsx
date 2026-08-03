import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/db";
import { TaxServiceForm } from "@/components/admin/tax-service-form";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { deleteTaxService } from "@/lib/actions/tax-services";

export const metadata: Metadata = { title: "Edit Tax Service", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditTaxServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const taxService = await prisma.taxService.findUnique({ where: { id } });
  if (!taxService) notFound();

  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/tax-services" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to tax services
        </Link>
        <DeleteContentButton
          id={taxService.id}
          name={taxService.name}
          entityLabel="tax service"
          deleteAction={deleteTaxService}
          redirectTo="/admin/tax-services"
        />
      </div>
      <TaxServiceForm taxService={taxService} />
    </div>
  );
}

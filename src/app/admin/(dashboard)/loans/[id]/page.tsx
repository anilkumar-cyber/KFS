import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/db";
import { LoanProductForm } from "@/components/admin/loan-product-form";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { deleteLoanProduct } from "@/lib/actions/loans";

export const metadata: Metadata = { title: "Edit Loan Product", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditLoanProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const loanProduct = await prisma.loanProduct.findUnique({ where: { id } });
  if (!loanProduct) notFound();

  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/loans" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to loan products
        </Link>
        <DeleteContentButton
          id={loanProduct.id}
          name={loanProduct.name}
          entityLabel="loan product"
          deleteAction={deleteLoanProduct}
          redirectTo="/admin/loans"
        />
      </div>
      <LoanProductForm loanProduct={loanProduct} />
    </div>
  );
}

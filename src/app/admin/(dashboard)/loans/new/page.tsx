import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LoanProductForm } from "@/components/admin/loan-product-form";

export const metadata: Metadata = { title: "New Loan Product", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function NewLoanProductPage() {
  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <Link href="/admin/loans" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground w-fit">
        <ArrowLeft className="size-4" /> Back to loan products
      </Link>
      <LoanProductForm />
    </div>
  );
}

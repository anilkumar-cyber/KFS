import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { TaxServiceForm } from "@/components/admin/tax-service-form";

export const metadata: Metadata = { title: "New Tax Service", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function NewTaxServicePage() {
  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <Link href="/admin/tax-services" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground w-fit">
        <ArrowLeft className="size-4" /> Back to tax services
      </Link>
      <TaxServiceForm />
    </div>
  );
}

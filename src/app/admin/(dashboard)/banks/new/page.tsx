import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BankForm } from "@/components/admin/bank-form";

export const metadata: Metadata = { title: "New Partner Bank", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function NewBankPage() {
  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <Link href="/admin/banks" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to partner banks
      </Link>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">New Partner Bank</CardTitle>
        </CardHeader>
        <CardContent>
          <BankForm />
        </CardContent>
      </Card>
    </div>
  );
}

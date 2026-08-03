import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaqForm } from "@/components/admin/faq-form";

export const metadata: Metadata = { title: "New FAQ", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function NewFaqPage() {
  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <Link href="/admin/faqs" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to FAQs
      </Link>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">New FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <FaqForm />
        </CardContent>
      </Card>
    </div>
  );
}

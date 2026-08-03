import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyForm } from "@/components/admin/property-form";

export const metadata: Metadata = { title: "New Property", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function NewPropertyPage() {
  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <Link href="/admin/properties" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to properties
      </Link>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">New Property</CardTitle>
        </CardHeader>
        <CardContent>
          <PropertyForm />
        </CardContent>
      </Card>
    </div>
  );
}

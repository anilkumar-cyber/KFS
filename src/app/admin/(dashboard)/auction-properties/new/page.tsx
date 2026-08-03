import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuctionPropertyForm } from "@/components/admin/auction-property-form";

export const metadata: Metadata = { title: "New Auction Property", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function NewAuctionPropertyPage() {
  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <Link
        href="/admin/auction-properties"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to auction properties
      </Link>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">New Auction Property</CardTitle>
        </CardHeader>
        <CardContent>
          <AuctionPropertyForm />
        </CardContent>
      </Card>
    </div>
  );
}

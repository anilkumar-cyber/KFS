import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuctionPropertyForm } from "@/components/admin/auction-property-form";
import { DeleteEntityButton } from "@/components/admin/delete-entity-button";
import { deleteAuctionProperty } from "@/lib/actions/auction-properties";

export const metadata: Metadata = { title: "Edit Auction Property", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditAuctionPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auctionProperty = await prisma.auctionProperty.findUnique({ where: { id } });
  if (!auctionProperty) notFound();

  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/auction-properties"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to auction properties
        </Link>
        <DeleteEntityButton
          id={auctionProperty.id}
          label={auctionProperty.title}
          entityName="auction property"
          action={deleteAuctionProperty}
          redirectTo="/admin/auction-properties"
        />
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">{auctionProperty.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <AuctionPropertyForm auctionProperty={auctionProperty} />
        </CardContent>
      </Card>
    </div>
  );
}

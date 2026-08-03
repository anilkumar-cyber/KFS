import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyForm } from "@/components/admin/property-form";
import { DeleteEntityButton } from "@/components/admin/delete-entity-button";
import { deleteProperty } from "@/lib/actions/properties";

export const metadata: Metadata = { title: "Edit Property", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) notFound();

  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/properties" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to properties
        </Link>
        <DeleteEntityButton
          id={property.id}
          label={property.title}
          entityName="property"
          action={deleteProperty}
          redirectTo="/admin/properties"
        />
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">{property.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <PropertyForm property={property} />
        </CardContent>
      </Card>
    </div>
  );
}

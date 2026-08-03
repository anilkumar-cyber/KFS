import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Plus, Star } from "lucide-react";

import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentStatusFilterBar } from "@/components/admin/content-status-filter-bar";
import { ContentStatusSelect } from "@/components/admin/content-status-select";
import { DeleteEntityButton } from "@/components/admin/delete-entity-button";
import { updatePropertyStatus, deleteProperty } from "@/lib/actions/properties";
import type { ContentStatus, Prisma } from "@prisma/client";

export const metadata: Metadata = { title: "Properties", robots: { index: false } };
export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

export default async function AdminPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const where: Prisma.PropertyWhereInput = {};
  if (params.status) where.status = params.status as ContentStatus;
  if (params.q) {
    where.OR = [
      { title: { contains: params.q, mode: "insensitive" } },
      { city: { contains: params.q, mode: "insensitive" } },
      { location: { contains: params.q, mode: "insensitive" } },
    ];
  }

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.property.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Suspense fallback={<div className="h-10 flex-1 w-full" />}>
          <ContentStatusFilterBar searchPlaceholder="Search by title, city, or location..." />
        </Suspense>
        <Button asChild>
          <Link href="/admin/properties/new">
            <Plus className="size-3.5" /> New Property
          </Link>
        </Button>
      </div>

      <Card className="rounded-2xl overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground uppercase tracking-wide">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">Property</th>
                  <th className="text-left font-semibold px-5 py-3">Type</th>
                  <th className="text-left font-semibold px-5 py-3">City</th>
                  <th className="text-left font-semibold px-5 py-3">Price</th>
                  <th className="text-left font-semibold px-5 py-3">Status</th>
                  <th className="text-left font-semibold px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {properties.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                      No properties match your filters.
                    </td>
                  </tr>
                )}
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/properties/${property.id}`}
                        className="font-semibold hover:text-secondary hover:underline inline-flex items-center gap-1.5"
                      >
                        {property.title}
                        {property.featured && <Star className="size-3.5 fill-gold text-gold" />}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{property.location}</p>
                    </td>
                    <td className="px-5 py-3 text-xs">
                      <span className="rounded-full bg-muted px-2.5 py-1 font-medium">{property.typeLabel}</span>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{property.city}</td>
                    <td className="px-5 py-3 text-xs font-medium whitespace-nowrap">{property.priceLabel}</td>
                    <td className="px-5 py-3">
                      <ContentStatusSelect id={property.id} status={property.status} action={updatePropertyStatus} />
                    </td>
                    <td className="px-5 py-3">
                      <DeleteEntityButton id={property.id} label={property.title} entityName="property" action={deleteProperty} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Page {page} of {totalPages} &middot; {total} total properties
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/properties?${new URLSearchParams({ ...params, page: String(page - 1) }).toString()}`}
                className="rounded-lg border border-border px-3 py-1.5 hover:bg-muted"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/properties?${new URLSearchParams({ ...params, page: String(page + 1) }).toString()}`}
                className="rounded-lg border border-border px-3 py-1.5 hover:bg-muted"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

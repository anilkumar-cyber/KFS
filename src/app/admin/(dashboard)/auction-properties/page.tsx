import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentStatusFilterBar } from "@/components/admin/content-status-filter-bar";
import { ContentStatusSelect } from "@/components/admin/content-status-select";
import { DeleteEntityButton } from "@/components/admin/delete-entity-button";
import { updateAuctionPropertyStatus, deleteAuctionProperty } from "@/lib/actions/auction-properties";
import type { ContentStatus, Prisma } from "@prisma/client";

export const metadata: Metadata = { title: "Auction Properties", robots: { index: false } };
export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

export default async function AdminAuctionPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const where: Prisma.AuctionPropertyWhereInput = {};
  if (params.status) where.status = params.status as ContentStatus;
  if (params.q) {
    where.OR = [
      { title: { contains: params.q, mode: "insensitive" } },
      { city: { contains: params.q, mode: "insensitive" } },
      { bank: { contains: params.q, mode: "insensitive" } },
    ];
  }

  const [auctionProperties, total] = await Promise.all([
    prisma.auctionProperty.findMany({
      where,
      orderBy: { auctionDate: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.auctionProperty.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Suspense fallback={<div className="h-10 flex-1 w-full" />}>
          <ContentStatusFilterBar searchPlaceholder="Search by title, city, or bank..." />
        </Suspense>
        <Button asChild>
          <Link href="/admin/auction-properties/new">
            <Plus className="size-3.5" /> New Auction Property
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
                  <th className="text-left font-semibold px-5 py-3">Bank</th>
                  <th className="text-left font-semibold px-5 py-3">City</th>
                  <th className="text-left font-semibold px-5 py-3">Reserve Price</th>
                  <th className="text-left font-semibold px-5 py-3">Auction Date</th>
                  <th className="text-left font-semibold px-5 py-3">Status</th>
                  <th className="text-left font-semibold px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {auctionProperties.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                      No auction properties match your filters.
                    </td>
                  </tr>
                )}
                {auctionProperties.map((auctionProperty) => (
                  <tr key={auctionProperty.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/auction-properties/${auctionProperty.id}`}
                        className="font-semibold hover:text-secondary hover:underline"
                      >
                        {auctionProperty.title}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{auctionProperty.location}</p>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{auctionProperty.bank}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{auctionProperty.city}</td>
                    <td className="px-5 py-3 text-xs font-medium whitespace-nowrap">{auctionProperty.reservePriceLabel}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(auctionProperty.auctionDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3">
                      <ContentStatusSelect
                        id={auctionProperty.id}
                        status={auctionProperty.status}
                        action={updateAuctionPropertyStatus}
                      />
                    </td>
                    <td className="px-5 py-3">
                      <DeleteEntityButton
                        id={auctionProperty.id}
                        label={auctionProperty.title}
                        entityName="auction property"
                        action={deleteAuctionProperty}
                      />
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
            Page {page} of {totalPages} &middot; {total} total auction properties
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/auction-properties?${new URLSearchParams({ ...params, page: String(page - 1) }).toString()}`}
                className="rounded-lg border border-border px-3 py-1.5 hover:bg-muted"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/auction-properties?${new URLSearchParams({ ...params, page: String(page + 1) }).toString()}`}
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

import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentFilterBar } from "@/components/admin/content-filter-bar";
import { ContentStatusBadge } from "@/components/admin/content-status-badge";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { deleteTaxService } from "@/lib/actions/tax-services";
import type { ContentStatus, Prisma } from "@prisma/client";

export const metadata: Metadata = { title: "Tax Services", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminTaxServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;

  const where: Prisma.TaxServiceWhereInput = {};
  if (params.status) where.status = params.status as ContentStatus;
  if (params.q) {
    where.OR = [
      { name: { contains: params.q, mode: "insensitive" } },
      { slug: { contains: params.q, mode: "insensitive" } },
    ];
  }

  const services = await prisma.taxService.findMany({ where, orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <Suspense fallback={<div className="h-10 flex-1" />}>
          <ContentFilterBar
            searchPlaceholder="Search by name or slug..."
            filters={[
              {
                key: "status",
                placeholder: "All Statuses",
                options: [
                  { value: "all", label: "All Statuses" },
                  { value: "DRAFT", label: "Draft" },
                  { value: "PUBLISHED", label: "Published" },
                ],
              },
            ]}
          />
        </Suspense>
        <Button asChild className="shrink-0">
          <Link href="/admin/tax-services/new">
            <Plus className="size-4" /> New Tax Service
          </Link>
        </Button>
      </div>

      <Card className="rounded-2xl overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground uppercase tracking-wide">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">Name</th>
                  <th className="text-left font-semibold px-5 py-3">Price</th>
                  <th className="text-left font-semibold px-5 py-3">Timeline</th>
                  <th className="text-left font-semibold px-5 py-3">Status</th>
                  <th className="text-right font-semibold px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {services.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                      No tax services match your filters.
                    </td>
                  </tr>
                )}
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3">
                      <Link href={`/admin/tax-services/${service.id}`} className="font-semibold hover:text-secondary hover:underline">
                        {service.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">/{service.slug}</p>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{service.price}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{service.timeline}</td>
                    <td className="px-5 py-3">
                      <ContentStatusBadge status={service.status} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/tax-services/${service.id}`}>Edit</Link>
                        </Button>
                        <DeleteContentButton
                          id={service.id}
                          name={service.name}
                          entityLabel="tax service"
                          deleteAction={deleteTaxService}
                          redirectTo="/admin/tax-services"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

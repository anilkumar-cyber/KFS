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
import { deleteLoanProduct } from "@/lib/actions/loans";
import type { ContentStatus, LoanCategory, Prisma } from "@prisma/client";

export const metadata: Metadata = { title: "Loan Products", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminLoansPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; category?: string; q?: string }>;
}) {
  const params = await searchParams;

  const where: Prisma.LoanProductWhereInput = {};
  if (params.status) where.status = params.status as ContentStatus;
  if (params.category) where.category = params.category as LoanCategory;
  if (params.q) {
    where.OR = [
      { name: { contains: params.q, mode: "insensitive" } },
      { shortName: { contains: params.q, mode: "insensitive" } },
      { slug: { contains: params.q, mode: "insensitive" } },
    ];
  }

  const loans = await prisma.loanProduct.findMany({ where, orderBy: { createdAt: "desc" } });

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
              {
                key: "category",
                placeholder: "All Categories",
                options: [
                  { value: "all", label: "All Categories" },
                  { value: "SECURED", label: "Secured" },
                  { value: "UNSECURED", label: "Unsecured" },
                ],
              },
            ]}
          />
        </Suspense>
        <Button asChild className="shrink-0">
          <Link href="/admin/loans/new">
            <Plus className="size-4" /> New Loan Product
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
                  <th className="text-left font-semibold px-5 py-3">Category</th>
                  <th className="text-left font-semibold px-5 py-3">Interest Rate</th>
                  <th className="text-left font-semibold px-5 py-3">Status</th>
                  <th className="text-right font-semibold px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loans.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                      No loan products match your filters.
                    </td>
                  </tr>
                )}
                {loans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3">
                      <Link href={`/admin/loans/${loan.id}`} className="font-semibold hover:text-secondary hover:underline">
                        {loan.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">/{loan.slug}</p>
                    </td>
                    <td className="px-5 py-3 text-xs">
                      <span className="rounded-full bg-muted px-2.5 py-1 font-medium">
                        {loan.category === "SECURED" ? "Secured" : "Unsecured"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{loan.interestRate}</td>
                    <td className="px-5 py-3">
                      <ContentStatusBadge status={loan.status} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/loans/${loan.id}`}>Edit</Link>
                        </Button>
                        <DeleteContentButton
                          id={loan.id}
                          name={loan.name}
                          entityLabel="loan product"
                          deleteAction={deleteLoanProduct}
                          redirectTo="/admin/loans"
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

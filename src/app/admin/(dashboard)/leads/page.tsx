import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { LeadsFilterBar } from "@/components/admin/leads-filter-bar";
import { LeadStatusSelect } from "@/components/admin/lead-status-select";
import type { LeadStatus, Prisma } from "@prisma/client";

export const metadata: Metadata = { title: "Leads / CRM", robots: { index: false } };
export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const where: Prisma.LeadWhereInput = {};
  if (params.status) where.status = params.status as LeadStatus;
  if (params.q) {
    where.OR = [
      { name: { contains: params.q, mode: "insensitive" } },
      { phone: { contains: params.q } },
      { email: { contains: params.q, mode: "insensitive" } },
    ];
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { assignedTo: { select: { name: true } } },
    }),
    prisma.lead.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="flex flex-col gap-5">
      <Suspense fallback={<div className="h-10" />}>
        <LeadsFilterBar />
      </Suspense>

      <Card className="rounded-2xl overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground uppercase tracking-wide">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">Lead</th>
                  <th className="text-left font-semibold px-5 py-3">Contact</th>
                  <th className="text-left font-semibold px-5 py-3">Interest</th>
                  <th className="text-left font-semibold px-5 py-3">Assigned To</th>
                  <th className="text-left font-semibold px-5 py-3">Status</th>
                  <th className="text-left font-semibold px-5 py-3">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                      No leads match your filters.
                    </td>
                  </tr>
                )}
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="font-semibold hover:text-secondary hover:underline">
                        {lead.name}
                      </Link>
                      {lead.city && (
                        <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <MapPin className="size-3" /> {lead.city}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <p className="flex items-center gap-1.5 text-xs">
                        <Phone className="size-3.5 text-muted-foreground" /> {lead.phone}
                      </p>
                      {lead.email && (
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                          <Mail className="size-3.5" /> {lead.email}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-3 text-xs">
                      <span className="rounded-full bg-muted px-2.5 py-1 font-medium">{lead.interest}</span>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">
                      {lead.assignedTo?.name ?? <span className="italic">Unassigned</span>}
                    </td>
                    <td className="px-5 py-3">
                      <LeadStatusSelect leadId={lead.id} status={lead.status} />
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
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
            Page {page} of {totalPages} &middot; {total} total leads
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/leads?${new URLSearchParams({ ...params, page: String(page - 1) }).toString()}`}
                className="rounded-lg border border-border px-3 py-1.5 hover:bg-muted"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/leads?${new URLSearchParams({ ...params, page: String(page + 1) }).toString()}`}
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

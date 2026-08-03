import Link from "next/link";
import type { Metadata } from "next";
import { Users, Building2, FileText, Wallet, ArrowRight, Clock } from "lucide-react";

import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LeadStatusBadge } from "@/components/admin/lead-status-badge";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

export const dynamic = "force-dynamic";

async function getDashboardData() {
  const [
    totalLeads,
    newLeads,
    leadsByStatus,
    recentLeads,
    propertyCount,
    blogCount,
    loanCount,
    testimonialCount,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.lead.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.property.count(),
    prisma.blogPost.count(),
    prisma.loanProduct.count(),
    prisma.testimonial.count({ where: { status: "PENDING" } }),
  ]);

  return { totalLeads, newLeads, leadsByStatus, recentLeads, propertyCount, blogCount, loanCount, testimonialCount };
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  const statusCounts = Object.fromEntries(data.leadsByStatus.map((s) => [s.status, s._count._all]));

  const statCards = [
    { label: "Total Leads", value: data.totalLeads, icon: Users, href: "/admin/leads" },
    { label: "New Leads", value: data.newLeads, icon: Clock, href: "/admin/leads?status=NEW" },
    { label: "Properties Listed", value: data.propertyCount, icon: Building2, href: "/admin/properties" },
    { label: "Loan Products", value: data.loanCount, icon: Wallet, href: "/admin/loans" },
    { label: "Blog Posts", value: data.blogCount, icon: FileText, href: "/admin/blogs" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="rounded-2xl hover:shadow-premium hover:border-secondary/40 transition-all">
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <stat.icon className="size-4" />
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Leads</CardTitle>
            <Link href="/admin/leads" className="text-sm text-secondary font-semibold flex items-center gap-1 hover:underline">
              View all <ArrowRight className="size-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {data.recentLeads.length === 0 && (
                <p className="px-6 py-8 text-sm text-muted-foreground text-center">No leads yet.</p>
              )}
              {data.recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center justify-between gap-4 px-6 py-3.5 hover:bg-muted/50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{lead.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {lead.interest} &middot; {lead.phone}
                    </p>
                  </div>
                  <LeadStatusBadge status={lead.status} />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Leads by Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5">
            {(["NEW", "CONTACTED", "QUALIFIED", "IN_PROGRESS", "CONVERTED", "LOST"] as const).map((status) => (
              <div key={status} className="flex items-center justify-between text-sm">
                <LeadStatusBadge status={status} />
                <span className="font-semibold">{statusCounts[status] ?? 0}</span>
              </div>
            ))}
            {data.testimonialCount > 0 && (
              <div className="mt-2 pt-3 border-t border-border flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Testimonials pending review</span>
                <Badge className="bg-gold text-primary">{data.testimonialCount}</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

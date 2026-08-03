import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Tag, Globe } from "lucide-react";

import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadStatusSelect } from "@/components/admin/lead-status-select";
import { AssignLeadSelect } from "@/components/admin/assign-lead-select";
import { LeadNotes } from "@/components/admin/lead-notes";
import { DeleteLeadButton } from "@/components/admin/delete-lead-button";

export const metadata: Metadata = { title: "Lead Detail", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminLeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [lead, users] = await Promise.all([
    prisma.lead.findUnique({
      where: { id },
      include: {
        assignedTo: { select: { name: true } },
        notes: { orderBy: { createdAt: "desc" }, include: { author: { select: { name: true } } } },
      },
    }),
    prisma.user.findMany({ where: { active: true }, select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);

  if (!lead) notFound();

  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/leads" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to leads
        </Link>
        <DeleteLeadButton leadId={lead.id} leadName={lead.name} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">{lead.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="size-4 text-muted-foreground" />
              <a href={`tel:${lead.phone}`} className="hover:text-secondary hover:underline">
                {lead.phone}
              </a>
            </div>
            {lead.email && (
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-muted-foreground" />
                <a href={`mailto:${lead.email}`} className="hover:text-secondary hover:underline">
                  {lead.email}
                </a>
              </div>
            )}
            {lead.city && (
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-muted-foreground" /> {lead.city}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Tag className="size-4 text-muted-foreground" /> {lead.interest}
            </div>
            {lead.source && (
              <div className="flex items-center gap-2">
                <Globe className="size-4 text-muted-foreground" /> {lead.source}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground" />
              {new Date(lead.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
            </div>
            {lead.message && (
              <div className="sm:col-span-2 rounded-xl bg-muted/50 p-3.5 mt-1">
                <p className="text-xs text-muted-foreground mb-1">Message</p>
                <p>{lead.message}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Manage</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">Status</p>
              <LeadStatusSelect leadId={lead.id} status={lead.status} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">Assigned To</p>
              <AssignLeadSelect leadId={lead.id} assignedToId={lead.assignedToId} users={users} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Notes &amp; Follow-ups</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadNotes leadId={lead.id} notes={lead.notes} />
        </CardContent>
      </Card>
    </div>
  );
}

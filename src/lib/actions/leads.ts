"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import type { LeadStatus } from "@prisma/client";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  await requireSession();
  await prisma.lead.update({ where: { id: leadId }, data: { status } });
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin");
}

export async function assignLead(leadId: string, userId: string | null) {
  await requireSession();
  await prisma.lead.update({ where: { id: leadId }, data: { assignedToId: userId } });
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function addLeadNote(leadId: string, body: string) {
  const session = await requireSession();
  if (!body.trim()) throw new Error("Note cannot be empty");
  await prisma.leadNote.create({
    data: { leadId, body: body.trim(), authorId: session.sub },
  });
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function deleteLead(leadId: string) {
  const session = await requireSession();
  if (session.role !== "ADMIN") throw new Error("Only admins can delete leads");
  await prisma.lead.delete({ where: { id: leadId } });
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

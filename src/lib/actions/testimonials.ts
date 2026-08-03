"use server";

import { revalidatePath } from "next/cache";
import type { TestimonialStatus } from "@prisma/client";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

export type TestimonialInput = {
  name: string;
  location: string;
  rating: number;
  service: string;
  quote: string;
  avatar: string;
  status: TestimonialStatus;
};

export async function createTestimonial(data: TestimonialInput) {
  await requireSession();
  const created = await prisma.testimonial.create({ data });
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin");
  return created;
}

export async function updateTestimonial(id: string, data: TestimonialInput) {
  await requireSession();
  const updated = await prisma.testimonial.update({ where: { id }, data });
  revalidatePath("/admin/testimonials");
  revalidatePath(`/admin/testimonials/${id}`);
  return updated;
}

export async function updateTestimonialStatus(id: string, status: TestimonialStatus) {
  await requireSession();
  await prisma.testimonial.update({ where: { id }, data: { status } });
  revalidatePath("/admin/testimonials");
  revalidatePath(`/admin/testimonials/${id}`);
  revalidatePath("/admin");
}

export async function deleteTestimonial(id: string) {
  await requireSession();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin");
}

"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import type { UserRole } from "@prisma/client";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  if (session.role !== "ADMIN") throw new Error("Only admins can manage users");
  return session;
}

export async function createUser(input: { email: string; name: string; password: string; role: UserRole }) {
  await requireAdmin();

  const existing = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
  if (existing) throw new Error("A user with this email already exists");

  const passwordHash = await bcrypt.hash(input.password, 10);
  await prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      name: input.name,
      role: input.role,
      passwordHash,
    },
  });
  revalidatePath("/admin/users");
}

export async function updateUser(
  id: string,
  input: { name: string; role: UserRole; active: boolean; newPassword?: string }
) {
  const session = await requireAdmin();

  if (session.sub === id && (!input.active || input.role !== "ADMIN")) {
    throw new Error("You cannot deactivate or demote your own account");
  }

  await prisma.user.update({
    where: { id },
    data: {
      name: input.name,
      role: input.role,
      active: input.active,
      ...(input.newPassword ? { passwordHash: await bcrypt.hash(input.newPassword, 10) } : {}),
    },
  });
  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${id}`);
}

export async function deleteUser(id: string) {
  const session = await requireAdmin();
  if (session.sub === id) throw new Error("You cannot delete your own account");
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}

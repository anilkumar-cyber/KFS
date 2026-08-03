"use server";

import { revalidatePath } from "next/cache";
import { Prisma, type ContentStatus } from "@prisma/client";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

export type BlogPostInput = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  publishedOn: Date;
  readMinutes: number;
  image: string;
  status: ContentStatus;
};

function friendlySlugError(err: unknown): never {
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    throw new Error("That slug is already in use — please choose a different one.");
  }
  throw err;
}

export async function createBlogPost(data: BlogPostInput) {
  await requireSession();
  try {
    const created = await prisma.blogPost.create({ data });
    revalidatePath("/admin/blogs");
    revalidatePath("/admin");
    return created;
  } catch (err) {
    friendlySlugError(err);
  }
}

export async function updateBlogPost(id: string, data: BlogPostInput) {
  await requireSession();
  try {
    const updated = await prisma.blogPost.update({ where: { id }, data });
    revalidatePath("/admin/blogs");
    revalidatePath(`/admin/blogs/${id}`);
    return updated;
  } catch (err) {
    friendlySlugError(err);
  }
}

export async function deleteBlogPost(id: string) {
  await requireSession();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blogs");
  revalidatePath("/admin");
}

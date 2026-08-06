import { prisma } from "@/lib/db";
import type { BlogPost as BlogPostRow } from "@prisma/client";

export type BlogPost = {
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
};

function mapPost(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    tags: row.tags,
    author: row.author,
    authorRole: row.authorRole,
    publishedOn: row.publishedOn,
    readMinutes: row.readMinutes,
    image: row.image,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const rows = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedOn: "desc" },
  });
  return rows.map(mapPost);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const row = await prisma.blogPost.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
  return row ? mapPost(row) : null;
}

export async function getBlogCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.map((p) => p.category)));
}

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
import { deleteBlogPost } from "@/lib/actions/blogs";
import type { ContentStatus, Prisma } from "@prisma/client";

export const metadata: Metadata = { title: "Blog Posts", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;

  const where: Prisma.BlogPostWhereInput = {};
  if (params.status) where.status = params.status as ContentStatus;
  if (params.q) {
    where.OR = [
      { title: { contains: params.q, mode: "insensitive" } },
      { slug: { contains: params.q, mode: "insensitive" } },
      { category: { contains: params.q, mode: "insensitive" } },
    ];
  }

  const posts = await prisma.blogPost.findMany({ where, orderBy: { publishedOn: "desc" } });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <Suspense fallback={<div className="h-10 flex-1" />}>
          <ContentFilterBar
            searchPlaceholder="Search by title or category..."
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
          <Link href="/admin/blogs/new">
            <Plus className="size-4" /> New Blog Post
          </Link>
        </Button>
      </div>

      <Card className="rounded-2xl overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground uppercase tracking-wide">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">Title</th>
                  <th className="text-left font-semibold px-5 py-3">Category</th>
                  <th className="text-left font-semibold px-5 py-3">Author</th>
                  <th className="text-left font-semibold px-5 py-3">Published</th>
                  <th className="text-left font-semibold px-5 py-3">Status</th>
                  <th className="text-right font-semibold px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                      No blog posts match your filters.
                    </td>
                  </tr>
                )}
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3">
                      <Link href={`/admin/blogs/${post.id}`} className="font-semibold hover:text-secondary hover:underline">
                        {post.title}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">/{post.slug}</p>
                    </td>
                    <td className="px-5 py-3 text-xs">
                      <span className="rounded-full bg-muted px-2.5 py-1 font-medium">{post.category}</span>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{post.author}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(post.publishedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3">
                      <ContentStatusBadge status={post.status} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/blogs/${post.id}`}>Edit</Link>
                        </Button>
                        <DeleteContentButton
                          id={post.id}
                          name={post.title}
                          entityLabel="blog post"
                          deleteAction={deleteBlogPost}
                          redirectTo="/admin/blogs"
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

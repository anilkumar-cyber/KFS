import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/db";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { deleteBlogPost } from "@/lib/actions/blogs";

export const metadata: Metadata = { title: "Edit Blog Post", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blogPost = await prisma.blogPost.findUnique({ where: { id } });
  if (!blogPost) notFound();

  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/blogs" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to blog posts
        </Link>
        <DeleteContentButton
          id={blogPost.id}
          name={blogPost.title}
          entityLabel="blog post"
          deleteAction={deleteBlogPost}
          redirectTo="/admin/blogs"
        />
      </div>
      <BlogPostForm blogPost={blogPost} />
    </div>
  );
}

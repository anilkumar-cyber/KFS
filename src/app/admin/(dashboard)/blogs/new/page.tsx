import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BlogPostForm } from "@/components/admin/blog-post-form";

export const metadata: Metadata = { title: "New Blog Post", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function NewBlogPostPage() {
  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <Link href="/admin/blogs" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground w-fit">
        <ArrowLeft className="size-4" /> Back to blog posts
      </Link>
      <BlogPostForm />
    </div>
  );
}

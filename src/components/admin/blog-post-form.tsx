"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { createBlogPost, updateBlogPost } from "@/lib/actions/blogs";
import { slugify } from "@/components/admin/slugify";
import { linesToArray, arrayToLines } from "@/components/admin/list-text-utils";
import type { BlogPost } from "@prisma/client";

function toDateInputValue(date?: Date) {
  const d = date ?? new Date();
  return d.toISOString().slice(0, 10);
}

const formSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  title: z.string().trim().min(2, "Title is required"),
  excerpt: z.string().trim().min(1, "Excerpt is required"),
  content: z.string().trim().min(1, "Content is required"),
  category: z.string().trim().min(1, "Category is required"),
  tags: z.string(),
  author: z.string().trim().min(1, "Author is required"),
  authorRole: z.string().trim().min(1, "Author role is required"),
  publishedOn: z.string().trim().min(1, "Published date is required"),
  readMinutes: z
    .string()
    .trim()
    .min(1, "Required")
    .refine((v) => /^\d+$/.test(v) && Number(v) >= 1, "Must be a whole number of at least 1"),
  image: z.string().trim().min(1, "Image URL is required"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

type FormValues = z.infer<typeof formSchema>;

function toDefaultValues(blogPost?: BlogPost): FormValues {
  return {
    slug: blogPost?.slug ?? "",
    title: blogPost?.title ?? "",
    excerpt: blogPost?.excerpt ?? "",
    content: arrayToLines(blogPost?.content),
    category: blogPost?.category ?? "",
    tags: arrayToLines(blogPost?.tags),
    author: blogPost?.author ?? "",
    authorRole: blogPost?.authorRole ?? "",
    publishedOn: toDateInputValue(blogPost?.publishedOn),
    readMinutes: String(blogPost?.readMinutes ?? 5),
    image: blogPost?.image ?? "",
    status: blogPost?.status ?? "DRAFT",
  };
}

export function BlogPostForm({ blogPost }: { blogPost?: BlogPost }) {
  const router = useRouter();
  const isEdit = !!blogPost;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: toDefaultValues(blogPost),
  });

  function handleTitleChange(value: string) {
    if (!isEdit && !form.formState.dirtyFields.slug) {
      form.setValue("slug", slugify(value));
    }
  }

  async function onSubmit(values: FormValues) {
    const payload = {
      slug: values.slug,
      title: values.title,
      excerpt: values.excerpt,
      content: linesToArray(values.content),
      category: values.category,
      tags: linesToArray(values.tags),
      author: values.author,
      authorRole: values.authorRole,
      publishedOn: new Date(values.publishedOn),
      readMinutes: Number(values.readMinutes),
      image: values.image,
      status: values.status,
    };

    try {
      if (isEdit) {
        await updateBlogPost(blogPost.id, payload);
        toast.success("Blog post updated");
      } else {
        await createBlogPost(payload);
        toast.success("Blog post created");
      }
      router.push("/admin/blogs");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      if (message.toLowerCase().includes("slug")) {
        form.setError("slug", { message });
      } else {
        toast.error(message);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Basic Details</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="5 Tips for a Faster Home Loan Approval"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleTitleChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="faster-home-loan-approval" {...field} />
                  </FormControl>
                  <FormDescription>Used in the public URL. Lowercase letters, numbers, hyphens.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Home Loans" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Anita Rao" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Senior Loan Advisor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishedOn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Published On</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="readMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Read Time (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={(v) => v && field.onChange(v)} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="/images/blog/home-loan-tips.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Content &amp; Tags</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea rows={10} {...field} />
                  </FormControl>
                  <FormDescription>One paragraph per line.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormDescription>One tag per line.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/blogs")}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {isEdit ? "Save Changes" : "Create Blog Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

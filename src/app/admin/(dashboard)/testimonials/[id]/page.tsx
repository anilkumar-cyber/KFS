import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/db";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { deleteTestimonial } from "@/lib/actions/testimonials";

export const metadata: Metadata = { title: "Edit Testimonial", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/testimonials" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to testimonials
        </Link>
        <DeleteContentButton
          id={testimonial.id}
          name={testimonial.name}
          entityLabel="testimonial"
          deleteAction={deleteTestimonial}
          redirectTo="/admin/testimonials"
        />
      </div>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}

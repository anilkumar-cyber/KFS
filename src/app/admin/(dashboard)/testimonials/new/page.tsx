import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { TestimonialForm } from "@/components/admin/testimonial-form";

export const metadata: Metadata = { title: "New Testimonial", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function NewTestimonialPage() {
  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <Link
        href="/admin/testimonials"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground w-fit"
      >
        <ArrowLeft className="size-4" /> Back to testimonials
      </Link>
      <TestimonialForm />
    </div>
  );
}

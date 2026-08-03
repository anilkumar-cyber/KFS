import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentFilterBar } from "@/components/admin/content-filter-bar";
import { TestimonialStatusSelect } from "@/components/admin/testimonial-status-select";
import { RatingStars } from "@/components/admin/rating-stars";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { deleteTestimonial } from "@/lib/actions/testimonials";
import type { Prisma, TestimonialStatus } from "@prisma/client";

export const metadata: Metadata = { title: "Testimonials", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;

  const where: Prisma.TestimonialWhereInput = {};
  if (params.status) where.status = params.status as TestimonialStatus;
  if (params.q) {
    where.OR = [
      { name: { contains: params.q, mode: "insensitive" } },
      { service: { contains: params.q, mode: "insensitive" } },
      { location: { contains: params.q, mode: "insensitive" } },
    ];
  }

  const testimonials = await prisma.testimonial.findMany({ where, orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <Suspense fallback={<div className="h-10 flex-1" />}>
          <ContentFilterBar
            searchPlaceholder="Search by name, service or location..."
            filters={[
              {
                key: "status",
                placeholder: "All Statuses",
                options: [
                  { value: "all", label: "All Statuses" },
                  { value: "PENDING", label: "Pending" },
                  { value: "APPROVED", label: "Approved" },
                  { value: "REJECTED", label: "Rejected" },
                ],
              },
            ]}
          />
        </Suspense>
        <Button asChild className="shrink-0">
          <Link href="/admin/testimonials/new">
            <Plus className="size-4" /> New Testimonial
          </Link>
        </Button>
      </div>

      <Card className="rounded-2xl overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground uppercase tracking-wide">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">Name</th>
                  <th className="text-left font-semibold px-5 py-3">Service</th>
                  <th className="text-left font-semibold px-5 py-3">Rating</th>
                  <th className="text-left font-semibold px-5 py-3">Status</th>
                  <th className="text-right font-semibold px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {testimonials.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                      No testimonials match your filters.
                    </td>
                  </tr>
                )}
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/testimonials/${testimonial.id}`}
                        className="font-semibold hover:text-secondary hover:underline"
                      >
                        {testimonial.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{testimonial.location}</p>
                    </td>
                    <td className="px-5 py-3 text-xs">
                      <span className="rounded-full bg-muted px-2.5 py-1 font-medium">{testimonial.service}</span>
                    </td>
                    <td className="px-5 py-3">
                      <RatingStars rating={testimonial.rating} />
                    </td>
                    <td className="px-5 py-3">
                      <TestimonialStatusSelect testimonialId={testimonial.id} status={testimonial.status} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/testimonials/${testimonial.id}`}>Edit</Link>
                        </Button>
                        <DeleteContentButton
                          id={testimonial.id}
                          name={testimonial.name}
                          entityLabel="testimonial"
                          deleteAction={deleteTestimonial}
                          redirectTo="/admin/testimonials"
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

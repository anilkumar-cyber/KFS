"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateTestimonialStatus } from "@/lib/actions/testimonials";
import type { TestimonialStatus } from "@prisma/client";

const statusOptions: { value: TestimonialStatus; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export function TestimonialStatusSelect({ testimonialId, status }: { testimonialId: string; status: TestimonialStatus }) {
  const [pending, startTransition] = React.useTransition();
  const [value, setValue] = React.useState(status);

  function handleChange(next: string | null) {
    if (!next || next === value) return;
    const previous = value;
    setValue(next as TestimonialStatus);
    startTransition(async () => {
      try {
        await updateTestimonialStatus(testimonialId, next as TestimonialStatus);
        toast.success("Testimonial status updated");
      } catch {
        setValue(previous);
        toast.error("Failed to update status");
      }
    });
  }

  return (
    <div className="relative inline-flex items-center" onClick={(e) => e.stopPropagation()}>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="h-8 w-[130px] text-xs" disabled={pending}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {pending && <Loader2 className="absolute -right-6 size-3.5 animate-spin text-muted-foreground" />}
    </div>
  );
}

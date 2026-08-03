"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateLeadStatus } from "@/lib/actions/leads";
import type { LeadStatus } from "@prisma/client";

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "CONVERTED", label: "Converted" },
  { value: "LOST", label: "Lost" },
];

export function LeadStatusSelect({ leadId, status }: { leadId: string; status: LeadStatus }) {
  const [pending, startTransition] = React.useTransition();
  const [value, setValue] = React.useState(status);

  function handleChange(next: string | null) {
    if (!next || next === value) return;
    const previous = value;
    setValue(next as LeadStatus);
    startTransition(async () => {
      try {
        await updateLeadStatus(leadId, next as LeadStatus);
        toast.success("Lead status updated");
      } catch {
        setValue(previous);
        toast.error("Failed to update status");
      }
    });
  }

  return (
    <div className="relative inline-flex items-center" onClick={(e) => e.stopPropagation()}>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="h-8 w-[150px] text-xs" disabled={pending}>
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

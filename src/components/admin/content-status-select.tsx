"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ContentStatus } from "@prisma/client";

const statusOptions: { value: ContentStatus; label: string }[] = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
];

/**
 * Generic inline status toggle for content models that share the `ContentStatus`
 * enum (Property, AuctionProperty, ...). Pass the relevant server action as `action`.
 */
export function ContentStatusSelect({
  id,
  status,
  action,
}: {
  id: string;
  status: ContentStatus;
  action: (id: string, status: ContentStatus) => Promise<void>;
}) {
  const [pending, startTransition] = React.useTransition();
  const [value, setValue] = React.useState(status);

  function handleChange(next: string | null) {
    if (!next || next === value) return;
    const previous = value;
    setValue(next as ContentStatus);
    startTransition(async () => {
      try {
        await action(id, next as ContentStatus);
        toast.success("Status updated");
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

"use client";

import * as React from "react";
import { toast } from "sonner";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { assignLead } from "@/lib/actions/leads";

export function AssignLeadSelect({
  leadId,
  assignedToId,
  users,
}: {
  leadId: string;
  assignedToId: string | null;
  users: { id: string; name: string }[];
}) {
  const [, startTransition] = React.useTransition();
  const [value, setValue] = React.useState(assignedToId ?? "unassigned");

  function handleChange(next: string | null) {
    if (!next) return;
    const previous = value;
    setValue(next);
    startTransition(async () => {
      try {
        await assignLead(leadId, next === "unassigned" ? null : next);
        toast.success("Lead assignment updated");
      } catch {
        setValue(previous);
        toast.error("Failed to update assignment");
      }
    });
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unassigned">Unassigned</SelectItem>
        {users.map((u) => (
          <SelectItem key={u.id} value={u.id}>
            {u.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

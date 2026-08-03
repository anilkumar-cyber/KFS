"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addLeadNote } from "@/lib/actions/leads";

export type LeadNoteItem = {
  id: string;
  body: string;
  createdAt: string | Date;
  author: { name: string } | null;
};

export function LeadNotes({ leadId, notes }: { leadId: string; notes: LeadNoteItem[] }) {
  const [pending, startTransition] = React.useTransition();
  const [body, setBody] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    startTransition(async () => {
      try {
        await addLeadNote(leadId, body);
        setBody("");
        toast.success("Note added");
      } catch {
        toast.error("Failed to add note");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Log a call, follow-up, or remark about this lead..."
          rows={3}
        />
        <Button type="submit" size="sm" disabled={pending || !body.trim()} className="self-end rounded-full">
          {pending ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
          Add Note
        </Button>
      </form>

      <div className="flex flex-col gap-3">
        {notes.length === 0 && <p className="text-sm text-muted-foreground italic">No notes yet.</p>}
        {notes.map((note) => (
          <div key={note.id} className="rounded-xl border border-border bg-muted/40 p-3.5">
            <p className="text-sm whitespace-pre-wrap">{note.body}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {note.author?.name ?? "System"} &middot;{" "}
              {new Date(note.createdAt).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

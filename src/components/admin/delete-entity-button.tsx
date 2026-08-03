"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Generic delete-confirmation button for admin content CRUD. Pass the relevant
 * server action as `action`. If `redirectTo` is provided the router navigates
 * there after a successful delete (use on detail/edit pages); otherwise the
 * current route is refreshed (use in list-page table rows).
 */
export function DeleteEntityButton({
  id,
  label,
  entityName,
  action,
  redirectTo,
  size = "sm",
}: {
  id: string;
  /** Human-readable name of the specific record, e.g. the title/question. */
  label: string;
  /** Lowercase noun for the entity type, e.g. "property", "FAQ". */
  entityName: string;
  action: (id: string) => Promise<void>;
  redirectTo?: string;
  size?: "sm" | "default";
}) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);

  function handleDelete() {
    startTransition(async () => {
      try {
        await action(id);
        toast.success(`${entityName[0].toUpperCase()}${entityName.slice(1)} deleted`);
        setOpen(false);
        if (redirectTo) {
          router.push(redirectTo);
        } else {
          router.refresh();
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : `Failed to delete ${entityName}`);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size={size} className="text-destructive border-destructive/30" />}>
        <Trash2 className="size-3.5" /> Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {entityName}?</DialogTitle>
          <DialogDescription>
            This will permanently delete <strong>{label}</strong>. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={pending}>
            {pending && <Loader2 className="size-3.5 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

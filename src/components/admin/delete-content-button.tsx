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
 * Generic delete-confirmation button shared by the Loan Product, Tax Service,
 * Blog Post and Testimonial admin detail pages. Mirrors DeleteLeadButton.
 */
export function DeleteContentButton({
  id,
  name,
  entityLabel,
  deleteAction,
  redirectTo,
}: {
  id: string;
  name: string;
  /** e.g. "loan product", "tax service", "blog post", "testimonial" */
  entityLabel: string;
  deleteAction: (id: string) => Promise<unknown>;
  redirectTo: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteAction(id);
        toast.success(`${capitalize(entityLabel)} deleted`);
        setOpen(false);
        router.push(redirectTo);
      } catch {
        toast.error(`Failed to delete ${entityLabel}`);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" className="text-destructive border-destructive/30" />}>
        <Trash2 className="size-3.5" /> Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {entityLabel}?</DialogTitle>
          <DialogDescription>
            This will permanently delete <strong>{name}</strong>. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={pending}>
            {pending && <Loader2 className="size-3.5 animate-spin" />}
            Delete {capitalize(entityLabel)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

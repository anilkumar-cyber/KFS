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
import { deleteUser } from "@/lib/actions/users";

export function DeleteUserButton({ userId, userName }: { userId: string; userName: string }) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteUser(userId);
        toast.success("User deleted");
        setOpen(false);
        router.push("/admin/users");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to delete user");
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
          <DialogTitle>Delete user?</DialogTitle>
          <DialogDescription>
            This will permanently remove <strong>{userName}</strong>&apos;s access to the admin panel. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={pending}>
            {pending && <Loader2 className="size-3.5 animate-spin" />}
            Delete User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

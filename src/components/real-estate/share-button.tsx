"use client";

import * as React from "react";
import { toast } from "sonner";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ShareButton({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  async function handleShare(e: React.MouseEvent) {
    e.preventDefault();
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled share sheet — no-op
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Couldn't copy link. Please copy it manually.");
    }
  }

  return (
    <Button type="button" variant="outline" onClick={handleShare} className={cn("gap-2", className)}>
      <Share2 className="size-4" /> Share
    </Button>
  );
}

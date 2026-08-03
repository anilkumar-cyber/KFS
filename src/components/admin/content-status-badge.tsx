import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ContentStatus } from "@prisma/client";

const statusStyles: Record<ContentStatus, string> = {
  DRAFT: "bg-muted text-muted-foreground hover:bg-muted",
  PUBLISHED: "bg-accent/15 text-accent hover:bg-accent/15",
};

const statusLabels: Record<ContentStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
};

export function ContentStatusBadge({ status, className }: { status: ContentStatus; className?: string }) {
  return <Badge className={cn("font-medium border-0", statusStyles[status], className)}>{statusLabels[status]}</Badge>;
}

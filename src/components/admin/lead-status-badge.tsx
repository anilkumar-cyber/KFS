import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LeadStatus } from "@prisma/client";

const statusStyles: Record<LeadStatus, string> = {
  NEW: "bg-secondary/15 text-secondary hover:bg-secondary/15",
  CONTACTED: "bg-gold/20 text-[#92730E] hover:bg-gold/20 dark:text-gold",
  QUALIFIED: "bg-accent/15 text-accent hover:bg-accent/15",
  IN_PROGRESS: "bg-primary/10 text-primary hover:bg-primary/10 dark:bg-white/10 dark:text-white",
  CONVERTED: "bg-accent text-white hover:bg-accent",
  LOST: "bg-destructive/10 text-destructive hover:bg-destructive/10",
};

const statusLabels: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  IN_PROGRESS: "In Progress",
  CONVERTED: "Converted",
  LOST: "Lost",
};

export function LeadStatusBadge({ status, className }: { status: LeadStatus; className?: string }) {
  return <Badge className={cn("font-medium border-0", statusStyles[status], className)}>{statusLabels[status]}</Badge>;
}

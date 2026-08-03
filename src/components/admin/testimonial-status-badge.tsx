import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TestimonialStatus } from "@prisma/client";

const statusStyles: Record<TestimonialStatus, string> = {
  PENDING: "bg-gold/20 text-[#92730E] hover:bg-gold/20 dark:text-gold",
  APPROVED: "bg-accent/15 text-accent hover:bg-accent/15",
  REJECTED: "bg-destructive/10 text-destructive hover:bg-destructive/10",
};

const statusLabels: Record<TestimonialStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export function TestimonialStatusBadge({ status, className }: { status: TestimonialStatus; className?: string }) {
  return <Badge className={cn("font-medium border-0", statusStyles[status], className)}>{statusLabels[status]}</Badge>;
}

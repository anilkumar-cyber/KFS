import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { renderLoanIcon } from "@/components/loans/loan-icon";
import type { LoanProduct } from "@/lib/queries/loans";
import { cn } from "@/lib/utils";

export function LoanCard({ loan, className }: { loan: LoanProduct; className?: string }) {
  return (
    <Link href={`/loans/${loan.slug}`} className={cn("group block h-full", className)}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-5 sm:p-6 transition-all duration-300 hover:border-secondary/40 hover:shadow-premium">
        <div className="absolute -right-6 -top-6 size-24 rounded-full bg-secondary/5 transition-colors group-hover:bg-secondary/10" />
        <div className="relative flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white mb-4 transition-transform group-hover:scale-105">
          {renderLoanIcon(loan.icon, "size-6")}
        </div>
        <h3 className="relative font-heading font-bold text-base mb-1.5">{loan.name}</h3>
        <p className="relative text-xs text-muted-foreground mb-4 flex-1 text-pretty">{loan.tagline}</p>
        <div className="relative flex items-center justify-between gap-2 pt-3 border-t border-border/60">
          <span className="text-xs font-semibold text-primary dark:text-white">{loan.interestRate}</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary transition-all group-hover:gap-2">
            Learn More <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

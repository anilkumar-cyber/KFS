import Link from "next/link";
import { Landmark } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 shrink-0", className)}>
      <span className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-premium">
        <Landmark className="size-5 text-gold" strokeWidth={2.25} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-heading text-[1.05rem] font-bold tracking-tight", light ? "text-white" : "text-foreground")}>
          Kavya <span className="text-gold">Financial</span>
        </span>
        <span className={cn("text-[10px] font-medium tracking-wide", light ? "text-white/60" : "text-muted-foreground")}>
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  );
}

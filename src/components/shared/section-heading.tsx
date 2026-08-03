import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider",
            light
              ? "border-white/20 bg-white/10 text-white/90"
              : "border-secondary/20 bg-secondary/10 text-secondary"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-balance",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("text-base sm:text-lg text-pretty", light ? "text-white/70" : "text-muted-foreground")}>
          {description}
        </p>
      )}
    </div>
  );
}

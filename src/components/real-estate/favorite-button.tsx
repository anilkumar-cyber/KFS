"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "kfs-favorite-properties";

function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore write errors (e.g. storage disabled)
  }
}

export function FavoriteButton({
  propertyId,
  className,
  size = "icon-sm",
}: {
  propertyId: string;
  className?: string;
  size?: "icon" | "icon-sm" | "icon-lg" | "icon-xs";
}) {
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    setIsFavorite(readFavorites().includes(propertyId));
  }, [propertyId]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const current = readFavorites();
    const next = current.includes(propertyId)
      ? current.filter((id) => id !== propertyId)
      : [...current, propertyId];
    writeFavorites(next);
    setIsFavorite(next.includes(propertyId));
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size={size}
      onClick={toggle}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={cn("bg-white/90 text-foreground shadow-sm hover:bg-white", className)}
    >
      <Heart className={cn("size-4", isFavorite && "fill-red-500 text-red-500")} />
    </Button>
  );
}

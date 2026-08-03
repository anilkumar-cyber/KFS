"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type ContentFilterOption = { value: string; label: string };
export type ContentFilterConfig = {
  key: string;
  placeholder: string;
  options: ContentFilterOption[];
  className?: string;
};

/**
 * Generic URL-param-driven filter bar shared by the Loan Products, Tax Services,
 * Blog Posts and Testimonials admin list pages. Mirrors LeadsFilterBar's pattern
 * of pushing to the current pathname with updated search params.
 */
export function ContentFilterBar({
  searchPlaceholder,
  searchKey = "q",
  filters = [],
}: {
  searchPlaceholder?: string;
  searchKey?: string;
  filters?: ContentFilterConfig[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = React.useState(searchParams.get(searchKey) ?? "");

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParam(searchKey, query || null);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {searchPlaceholder && (
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9"
            />
          </div>
        </form>
      )}
      {filters.map((filter) => (
        <Select
          key={filter.key}
          value={searchParams.get(filter.key) ?? "all"}
          onValueChange={(v) => v && updateParam(filter.key, v)}
        >
          <SelectTrigger className={filter.className ?? "w-full sm:w-48"}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
